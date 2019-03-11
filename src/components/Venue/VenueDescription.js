import React from 'react'
import { View, Text } from 'react-native'

const styles={
  wrapper: {
    paddingVertical: 10,
    borderBottomColor: 'rgba(230, 236, 241, 50)',
    borderBottomWidth: 1
  },
  description: {
    fontSize: 13,
    color: '#637786',
  }
}

export default VenueDescription = ({desc}) => (
  <View style={styles.wrapper}>
    <Text style={styles.description}>
      {desc}
    </Text>
  </View>
)