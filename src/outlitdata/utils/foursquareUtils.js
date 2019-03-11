/**
 * Useful constants and functions that support the use of the Foursquare API;
 *
 * @author Stanton Parham
 */

import { NUM_METERS_IN_KM } from './geoUtils';

/**
 * Digs through and makes sense of the mess of JSON that the Foursquare API
 * returns for venue searches;
 *
 * @param {Object} json the JSON returned by Foursquare
 * @param {function} handler (optional) a callback that will be called with each
 *    parsed venue's metadata
 * @return {Object[]} an array of useful venue metadata
 */
function parseFSVenueSearchResults(json, handler) {
  const allVenues = [];
  json.response.groups[0].items.forEach((item) => {
    const venue = item.venue;
    const cleanVenue = {
      // NOTE: I put .id, .distance, and .source at the top level to keep what
      //       is returned for venues consistent with the structure of events
      //       even though they are inherently different.
      id: venue.id, // the Foursquare unique identifier for this venue
      distance: venue.location && (venue.location.distance / NUM_METERS_IN_KM), // the distance from the query center
      source: 'Foursquare API', // the source of Foursquare venues is the Foursquare API
      metadata: { // the metadata about the venue returned by Foursquare
        name: venue.name, // the name of the venue
        phoneNum: venue.contact && venue.contact.phone, // the phone number
        location: venue.location && {
          latitude: venue.location.lat, // the latitude
          longitude: venue.location.lng, // the longitude
        },
        addr: venue.location && {
          line1: venue.location.address, // the street address
          city: venue.location.city, // the city
          state: venue.location.state, // the state
          zip: venue.location.postalCode, // the zip code
        },
        categories: venue.categories && venue.categories.map(cat => cat.name), // the categories that the venue fits into (usually just 1)
        relativeCost: venue.price && venue.price.tier, // the price (1-4) of going to this venue
        rating: venue.rating, // the Foursquare rating of this venue (0-10)
        menuUrl: venue.menu && venue.menu.mobileUrl, // a link to the menu (if the venue has one)
        website: venue.url, // a link to the venue's website
      },
    };
    // call the handler with the venue metadata and add it to allVenues
    if (typeof handler === 'function') {
      handler(cleanVenue);
    }
    allVenues.push(cleanVenue);
  });
  return allVenues;
}

export {
  parseFSVenueSearchResults,
};
