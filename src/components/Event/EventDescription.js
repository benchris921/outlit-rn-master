import React from 'react'
import { View, Text } from 'react-native'

import ProfileThumb from '../ProfileThumb'

const styles={
  wrapper: {
    paddingBottom: 10,
    paddingTop: 20,
    borderBottomColor: 'rgba(230, 236, 241, 50)',
    borderBottomWidth: 1
  },
  description: {
    fontSize: 13,
    color: '#637786',
    paddingVertical: 10,
  }
}

export default VenueDescription = ({desc, hostName, hostPic}) => (
  <View style={styles.wrapper}>
    <ProfileThumb pic={hostPic} name={hostName} type="Hostee" />
    <Text style={styles.description}>
      {desc}
    </Text>
  </View>
)