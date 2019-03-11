import React from 'react'
import MapView from 'react-native-maps'

import Marker from './Marker.js'

const styles = {
  mapView: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  }
}

function renderEvents(events, onPress) {
  return events.map((event, key) => (
    <Marker
      event={event}
      key={`event${key}`}
      onPress={() => {onPress(event)}}
    />
  ))
}

function renderVenues(venues, onPress) {
  return venues.map((venue, key) => {
    <Marker
      venue={venue}
      key={`venue${key}`}
      onPress={() => {onPress(venue)}}
    />
  })
}

const Map = ({initialRegion, events, venues, onPressEvent, onPressVenue, onChangeRegion}) => (
  <MapView
    style={styles.mapView}
    initialRegion={initialRegion}
    onRegionChange={onChangeRegion}
  >
    {renderEvents(events, onPressEvent)}
    {renderVenues(venues, onPressVenue)}
  </MapView>
)

export default Map