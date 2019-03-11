# Outlit Database API

## Usage
### Import the module
```
import OutlitData from 'PATH/TO/outlitdata/OutlitData';
```

### Initialize the OutlitData object
Pass no parameters to use the default reference points into the database.
```
const outlit = new OutlitData();
```

### Read data
#### Get nearby venues
The ```getNearbyVenues()``` method will return **popular** venues within the given location that are related to the given query string.  (Since Foursquare is all about popular places, it doesn't return all the venues within a location but just the most popular ones.  It uses a mixed algorithm that takes into account how far away something is and how popular it is.  So if the radius around your center point is smaller, then you'll probably get more (albeit less popular) venues that are closer to you.)  The query string can be just about anything you want.  It can be the name of a particular venue like 'Sharkeys' or just a wide category like 'restaurant' or 'nightlife'.
NOTE: This function is written with querying on one key word at a time in mind.  I plan to expand it so that you can pass in an array of query words that will be used sequentially and then combine all of the results before fulfilling the Promise (this behavior is similar to how the filterOptions.types array works in getNearbyEvents()).
```
const SEARCH_AREA = {
  center: {
    latitude: 37.23035,
    longitude: -80.41501,
  },
  radius: 10, // in kilometers
};

const QUERY = 'coffee';

outlit.getNearbyVenues(SEARCH_AREA, QUERY, (venueData) => {
  // This callback will be called for each nearby venue found.
  // See the parseFSVenueSearchResults() method in utils/foursquareUtils.js
  // for the structure of the returned venue data.
}).then((allVenues) => {
  // Promise fulfills with an array of all the venues returned
  // for each handler call
}).catch((err) => {
  // Always be sure to catch errors
});
```
#### Get nearby events
The ```getNearbyEvents()``` method will return all **public** events within the given location that match the given filter options.  The only filter options implemented at this time are for different types of events.  There is also one Ticketmaster-specific filter option that allows you to specify a date that all returned Ticketmaster events must start before.  I want to include more filter options, but I'm not sure what they should be.  I'm open to suggestions!
NOTE: Filter options are not required.  If no filter options are wanted, then pass an empty JSON object or undefined.
```
const SEARCH_AREA = {
  center: {
    latitude: 37.770635,
    longitude: -122.467476,
  },
  radius: 10, // in kilometers
};

// get events from TM for the next 2 months
const tmDate = new Date();
tmDate.setMonths(tmDate.getMonths() + 2);

const FILTER_OPTIONS = {
  types: [
    'other',
    'social',
    'music',
  ],
  // The above types will retrieve all events that
  // are categorized as 'other' OR 'social' OR 'music'.
  tmSpecific: {
    beforeDateTime: tmDate,
  },
};

outlit.getNearbyEvents(SEARCH_AREA, FILTER_OPTIONS, (eventData) => {
  // This callback will be called for each nearby event found.
  // Events from both Ticketmaster and Firestore will be returned
  // and although the structure of the event data will be very
  // similar, it won't be exactly the same.  See the
  // parseTMEventSearchResults() method in utils/ticketmasterUtils.js
  // for the structure of returned Ticketmaster events.  See the
  // _getNearbyEventsFromFirestore() method in OutlitData.js and
  // the constants at the top of utils/eventDataUtils.js for the
  // structure of returned Firestore events.
}).then((allEvents) => {
  // Promise fulfills with an array of all
  // the events returned for each handler call
}).catch((err) => {
  // Always be sure to catch errors
});
```
#### Get metadata for an event
You can use an event id to retrieve the metadata for that event.  Event ids are returned through calls to ```getNearbyEvents()```, ```createNewEvent()```, and ```updateEvent()```.
```
outlit.getMetaForEvent(eventId).then((metadata) => {
  // The data passed into this callback will be an exact JSON
  // representation of the data stored in Firestore.
  console.log(metadata);
});
```
#### Get details for an event
You can use an event id to retrieve the details for that event.  Event ids are returned through calls to ```getNearbyEvents()```, ```createNewEvent()```, and ```updateEvent()```.
```
outlit.getDetailsForEvent(eventId).then((theDeets) => {
  // The data passed into this callback will be an exact JSON
  // representation of the data stored in Firestore.
  console.log(theDeets);
});
```

### Manipulate data
#### Store new data
You can create a new event by passing the full event JSON to ```createNewEvent()```.  The method will take care of splitting the event data into metadata and details and storing the data in the respective collections in Firestore.
```
const newEvent = {
    title: 'Desert Bonfire',
    private: true,
    loc: [37.669476, -122.399841],
    types: {
      'other': true,
      'social': true,
    },
    description: 'Yo, this new app is pretty lit. Btw we ouchea gettin\' lit near Brisbane.',
};
outlit.createNewEvent(newEvent).then((id) => {
    // Promise fulfills when the data is written
    // The id of the new event is passed back through the Promise.
});
```
#### Update existing data
The ```updateEvent()``` method works exactly like ```createNewEvent()``` except that you also need to provide the id of the event you wish to update.  Event ids are returned through calls to ```getNearbyEvents()```, ```createNewEvent()```, and ```updateEvent()```.
```
const oldEvent = {
    title: 'Cactus Forest Fire',             // title has changed
    private: false,                          // now it's not private
    loc: [37.669476, -122.399841],           // location stays the same
    description: 'The catuses are lit dude', // desc changed
};

outlit.updateEvent(eventId, oldEvent).then((id) => {
    // Promise fulfills when the data is written
    // The id of the updated event is passed back through the Promise (will be the same as eventId).
});
```
#### Delete an event
You can use the ```deleteEvent()``` to guess what...delete an event!  The method also takes care of deleting guest records and their associated invitations to other users.  The only thing you need is an event id.  Event ids are returned through calls to ```getNearbyEvents()```, ```createNewEvent()```, and ```updateEvent()```.
```
this.outlit.deleteEvent(id).then(() => {
  console.log('Deleted the event and its associated data');
});
```
