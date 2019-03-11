import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps'
import { isEmpty, hasIn } from 'lodash'
import LinearGradient from 'react-native-linear-gradient'

const styles= {
  mapMarker: {
    width: 24,
    height: 24,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 3,
    overflow: 'hidden',
    transform: [
      {rotateZ: '-45deg'}
    ]
  },
  venueMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden'
  }
}

export default Marker = ({event, venue, onPress}) => {
  let coord = {latitude: 0, longitude: 0}
  if(!isEmpty(event)){
    if(hasIn(event, 'metadata.loc')) {
      coord.latitude = event.metadata.loc[0]
      coord.longitude = event.metadata.loc[1]
    }else {
      coord.latitude = event.metadata.location.latitude
      coord.longitude = event.metadata.location.longitude
    }
    return (
      <MapView.Marker onPress={onPress} coordinate={coord}>
        <LinearGradient
          colors={['#FFEE65', '#FDD835']}
          start={{x: 0, y: 0}}
          end={{x: 0.2, y: 0.8}}
          style={styles.mapMarker}
        />
      </MapView.Marker>
    )
  }
  coord.latitude = venue.metadata.location.latitude
  coord.longitude = venue.metadata.location.longitude
  return (
    <MapView.Marker onPress={onPress} coordinate={coord}>
      <LinearGradient
        colors={['#FFCE00', '#FFA000']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.8}}
        style={styles.venueMarker}
      />
    </MapView.Marker>
  )
}