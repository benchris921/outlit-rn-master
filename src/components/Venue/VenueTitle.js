import React from 'react'
import { View, ImageBackground, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import DollarRating from '../../templates/DollarRating';

const styles={
  bg: {
    height: 130,
  },
  gradient: {
    height: 130,
    padding: 10
  },
  title: {
    color: 'white',
    fontSize: 22,
    backgroundColor: 'transparent',
    marginTop: 60
  },
  detail: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center'
  },
  distance: {
    backgroundColor: 'transparent',
    color: 'white'
  }
}

export default VenueTitle = ({title, image, distance, dRating}) => (
  <ImageBackground
    source={{uri: image}}
    style={styles.bg}
    resizeMode="cover"
  >
    <LinearGradient
      style={styles.gradient}
      colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
    >
      <Text style={styles.title}>{title}</Text>
      <View style={styles.detail}>
        <Text style={styles.distance}>
          {`${distance} mi . `}
        </Text>
        <DollarRating highlight={'white'} disabled={'#627787'} rating={dRating}/>
      </View>
    </LinearGradient>
  </ImageBackground>
)