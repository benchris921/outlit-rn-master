/**
 * Useful constants and functions that support the use of the Ticketmaster API;
 *
 * @author Stanton Parham
 */

/** The ID that TM uses to identify music events; */
export const TM_MUSIC_CLASSIFICATION_ID = 'KZFzniwnSyZfZ7v7nJ';
/** The ID that TM uses to identify sports events; */
export const TM_SPORTS_CLASSIFICATION_ID = 'KZFzniwnSyZfZ7v7nE';
/** The ID that TM uses to identify arts events; */
export const TM_ARTS_CLASSIFICATION_ID = 'KZFzniwnSyZfZ7v7na';

/**
 * Digs through and makes sense of the mess of JSON that the Ticketmaster API
 * returns for event searches;
 *
 * @param {Object} json the JSON returned by Ticketmaster
 * @return {Object[]} an array of useful event metadata
 */
function parseTMEventSearchResults(json, handler) {
  const allEvents = [];
  json._embedded.events.forEach((event) => {
    const venueInfo = event._embedded && event._embedded.venues && event._embedded.venues[0];
    const cleanEvent = {
      // NOTE: I put .id, .distance, and .source at the top level to keep what
      //       is returned by TM consistent with the events from Firestore.
      id: event.id, // the Ticketmaster unique identifier for this event
      distance: event.distance, // the distance the event is from the user
      source: 'Ticketmaster API', // the source of TM events is the Ticketmaster API
      metadata: { // the information about the event provided by Ticketmaster
        title: event.name, // the title of the event
        private: false, // TM events are always public
        creator: 'Ticketmaster', // TM events are always created by TM
        startTime: event.dates && event.dates.start && (new Date(event.dates.start.dateTime)), // the start time of the event
        desc: event.info, // the event's description
        website: event.url, // the event's website
        phoneNum: venueInfo && venueInfo.boxOfficeInfo && venueInfo.boxOfficeInfo.phoneNumberDetail, // the event's phone number
        images: event.images, // image URLs for the event
        priceRange: event.priceRanges && event.priceRanges[0], // the price range of tickets for the event
        addr: venueInfo && { // the event's address
          line1: venueInfo.address,
          city: venueInfo.city.name,
          state: venueInfo.state.stateCode,
          zip: venueInfo.postalCode,
        },
        location: venueInfo && venueInfo.location && { // the event's geo location
          latitude: Number(venueInfo.location.latitude),
          longitude: Number(venueInfo.location.longitude),
        },
        types: {}, // the type of the event (left blank for now)
      },
    };

    // determine what type of event it is
    if (event.classifications[0].segment.id === TM_MUSIC_CLASSIFICATION_ID) {
      cleanEvent.metadata.types.music = true;
    } else if (event.classifications[0].segment.id === TM_SPORTS_CLASSIFICATION_ID) {
      cleanEvent.metadata.types.sports = true;
    } else if (event.classifications[0].segment.id === TM_ARTS_CLASSIFICATION_ID) {
      cleanEvent.metadata.types.arts = true;
    } else {
      cleanEvent.metadata.types.other = true;
    }

    allEvents.push(cleanEvent);
  });
  return allEvents;
}

/**
 * Pads single digit numbers with a leading zero;
 *
 * @param {number} number the number to pad
 * @return {string} the string form of the number
 */
function pad(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}

/**
 * Returns a formatted date string that is compatible with the Ticketmaster API;
 * This format is almost exactly the same as Date.toISOString except there
 * are no milliseconds included.
 *
 * @param {Date} date the date to return a date string for
 * @return {string} the formatted date string
 */
function formatTMDateString(date) {
  return date.getUTCFullYear() +
    '-' + pad(date.getUTCMonth() + 1) +
    '-' + pad(date.getUTCDate()) +
    'T' + pad(date.getUTCHours()) +
    ':' + pad(date.getUTCMinutes()) +
    ':' + pad(date.getUTCSeconds()) +
    'Z';
}

export {
  parseTMEventSearchResults, formatTMDateString,
};
