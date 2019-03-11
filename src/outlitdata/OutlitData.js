/**
 * Defines an object for accessing remote, Outlit-related data;
 * Remote services accessed with this object:
 * - Google Firebase
 * - Foursquare
 * - Ticketmaster
 *
 * @author Stanton Parham
 */

import firebase from 'react-native-firebase';
import find from 'lodash'
import * as utils from './utils';

/** Default path to event metadata in Firestore; */
const DEF_EVENT_METADATA_REF_PATH = 'eventMeta';
/** Default path to event details in Firestore; */
const DEF_EVENT_DETAILS_REF_PATH = 'eventDetails';
/** Default path to user data in Firestore; */
const DEF_USER_DATA_REF_PATH = 'users';
/** The URL used to trigger Google Cloud Functions; */
const GCF_BASE_URL = 'https://us-central1-outlit-70544.cloudfunctions.net';
/** The URL used to get venues from the Foursquare API through Google Cloud Functions; */
const GCF_FOURSQUARE_VENUES_SEARCH_URL = GCF_BASE_URL + '/foursquare-venuesSearch';
/** The URL used to get events from the Ticketmaster API through Google Cloud Functions; */
const GCF_TICKETMASTER_EVENTS_SEARCH_URL = GCF_BASE_URL + '/ticketmaster-eventsSearch';

/**
 * Used to retrieve and send data related to Outlit;
 */
export default class OutlitData {
  /**
   * Constructs a new OutlitData object;
   */
  constructor() {
    this.metadataRef = firebase.firestore().collection(DEF_EVENT_METADATA_REF_PATH);
    this.detailsRef = firebase.firestore().collection(DEF_EVENT_DETAILS_REF_PATH);
    this.usersRef = firebase.firestore().collection(DEF_USER_DATA_REF_PATH);
    this.fsVenuesSearchUrl = GCF_FOURSQUARE_VENUES_SEARCH_URL;
    this.tmEventsSearchUrl = GCF_TICKETMASTER_EVENTS_SEARCH_URL;
  }

