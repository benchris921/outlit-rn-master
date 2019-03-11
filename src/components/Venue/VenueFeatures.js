import React from 'react'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const styles={
  wrapper: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 14,
    color: '#9FABB4',
    marginBottom: 10,
  },
  features: {
    paddingLeft: 5,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  featureIcon: {
    color: '#9FABB4',
    marginRight: 5,
  },
  featureText: {
    color: '#637786',
    fontSize: 13
  }
}

export default VenueContent = ({features}) => (
  <View style={styles.wrapper}>
    <Text style={styles.title}>
      Features
    </Text>
    <View style={styles.features}>
      {features.map((val, key) => (
        <View style={styles.feature} key={key}>
          <Ionicons style={styles.featureIcon} name="ios-checkmark" size={16} />
          <Text style={styles.featureText}>{val.feature}</Text>
        </View>
      ))}
    </View>
  </View>
)