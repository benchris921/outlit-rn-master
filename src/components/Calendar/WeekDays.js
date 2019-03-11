import React from 'react'
import { View } from 'react-native'
import WeekDay from './WeekDay'

export default WeekDays = () => (
  <View
    style={{
      backgroundColor: 'transparent',
      flexDirection: 'row'
    }}
  >
    <WeekDay wdName="Sun" />
    <WeekDay wdName="Mon" />
    <WeekDay wdName="Tue" />
    <WeekDay wdName="Wed" />
    <WeekDay wdName="Thur" />
    <WeekDay wdName="Fri" />
    <WeekDay wdName="Sat" />
  </View>
)