  /**
   * Retrieves metadata about each event that is within a bounding box around
   * a center point (latitude, longitude pair) and meets the criteria provided
   * as filter options;
   * Calls the handler with each event's metadata as it is fetched;
   * Returns a Promise that fulfills once each event has been retrieved from
   * every source;
   * NOTE: This will only return nearby public events. Private events are returned
   * by other methods depending on if the user's created events or the events
   * that the user is invited to are wanted.
   * NOTE: This returns events within the bounding box from Firestore.
   * However, Ticketmaster only provides support for getting events within a
   * circle around a point so those events will be within a circle that is
   * inscribed within the bounding box.
   *
   * @param {Object} area an object that represents the bounding box
   *    around a point in which events should be retrieved
   * @param {Object} area.center an object containing the latitude and
   *    longitude of the center point of the location
   * @param {number} area.center.latitude the latitude of the center point
   * @param {number} area.center.longitude the longitude of the center point
   * @param {number} area.radius (in kilometers) the radius of a circle
   *    inscribed in the bounding box
   *    (https://www.varsitytutors.com/hotmath/hotmath_help/topics/circles-inscribed-in-squares);
   *    This could also be described as half of the bounding box's side length.
   * @param {Object} filterOptions (optional) an object representing the filter options that
   *    will further reduce the events that are returned
   * @param {string[]} filterOptions.types the types of events that should be returned;
   *    The different types will basically be OR-ed together so that events
   *    categorized as ANY of the provided types will be returned.
   *    For example, if the types provided are ['food', 'social'], then ALL
   *    food events will be returned and ALl social events will be returned.
   * @param {Object} filterOptions.tmSpecific filter options specific to the Ticketmaster API
   * @param {Date} filterOptions.tmSpecific.beforeDateTime the date that
   *    returned events should start before;
   *    This is Ticketmaster specific because we want to limit the number of
   *    events returned by Ticketmaster based on this time.  This won't really
   *    work with the Firestore events because you can only use inequality
   *    operators on one field at a time when performing a Firestore query
   *    (we're already using inequality operators on .location).
   *    NOTE: If this parameter is not given, then a default of one month after
   *    the current time is used.
   * @param {} filterOptions.xxxx TODO What other filter options are wanted?
   * @param {function} handler (optional) a callback that will be called with each
   *    retrieved event's metadata
   * @throws {Error} if the given area is invalid
   * @throws {Error} if any of the provided filter options are invalid
   * @return {Promise} a Promise that fulfills with an array of all the
   *    retrieved events' metadata
   */
  getNearbyEvents(area, filterOptions, handler) {
    // validate the area
    utils.validateArea(area);

    // check for filter options
    let filterOpts = filterOptions;
    if (filterOpts === undefined) {
      // assign a blank object
      filterOpts = {};
    } else {
      // shallow copy filterOptions
      filterOpts = Object.assign({}, filterOptions);
    }

    // separate the types from the other filter options
    let types = filterOpts.types;
    delete filterOpts.types;

    // if some types are given
    if (Array.isArray(types) && types.length > 0) {
      // check if provided types are valid
      utils.validateTypesArray(types);
    } else {
      // make an array with a dummy value so that at least one query is sent
      types = [null];
    }

    // separate the Ticketmaster specific filters from the other filter options
    let tmSpecific = filterOpts.tmSpecific;
    delete filterOpts.tmSpecific;
    // if no Ticketmaster specific filters are given
    if (tmSpecific === undefined) {
      // assign a blank object
      tmSpecific = {};
    }

    // separate the Firestore specific filters from the other filter options
    // NOTE: There is no need for this yet, but I figured I would add it for
    //       symmetry with the TM specific options.
    let firestoreSpecific = filterOpts.firestoreSpecific;
    delete filterOpts.firestoreSpecific;
    // if no Firestore specific filters are given
    if (firestoreSpecific === undefined) {
      // assign a blank object
      firestoreSpecific = {};
    }

    // return a Promise that fulfills once events from Firestore and Ticketmaster are retrieved
    return new Promise((resolve, reject) => {
      const totalSetsOfQueries = 1;
      let setsOfQueriesCompleted = 0;
      let setsOfQueriesWithErrors = 0;
      let allEvents = [];

      // get all the events from Firestore that match the parameters
      this._getNearbyEventsFromFirestore(area, types, firestoreSpecific, filterOpts, handler)
        .then((allFirestoreEvents) => {
          setsOfQueriesCompleted++;
          allEvents = allEvents.concat(allFirestoreEvents);
          if (setsOfQueriesCompleted === totalSetsOfQueries) {
            resolve(allEvents);
          } else if (setsOfQueriesCompleted + setsOfQueriesWithErrors === totalSetsOfQueries) {
            resolve(allEvents);
          }
        })
        .catch((err) => {
          setsOfQueriesWithErrors++;
          if (setsOfQueriesWithErrors === totalSetsOfQueries) {
            reject(new Error('Could not get events from Firestore or Ticketmaster'));
          } else if (setsOfQueriesCompleted + setsOfQueriesWithErrors === totalSetsOfQueries) {
            resolve(allEvents);
          }
        });

      // get all the events from Ticketmaster that match the parameters
      // this._getNearbyEventsFromTicketmaster(area, types, tmSpecific, filterOpts, handler)
      //   .then((allTicketmasterEvents) => {
      //     setsOfQueriesCompleted++;
      //     allEvents = allEvents.concat(allTicketmasterEvents);
      //     if (setsOfQueriesCompleted === totalSetsOfQueries) {
      //       resolve(allEvents);
      //     } else if (setsOfQueriesCompleted + setsOfQueriesWithErrors === totalSetsOfQueries) {
      //       resolve(allEvents);
      //     }
      //   })
      //   .catch((err) => {
      //     setsOfQueriesWithErrors++;
      //     if (setsOfQueriesWithErrors === totalSetsOfQueries) {
      //       reject(new Error('Could not get events from Firestore or Ticketmaster'));
      //     } else if (setsOfQueriesCompleted + setsOfQueriesWithErrors === totalSetsOfQueries) {
      //       resolve(allEvents);
      //     }
      //   });
    });
  }

