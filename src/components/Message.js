import React from 'react'
import { View, Text } from 'react-native'
import moment from 'moment'
import Entypo from 'react-native-vector-icons/Entypo'

const styles = {
  wrapper: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E6ECF1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowColor: '#E6ECF1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
  },
  contentWrapper: {
    width: '85%'
  },
  userType: {
    color: '#637786',
    fontSize: 16,
  },
  hostUserTitle: {
    fontSize: 16,
    color: '#FEA918'
  },
  time: {
    color: '#637786',
    fontSize: 11,
  },
  messageBody: {
    color: 'black',
    fontSize: 13,
    paddingTop: 10,
  },
  likeWrapper: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  likeCount: {
    color: '#512da8',
    fontSize: 20
  },
  likeBtn: {
    color: '#512da8'
  },
  dislikeBtn: {
    color: '#A6ACB0'
  }
}

export default Message = ({userType, message, likes, time}) => (
  <View style={styles.wrapper}>
    <View style={styles.contentWrapper}>
      <Text style={userType==='Guest'?styles.userType:styles.hostUserTitle}>{userType}</Text>
      <Text style={styles.time}>{moment(time).fromNow()}</Text>
      <Text style={styles.messageBody}>{message}</Text>
    </View>
    <View style={styles.likeWrapper}>
      <Entypo size={20} style={styles.likeBtn} name="chevron-thin-up" />
      <Text style={styles.likeCount}>
        {likes}
      </Text>
      <Entypo size={20} style={styles.dislikeBtn} name="chevron-thin-down" />
    </View>
  </View>
)