import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

const styles = {
  wrapper: {
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 13
  }
}

export default TouchableText = ({text, onPress}) => (
  <TouchableOpacity style={styles.wrapper} onPress={onPress}>
    <Text style={styles.text}>
      {text}
    </Text>
  </TouchableOpacity>
)