  /**
   * Retrieves all of the events from Firestore for the given parameters;
   * NOTE: This should only really be used from within getNearbyEvents().
   */
  _getNearbyEventsFromFirestore(area, types, firestoreSpecificOpts, additionalFilterOpts, handler) {
    return new Promise((resolve, reject) => {
      const totalQueries = types.length;
      const allEvents = []; // keeps track of all returned events (without dupes)
      const allEventIds = new Set(); // used to ensure there are no duplicates

      let queriesCompleted = 0;

      // make a new query for each type of event that's wanted
      types.forEach((type) => {
        const queryFilters = {};
        if (type !== null) { // if not the dummy value
          // add the type filter
          queryFilters['types.' + type] = true;
        }
        // add the rest of the filters
        Object.keys(additionalFilterOpts).forEach((key) => {
          queryFilters[key] = additionalFilterOpts[key];
        });

        const box = utils.boundingBoxCoordinates(area.center, area.radius);

        const lesserGeopoint = new firebase.firestore.GeoPoint(box.swCorner.latitude, box.swCorner.longitude);
        const greaterGeopoint = new firebase.firestore.GeoPoint(box.neCorner.latitude, box.neCorner.longitude);

        let query = this.metadataRef
          .where('location', '>', lesserGeopoint)
          .where('location', '<', greaterGeopoint)
          .orderBy('location')
          .where('private', '==', false);

        // iterate through the query filters while adding them to the query
        Object.keys(queryFilters).forEach((key) => {
          query = query.where(key, '==', queryFilters[key]);
        });

        // return a Promise that fulfills with the events
        query.get()
          .then((snapshot) => {
            snapshot.forEach((eventDoc) => {
              // structure data from Firestore
              const eventMetadata = eventDoc.data();
              const firestoreID = eventDoc.id;
              const distanceFromUser = utils.distance(area.center, eventMetadata.location);
              const event = {
                // NOTE: I put .id, .distance, and .source at the top level and
                //       the rest of the event's data under .metadata because
                //       they are not actually part of the event's record in
                //       Firestore.
                id: firestoreID, // the unique identifier for this event in Firestore
                distance: distanceFromUser, // the distance between the event and the user
                source: 'Google Firebase Firestore', // the source of Firestore events is Google Firebase Firestore
                metadata: eventMetadata, // the data stored in Firestore
              };

              // check if the returned event is a duplicate
              const numEventIds = allEventIds.size;
              allEventIds.add(event.id);

              // if the event is not a duplicate
              if (allEventIds.size === numEventIds + 1) {
                // call the handler with the event data and add it to allEvents
                if (typeof handler === 'function') {
                  handler(event);
                }
                // add to the allEvents array
                allEvents.push(event);
              }
            });

            // check if this is the last query
            queriesCompleted++;
            if (queriesCompleted === totalQueries) {
              resolve(allEvents);
            }
          })
          .catch((err) => {
            throw new Error('Error while retrieving Outlit events');
          });
      }); // end forEach
    }); // end Promise
  }

