import React from 'react'
import { View, Text } from 'react-native'

const styles={
  wrapper: {
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spliter: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#c9d8e1'
  },
  text: {
    flex: 1,
    color: 'white',
    fontSize: 13,
    margin: 10,
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
}

export default SpliterWithText = ({text}) => (
  <View style={styles.wrapper}>
    <View style={styles.spliter} />
    <Text style={styles.text}>
      {text}
    </Text>
    <View style={styles.spliter} />
  </View>
)