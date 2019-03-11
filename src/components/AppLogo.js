import React from 'react'
import { Image } from 'react-native'

const style = {
  width: 40,
  height: 48,
  alignSelf: 'center',
  marginTop: 25,
  marginBottom: 10,
}

export default AppLogo = () => (
  <Image
    style={style}
    source={require('../Assets/Logo.png')}
  />
)