  /**
   * Retrieves all of the events from Ticketmaster for the given parameters;
   * NOTE: This should only really be used from within getNearbyEvents().
   */
  _getNearbyEventsFromTicketmaster(area, types, tmSpecificOpts, additionalFilterOpts, handler) {
    return new Promise((resolve, reject) => {
      const totalQueries = types.length;
      const allEvents = []; // keeps track of all returned events (without dupes)
      const allEventIds = new Set(); // used to ensure there are no duplicates
      let queriesCompleted = 0;

      // make a new query for each type of event that's wanted
      types.forEach((type) => {
        // the parameters used to search for Ticketmaster events
        const params = {
          latlong: area.center.latitude + ',' + area.center.longitude,
          radius: Math.ceil(area.radius), // TM API requires the radius to be an integer
        };

        // if a beforeDateTime is specified, then use it
        if (tmSpecificOpts.beforeDateTime !== undefined) {
          params.beforeDateTime = utils.formatTMDateString(tmSpecificOpts.beforeDateTime);
        } else { // else default to one month after the current time
          const date = new Date();
          date.setMonth(date.getMonth() + 1);
          params.beforeDateTime = utils.formatTMDateString(date);
        }

        // if the type is not the dummy value
        if (type !== null) {
          // try to match the type with a classification ID
          if (type === 'music') {
            params.classificationId = utils.TM_MUSIC_CLASSIFICATION_ID;
          } else if (type === 'sports') {
            params.classificationId = utils.TM_SPORTS_CLASSIFICATION_ID;
          } else if (type === 'arts') {
            params.classificationId = utils.TM_ARTS_CLASSIFICATION_ID;
          } else { // otherwise use it as a key word
            params.keyword = encodeURIComponent(type);
          }
        }

        // build little pieces for all the query parameters
        const paramStrPieces = [];
        Object.keys(params).forEach((key) => {
          paramStrPieces.push(key + '=' + params[key]);
        });
        const fullParamStr = '?' + paramStrPieces.join('&');

        // check if a user is signed in
        if (firebase.auth().currentUser === undefined || firebase.auth().currentUser === null) {
          throw new Error('User must be logged in');
        }

        // get a token for the current user
        firebase.auth().currentUser.getIdToken()
          .then((token) => {
            const url = this.tmEventsSearchUrl + fullParamStr;
            const options = {
              method: 'GET',
              headers: new Headers({
                'Authorization': 'Bearer ' + token,
              }),
            };
            // ping the GCF to get the Ticketmaster data
            fetch(url, options)
              .then((response) => {
                // get JSON from response
                return response.json();
              })
              .then((parsedJSON) => {
                const parsedEvents = utils.parseTMEventSearchResults(parsedJSON);
                parsedEvents.forEach((event) => {
                  // check if the returned event is a duplicate
                  const numEventIds = allEventIds.size;
                  allEventIds.add(event.id);

                  // if the event is not a duplicate
                  if (allEventIds.size === numEventIds + 1) {
                    // call the handler with the event data and add it to allEvents
                    if (typeof handler === 'function') {
                      handler(event);
                    }
                    // add to the allEvents array
                    allEvents.push(event);
                  }
                });

                // check if this is the last query
                queriesCompleted++;
                if (queriesCompleted === totalQueries) {
                  resolve(allEvents);
                }
              })
              .catch((err) => {
                throw new Error('Problem parsing JSON from Ticketmaster');
              });
          })
          .catch(() => {
            throw new Error('Problem getting Firebase ID token for current user');
          });
      }); // end forEach
    }); // end Promise
  }

  /**
   * Retrieves metadata about each venue that is within a bounding box around
   * a center point (latitude, longitude pair);
   * Calls the handler with each venue's metadata (even though the data is all fetched at once);
   * Returns a Promise that resolves once the venue metadata has been retrieved;
   *
   * @param {Object} area an object that represents the bounding box
   *    around a point in which events should be retrieved
   * @param {Object} area.center an object containing the latitude and
   *    longitude of the center point of the location
   * @param {number} area.center.latitude the latitude of the center point
   * @param {number} area.center.longitude the longitude of the center point
   * @param {number} area.radius (in kilometers) the radius of a circle
   *    inscribed in the bounding box
   *    (https://www.varsitytutors.com/hotmath/hotmath_help/topics/circles-inscribed-in-squares);
   *    This could also be described as half of the bounding box's side length.
   * @param {string} query a simple string to base returned venues on
   * @param {function} handler (optional) a callback that will be called with each
   *    retrieved venue's metadata
   * @throws {Error} if the given area is invalid
   * @throws {Error} if a user is not signed in
   * @return {Promise} a Promise that fulfills with an array of all the
   *    retrieved venues' metadata;
   */
  getNearbyVenues(area, query, handler) {
    return new Promise((resolve, reject) => {
      utils.validateArea(area);

      const params = {
        ll: area.center.latitude + ',' + area.center.longitude,
        radius: area.radius * utils.NUM_METERS_IN_KM,
        query: encodeURIComponent(query),
      };

      // build little pieces for all the query parameters
      const paramStrPieces = [];
      Object.keys(params).forEach((key) => {
        paramStrPieces.push(key + '=' + params[key]);
      });
      const fullParamStr = '?' + paramStrPieces.join('&');

      // check if a user is signed in
      if (firebase.auth().currentUser === undefined || firebase.auth().currentUser === null) {
        throw new Error('User must be logged in');
      }

      // get a token for the current user
      firebase.auth().currentUser.getIdToken()
        .then((token) => {
          const url = this.fsVenuesSearchUrl + fullParamStr;

          const options = {
            method: 'GET',
            headers: new Headers({
              'Authorization': 'Bearer ' + token,
            }),
          };

          // trigger the GCF to get the Foursquare data
          fetch(url, options)
            .then((response) => {
              // get JSON from response
              return response.json();
            })
            .then((parsedJSON) => {
              // dig through Foursquare's messy JSON to get useful data
              resolve(utils.parseFSVenueSearchResults(parsedJSON, handler));
            })
            .catch(() => {
              throw new Error('Problem parsing JSON from Foursquare');
            });
        })
        .catch(() => {
          throw new Error('Problem getting Firebase ID token for current user');
        });
    });
  }

