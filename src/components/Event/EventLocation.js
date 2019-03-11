import React from 'react'
import { View, Image, Text, TouchableHighlight } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import MapView from 'react-native-maps'

const styles = {
  wrapper: {
    borderRadius: 6,
    overflow: 'hidden',
    flexDirection: 'column',
    shadowColor: 'rgb(230, 236, 241)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.7,
    borderColor: '#E6ECF1',
    borderWidth: 0.5
  },
  locationName: {
    fontSize: 16,
    color: 'black'
  },
  map: {
    height: 100,
  },
  infoArea: {
    position: 'absolute',
    height: 100,
    padding: 10,
    paddingRight: 70,
    justifyContent: 'space-between'
  },
  info: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginBottom: 7
  },
  infoIcon: {
    width: 15,
    height: 15,
    marginRight: 5
  },
  info_type: {
    color: 'black',
    fontSize: 12
  },
  info_text: {
    color: '#637786',
    fontSize: 12,
    justifyContent: 'space-between'
  },
  addressInfo: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'rgb(249, 250, 252)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  addressDetail: {},
  addressText: {
    color: 'black',
    fontSize: 12
  },
  directionButton: {
    borderRadius: 4,
    backgroundColor: '#00ACC1',
    shadowColor: 'rgb(89, 97, 118)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    width: 110,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: 'white',
    fontSize: 13
  }
}

const renderInfo = (open, locationName) => (
  <LinearGradient
    style={styles.infoArea}
    colors={['white', 'rgba(255,255,255,0)']}
    start={{x: 0.75, y: 0}}
    end={{x: 1, y: 0}}
  >
    <Text style={styles.locationName}>{locationName}</Text>
    <View style={styles.info}>
      <Image
        style={styles.infoIcon}
        source={
          require('../../Assets/venues/clock.png')
        }
      />
      <Text style={styles.info_text}>{open}</Text>
    </View>
    <View style={styles.info}>
      <Image
        style={styles.infoIcon}
        source={
          require('../../Assets/events/Private.png')
        }
      />
      <Text style={styles.info_text}>Private Event</Text>
    </View>
  </LinearGradient>
)

export default EventLocation = ({region, open, locationName, address1, address2}) => (
  <View style={styles.wrapper}>
    <MapView style={styles.map} initialRegion={region}>
    </MapView>
    {renderInfo(open, locationName)}
    <View style={styles.addressInfo}>
      <View style={styles.addressDetail}>
        <Text style={styles.addressText}>
          {address1}
        </Text>
        <Text style={styles.addressText}>
          {address2}
        </Text>
      </View>
      <TouchableHighlight style={styles.directionButton}>
        <Text style={styles.btnText}>
          Get directions
        </Text>
      </TouchableHighlight>
    </View>
  </View>
)