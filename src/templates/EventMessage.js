import React from 'react'
import { View } from 'react-native'

import Message from '../components/Message'

export default EventMessage = ({messageList}) => (
  <View>
    {messageList.map((val, key) => (
      <Message 
        userType={val.userType}
        message={val.message}
        likes={val.likes}
        time={val.date}
      />
    ))}
  </View>
)