/**
 * Useful constants and functions that support geo location;
 * Some of these constants and functions have been adapted from the GeoFire
 * library (https://github.com/firebase/geofire-js).
 *
 * @author Stanton Parham
 */

/** The number of meters in a kilometer; */
export const NUM_METERS_IN_KM = 1000;

/** The ratio between kilometers and degrees of latitude; */
const KM_PER_DEGREE_LATITUDE = 110.574;

/** The equatorial radius of the earth in meters; */
const EARTH_EQ_RADIUS = 6378137.0;

/**
 * The following value assumes a polar radius of
 * const EARTH_POL_RADIUS = 6356752.3;
 * The formula to calculate E2 is
 * E2 == (EARTH_EQ_RADIUS^2-EARTH_POL_RADIUS^2)/(EARTH_EQ_RADIUS^2)
 * The exact value is used here to avoid rounding errors
 */
const E2 = 0.00669447819799;

/** The cutoff for rounding errors on double calculations; */
export const ROUNDING_EPSILON = 1e-12;

/**
 * Calculates the distance, in kilometers, between two locations, via the
 * Haversine formula;
 * NOTE: This is approximate due to the fact that the Earth's radius varies
 * between 6356.752 km and 6378.137 km.
 *
 * @param {Object} location1 the first location given as .latitude and .longitude
 * @param {Object} location2 the second location given as .latitude and .longitude
 * @return {number} the distance, in kilometers, between the inputted locations
 */
function distance(location1, location2) {
  const radius = 6371; // Earth's radius in kilometers
  const latDelta = degreesToRadians(location2.latitude - location1.latitude);
  const lonDelta = degreesToRadians(location2.longitude - location1.longitude);

  const a = (Math.sin(latDelta / 2) * Math.sin(latDelta / 2)) +
          (Math.cos(degreesToRadians(location1.latitude)) * Math.cos(degreesToRadians(location2.latitude)) *
          Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2));

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return radius * c;
}

/**
 * Calculates the SW and NE corners of a bounding box around a center point
 * for a given radius;
 *
 * @param {Object} center the center given as .latitude and .longitude
 * @param {number} radius the radius of the box (in kilometers)
 * @return {Object} the SW and NE corners given as .swCorner and .neCorner
 */
function boundingBoxCoordinates(center, radius) {
  const latDegrees = radius / KM_PER_DEGREE_LATITUDE;
  const latitudeNorth = Math.min(90, center.latitude + latDegrees);
  const latitudeSouth = Math.max(-90, center.latitude - latDegrees);
  // calculate longitude based on current latitude
  const longDegsNorth = metersToLongitudeDegrees(radius, latitudeNorth);
  const longDegsSouth = metersToLongitudeDegrees(radius, latitudeSouth);
  const longDegs = Math.max(longDegsNorth, longDegsSouth);
  return {
    swCorner: { // bottom-left (SW corner)
      latitude: latitudeSouth,
      longitude: wrapLongitude(center.longitude - longDegs),
    },
    neCorner: { // top-right (NE corner)
      latitude: latitudeNorth,
      longitude: wrapLongitude(center.longitude + longDegs),
    },
  };
}

/**
 * Wraps the longitude to fit within the range [-180,180];
 *
 * @param {number} longitude the longitude to wrap
 * @return {number} the resulting longitude
 */
function wrapLongitude(longitude) {
  if (longitude <= 180 && longitude >= -180) {
    return longitude;
  }
  const adjusted = longitude + 180;
  if (adjusted > 0) {
    return (adjusted % 360) - 180;
  }
  // else
  return 180 - (-adjusted % 360);
}

/**
 * Calculates the number of degrees a given distance is at a given latitude;
 *
 * @param {number} distance the distance to convert
 * @param {number} latitude the latitude at which to calculate
 * @return {number} the number of degrees the distance corresponds to
 */
function metersToLongitudeDegrees(distance, latitude) {
  const radians = degreesToRadians(latitude);
  const num = Math.cos(radians) * EARTH_EQ_RADIUS * Math.PI / 180;
  const denom = 1 / Math.sqrt(1 - E2 * Math.sin(radians) * Math.sin(radians));
  const deltaDeg = num * denom;
  if (deltaDeg < ROUNDING_EPSILON) {
    return distance > 0 ? 360 : 0;
  }
  return Math.min(360, distance / deltaDeg);
}

/**
 * Converts degrees to radians;
 *
 * @param {number} degrees the number of degrees to be converted to radians
 * @throws {Error} if degrees is not a number
 * @return {number} the number of radians equal to the inputted number of degrees
 */
function degreesToRadians(degrees) {
  if (typeof degrees !== 'number' || Number.isNaN(degrees)) {
    throw new Error('Error: degrees must be a number');
  }

  return (degrees * Math.PI / 180);
}

/**
 * Checks if the given value is a valid representation of an area;
 *
 * @param {*} area the value to check
 * @throws {Error} if the given value is not a valid area
 */
function validateArea(area) {
  if (Object.prototype.toString.call(area) !== '[object Object]') {
    throw new Error('The area is not an object.');
  }
  if (Object.prototype.toString.call(area.center) !== '[object Object]') {
    throw new Error('area.center is not an object.');
  }
  if (typeof area.center.latitude !== 'number' || Number.isNaN(area.center.latitude)) {
    throw new Error('Error: area.center.latitude must be a number');
  }
  if (typeof area.center.longitude !== 'number' || Number.isNaN(area.center.longitude)) {
    throw new Error('Error: area.center.longitude must be a number');
  }
  if (typeof area.radius !== 'number' || Number.isNaN(area.radius)) {
    throw new Error('Error: area.radius must be a number');
  }
}

export {
  distance, boundingBoxCoordinates, validateArea,
};
