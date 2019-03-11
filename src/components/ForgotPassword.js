import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

const styles = {
  wrapper: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 13,
    backgroundColor: 'transparent'
  }
}

export default ForgotPassword = (onPress) => (
  <View style={styles.wrapper}>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>Forgot your password</Text>
    </TouchableOpacity>
  </View>
)