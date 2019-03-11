import React from 'react'
import { View, ScrollView, Text } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import LinearGradient from 'react-native-linear-gradient'

const styles={
  wrapper: {
    padding: 10,
    height: 116,
    borderTopColor: 'rgba(230, 236, 241, 50)',
    borderTopWidth: 1,
  },
  reviewCount: {
    color: '#9FABB4',
    fontSize: 14,
  },
  reviewContainer: {
    height: 58,
    marginVertical: 10,
  },
  reviewItem: {
    padding: 5,
    borderRightColor: '#F0F3F6',
    borderRightWidth: 1,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center'
  },
  starContainer: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'space-between'
  },
  star: {
    color: '#C9D8E1',
  },
  starFilled: {
    color: '#512DA8'
  },
  reviewType: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center'
  },
  reviewItemCount: {
    fontSize: 11,
    color: '#637786',
    textAlign: 'center'
  },
  likesCounter: {
    position: 'absolute',
    right: 5,
    top: 0,
    height: 116,
    paddingLeft: 30,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  likeBtn: {
    color: '#512DA8',
  },
  likeCount: {
    color: '#512DA8',
    fontSize: 20,
  },
  dislikeBtn: {
    color: '#A6ACB0',
  }
}

function renderStars(stars) {
  let node = [];
  for(let i=0;i<stars;i++)
    node.push(
      <Entypo style={styles.starFilled} size={14} name="star" key={i} />
    )
  for(let i=stars;i<5;i++)
    node.push(
      <Entypo style={styles.star} size={14} name="star-outlined" key={i} />
    )
  return node;
}

export default VenueReview = ({reviewCount, reviews, likes}) => (
  <View style={styles.wrapper}>
    <Text style={styles.reviewCount}>
      {`${reviewCount} Reviews`}
    </Text>
    <ScrollView style={styles.reviewContainer} horizontal={true}>
      {reviews.map((val, key) => (
        <View style={styles.reviewItem}>
          <View style={styles.starContainer}>
            {renderStars(val.stars)}
          </View>
          <Text style={styles.reviewType}>
            {val.type}
          </Text>
          <Text style={styles.reviewItemCount}>
            {`${val.count} Reviews`}
          </Text>
        </View>
      ))}
    </ScrollView>
    <LinearGradient
      style={styles.likesCounter}
      colors={['rgba(255,255,255,0)', 'white']}
      start={{x: 0, y: 0}}
      end={{x: 0.25, y: 0}}
    >
      <Entypo size={20} style={styles.likeBtn} name="chevron-thin-up" />
      <Text style={styles.likeCount}>
        {likes}
      </Text>
      <Entypo size={20} style={styles.dislikeBtn} name="chevron-thin-down" />
    </LinearGradient>
  </View>
)