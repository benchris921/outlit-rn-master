import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const styles = {
  wrapper: {
    backgroundColor: 'transparent',
    height: 44,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 5,
    backgroundColor: 'transparent'
  },
  highlight: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'white'
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00acc1',
    marginTop: 3
  }
}

export default Day = ({number, onPress, highlight, dot}) => (
  <TouchableOpacity
    style={styles.wrapper}
    onPress={onPress}
  >
    <View
      style={
        highlight?styles.highlight:{backgroundColor: 'transparent'}
      }
    >
      <Text style={[
        styles.text,
        highlight?{color: '#512da8'}:{color: 'white'}
      ]}>
        {number}
      </Text>
    </View>
    {dot?<View style={styles.dot}/>:null}
  </TouchableOpacity>
)