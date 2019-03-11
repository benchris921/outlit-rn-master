import React from 'react'
import { View, Text } from 'react-native'

export default WeekDay = ({wdName}) => (
  <View
    style={{
      flex: 1,
      paddingTop: 5,
      paddingBottom: 5
    }}
  >
    <Text
      style={{
        color: 'rgba(255, 255, 255, .5)',
        textAlign: 'center',
        fontSize: 14
      }}
    >
      {wdName}
    </Text>
  </View>
)