  /**
   * Stores new event data in the database;
   * Generates additional fields the currently logged in user's UID to the event data;
   * A unique event id will be generated automatically for the new data in the database.
   *
   * @param {Object} eventData the event data to store in the database
   *    (required fields are listed below)
   * @param {number[]} eventData.loc the location of the event represented as
   *    a 2 element array containing the latitude (element 1) and longitude (element 2)
   * @param {string} eventData.title the title of the event
   * @param {boolean} eventData.private whether or not the event is private
   * @param {Date} eventData.startTime when the event starts
   * @param {Date} eventData.endTime when the event ends
   * @throws {Error} if any required fields in the event data are missing
   * @throws {Error} if there is not a current user signed in with Firebase Authentication
   * @throws {Error} if any of the event data is formatted incorrectly
   * @return {Promise} a Promise containing the id of the event; the
   *    Promise is fulfilled when the write is complete
   */
  createNewEvent(eventData) {
    utils.checkForAllRequiredFields(eventData);

    // shallow copy the data so not modifying original passed-in object
    const modified = Object.assign({}, eventData);

    // generate fields specific for the initial creation of an event
    // add creator field
    if (firebase.auth().currentUser === null) {
      throw new Error('No user currently signed-in. A user must be signed-in to create an event.');
    }
    modified.creator = firebase.auth().currentUser.uid;
    // attach a server time as the created time (just a sentinel value that will be replaced with a timestamp by the server)
    modified.createdTime = firebase.firestore.FieldValue.serverTimestamp();

    return this._setEventData(modified);
  }

  /**
   * Update an existing event's data in the database;
   *
   * @param {string} id the id of the event to update
   * @param {Object} eventData the event data to update in the database
   * @throws {Error} if an event id is not given
   * @throws {Error} if any of the given event data is invalid
   * @return {Promise} a Promise containing the id of the event; the
   *    Promise is fulfilled when the write is complete
   */
  updateEvent(id, eventData) {
    if (id === undefined) {
      throw new Error('An event id must be provided.');
    }
    // check for changed fields that shouldn't change after creation
    utils.checkForImmutableAfterCreationFields(eventData);

    // shallow copy the data so not modifying original passed-in object
    const modified = Object.assign({}, eventData);

    // if updating .types, then need to shallow copy .types as well
    if (Object.prototype.toString.call(eventData.types) === '[object Object]') {
      modified.types = Object.assign({}, eventData.types);
      // also need to cancel out all the types that aren't provided
      modified.types = utils.cancelOtherTypes(modified.types);
    }
    return this._setEventData(modified, id);
  }

