import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

const styles = {
  button: {
    height: 36,
    margin: 10,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#4267b2',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center'
  }
}

export default FBAuthButton = ({text, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>
      {text}
    </Text>
  </TouchableOpacity>
)