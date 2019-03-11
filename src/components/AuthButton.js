import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

const styles = {
  button: {
    height: 36,
    margin: 10,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#00acc1',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
  }
}

export default AuthButton = ({text, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>
      {text}
    </Text>
  </TouchableOpacity>
)