  /**
   * Get the metadata for an event;
   *
   * @param {string} id the id of the event to retrieve the metadata for
   * @return {Promise} a Promise that resolves with the event metadata if
   *    the event is found; resolves with null otherwise;
   *    rejects if an error is encountered
   */
  getMetaForEvent(id) {
    return new Promise((resolve, reject) => {
      this.metadataRef.doc(id).get().then((doc) => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          resolve(null);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
   * Get the details for an event;
   *
   * @param {string} id the id of the event to retrieve the details for
   * @return {Promise} a Promise that resolves with the event details if
   *    the event is found; resolves with null otherwise;
   *    rejects if an error is encountered
   */
  getDetailsForEvent(id) {
    return new Promise((resolve, reject) => {
      this.detailsRef.doc(id).get().then((doc) => {
        if (!doc.empty) {
          resolve(doc.data());
        } else {
          resolve(null);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getInvitesForEvent(id) {
    let invites = [];
    return new Promise((resolve, reject) => {
      this.metadataRef.doc(id).collection('invites').get().then((doc) => {
        if(!doc.empty) {
          let promises = [];
          let invites = [];
          let profileImages = [];
          doc.docs.forEach((invite) => {
            const data = invite.data()
            data.id = invite.id
            invites.push(data)
            promises.push(this.usersRef.doc(data.userId).get())
          })
          Promise.all(promises).then((response) => {
            for(let i=0; i<response.length; i++) {
              const tmpUserProfile = response[i].data();
              profileImages.push(tmpUserProfile.profileImage)
            }
            resolve({
              invites,
              profileImages
            })
          }).catch((err)=>{console.log(err)})
        } else {
          resolve([]);
        }
      }).catch((error) => {
        reject(error);
      })
    })
  }

  /**
   * Deletes an event and cleans up any outstanding data such as invitations;
   *
   * @param {string} eventId the id of the event to delete
   * @return {Promise} a Promise that resolves once the event and all of its
   *    associated data has been deleted;
   *    The Promise rejects if there is an error or the user does not have
   *    permission to delete the event.
   */
  deleteEvent(eventId) {
    return new Promise((res, rej) => {
      // get the references to the event's metadata and details
      const eventMetaRef = this.metadataRef.doc(eventId);
      const eventDetailsRef = this.detailsRef.doc(eventId);

      // delete all the guests of the event while deleting their invitations as well
      const batchSize = 50; // delete 50 guests/invitations at a time
      const query = eventMetaRef.collection('guests').orderBy('__name__').limit(batchSize);
      const guestsDeleted = new Promise((resGuestsDeleted, rejGuestsDeleted) => {
        this._deleteGuestsAndInvitationsForEvent(eventId, query, batchSize, resGuestsDeleted, rejGuestsDeleted);
      });

      // once the guests/invitations are deleted, then delete the actual event
      guestsDeleted.then(() => {
        const batch = firebase.firestore().batch();
        batch.delete(eventMetaRef);
        batch.delete(eventDetailsRef);
        return batch.commit().then(res).catch(rej);
      }).catch(rej);
    });
  }

  /**
   * Deletes the guests returned by the given query while deleting the corresponding users' invitations;
   *
   * @param {string} eventId the id of the event for which guests/invitations are being deleted
   * @param {firebase.firestore.Query} query the query that returns guests to delete
   * @param {number} batchSize the number of guests/invitations to delete at a time
   * @param {function} res a callback for when all guests/invitations have been deleted
   * @param {function} rej a callback for when something goes wrong
   */
  _deleteGuestsAndInvitationsForEvent(eventId, query, batchSize, res, rej) {
    query.get().then((snapshot) => {
      // when there are no documents left, we are done
      if (snapshot.size === 0) {
        return 0;
      }

      // delete each guest record returned by the query and the corresponding user's invitation
      const batch = firebase.firestore().batch();
      snapshot.docs.forEach((guest) => {
        const guestUid = guest.id;
        // delete the corresponding user's invitation
        batch.delete(this.usersRef.doc(guestUid).collection('invitations').doc(eventId));
        // delete the guest record
        batch.delete(guest.ref);
      });

      return batch.commit().then(() => {
        return snapshot.size;
      }).catch(rej);
    }).then((numDeleted) => {
      if (numDeleted < batchSize) {
        res();
        return;
      }
      this._deleteGuestsAndInvitationsForEvent(query, batchSize, res, rej);
    }).catch(rej);
  }

  /**
   * Store new event data or update an existing event's data in the database;
   * Only sends the data off to the database if it is formatted correctly,
   * otherwise an error will be thrown.
   *
   * @param {Object} eventData the event data to store / update in the database
   * @param {string} id (optional) if updating an event's data, this is the id of the event to update
   * @return {Promise} a Promise containing the id of the event; the
   *    Promise is fulfilled when the write is complete
   */
  _setEventData(eventData, id) {
    // validate the given data, generate any necessary fields, and split it up
    const splitData = utils.validateAndSplitEventData(eventData);

    const batchWrite = this.metadataRef.firestore.batch();

    // set up metadata write
    const metaDocRef = this.metadataRef.doc(id);
    batchWrite.set(metaDocRef, splitData.meta, { merge: true });

    // set up details write
    const detailsDocRef = this.detailsRef.doc(metaDocRef.id);
    batchWrite.set(detailsDocRef, splitData.details, { merge: true });

    // send off all of the writes; once they have been written,
    // resolve a chained Promise with the event id
    return batchWrite.commit().then(() => metaDocRef.id);
  }

  updateInviteStatus(eventId, inviteId, state) {
    return this.metadataRef.doc(eventId).collection('invites').doc(inviteId).update({
      "going": state
    })
  }
}
