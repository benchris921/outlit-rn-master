import React from 'react'
import { View, ImageBackground, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment'

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

export default EventTitle = ({title, image, date}) => (
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
          {moment(date).format("ddd, MMMM Do YYYY, hA")}
        </Text>
      </View>
    </LinearGradient>
  </ImageBackground>
)