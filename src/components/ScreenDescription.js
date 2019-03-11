import React from 'react'
import { Text } from 'react-native'

const styles = {
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    margin: 'auto',
    width: 240,
    marginBottom: 16
  },
}

export default ScreenDescrpition = ({text}) => (
  <Text style={styles.text}>
    {text}
  </Text>
)