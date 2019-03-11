import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = {
  wrapperStyle: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    padding: 5,
  },
  chevronStyle: {
    color: 'white',
    padding: 2
  },
  monthTextStyle: {
    color: 'white',
    width: 100,
    textAlign: 'center',
    fontSize: 16,
    padding: 2
  }
}

function getMonthName(date) {
  date = new Date(date)
  var monthNames = [
    "January", "Feburary", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ]
  return monthNames[date.getMonth()]
}

function changeMonth(date, diff) {
  date = new Date(date)
  const month = date.getMonth() + diff + 1 >= 10 ? date.getMonth() + diff + 1 : `0${date.getMonth() + diff + 1}`
  const curDate = new Date(`${date.getFullYear()}-${month}-01`)
  return curDate
}

export default MonthControl = ({curDate, onChange}) => (
  <View style={styles.wrapperStyle}>
    <TouchableOpacity
      onPress={
        () => {onChange(changeMonth(curDate, -1))}
      }
    >
      <MaterialCommunityIcons
        size={20}
        name="chevron-left"
        style={styles.chevronStyle}
      />
    </TouchableOpacity>
    <Text
      style={styles.monthTextStyle}
    >
      {getMonthName(curDate)}
    </Text>
    <TouchableOpacity
      onPress={
        () => {onChange(changeMonth(curDate, 1))}
      }
    >
      <MaterialCommunityIcons
        size={20}
        name="chevron-right"
        style={styles.chevronStyle}
      />
    </TouchableOpacity>
  </View>
)