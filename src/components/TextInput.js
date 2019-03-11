import React from 'react'
import { TextInput } from 'react-native'

export default TextField = ({text, placeholder, onChange}) => (
  <TextInput
    style={{
      backgroundColor: '#F2F5F8',
      borderRadius: 2,
      padding: 10,
      margin: 10,
      fontSize: 15,
      fontFamily: 'Helvetica'
    }}
    onChangeText={onChange}
    value={text}
    placeholder={placeholder}
    placeholderTextColor='#637786'
  />
)