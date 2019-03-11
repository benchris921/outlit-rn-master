import React from 'react'
import { View, Text, Image } from 'react-native'

const styles={
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  pic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 10,
  },
  userNameWrapper: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 16,
    color: 'black'
  },
  userType: {
    fontSize: 11,
    color: '#637786'
  }
}

export default ProfileThumb = ({pic, name, type}) => (
  <View style={styles.wrapper}>
    <Image
      style={styles.pic}
      source={pic}
      resizeMode="cover"
    />
    <View style={styles.userNameWrapper}>
      <Text style={styles.userName}>{name}</Text>
      <Text style={styles.userType}>{type}</Text>
    </View>
  </View>
)