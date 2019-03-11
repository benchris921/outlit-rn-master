/** The default location of the user; */
export const CURRENT_LOCATION = {
    center: [37.770635, -122.467476], // latitude, longitude
    radius: 10, // in kilometers
};

/** Data for several events in the San Francisco area; */
export const TEST_DATA = {
  // events within 10km of [37.770635, -122.467476]
  "Coin Op Laundry": {
    title: 'Lit Laundry',
    private: false,
    loc: [37.79, -122.41],
    description: 'Come wash some laundry like a boss.',
  },
  "Nancy Ln": {
    title: 'Nancy\'s Cafe',
    private: false,
    loc: [37.700617, -122.421954],
    description: 'Simple food. Simple coffee. Sophisticated socio-philosophical debate.',
  },
  "California Academy of Sciences": {
    title: 'Academy Open House',
    private: false,
    loc: [37.769756, -122.465767],
    description: 'Come on out for the annual Academy Open House for some awesome science stuff!  Yeah science bitch!',
  },
  "Christmas Tree Point": {
    title: 'Party at Ya Boi\'s',
    private: false,
    loc: [37.754907, -122.446641],
    description: 'You know what the dealio is. Just come ova to ya boi\'s',
  },

  // events outside of the 10km range
  "J & O's Commercial Tire Center": {
    title: 'Tire Time',
    private: false,
    loc: [37.818002, -122.285661],
    description: 'Yes, tires are boring. But you need them, so come see us at J & O\'s for Tire Time!!',
  },
  "Desert Hills Near Brisbane": {
    title: 'Desert Bonfire',
    private: true,
    loc: [37.669476, -122.399841],
    description: 'Yo, this new app is pretty lit. Btw we ouchea gettin\' lit near Brisbane.',
  },
  "Off The Coast of Santa Cruz": {
    title: 'The Floating Bar',
    private: true,
    loc: [36.98, -122.56],
    description: 'A bar on the water. What else do you need?',
  },
};

/** Data for Christmas Tree Point that has been modified from the original; */
export const CTP_MODIFIED = {
  title: 'Ain\'t shit happenin\' at Ya Boi\'s',
  private: false,
  loc: [37.754907, -122.446641],
  description: 'Don\'t you dare come over to my house.',
};
