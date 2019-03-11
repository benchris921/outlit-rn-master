import React from 'react'
import { View, Text, Image } from 'react-native'

const styles={
  wrapper: {
    paddingVertical: 20,
    borderBottomColor: 'rgba(230, 236, 241, 50)',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 14,
    color: '#9FABB4',
    marginBottom: 10
  },
  contentWrapper: {
    flexDirection: 'row',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentIconWrapper: {
    width: 44,
    height: 44,
    margin: 5,
    borderRadius: 22,
    borderColor: '#E6ECF1',
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E6ECF1',
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
  contentIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  contentText: {
    fontSize: 11,
    color: '#637786',
    textAlign: 'center'
  }
}

export default VenueContent = () => (
  <View style={styles.wrapper}>
    <Text style={styles.title}>
      What can you get there?
    </Text>
    <View style={styles.contentWrapper}>
      <View style={styles.content}>
        <View style={styles.contentIconWrapper}>
          <Image
            style={styles.contentIcon}
            source={require('../../Assets/venues/drinks.png')}
          />
        </View>
        <Text style={styles.contentText}>
          Drinks
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.contentIconWrapper}>
          <Image
            style={styles.contentIcon}
            source={require('../../Assets/venues/food.png')}
          />
        </View>
        <Text style={styles.contentText}>
          Food
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.contentIconWrapper}>
          <Image
            style={styles.contentIcon}
            source={require('../../Assets/venues/deals.png')}
          />
        </View>
        <Text style={styles.contentText}>
          Deals
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.contentIconWrapper}>
          <Image
            style={styles.contentIcon}
            source={require('../../Assets/venues/events.png')}
          />
        </View>
        <Text style={styles.contentText}>
          Events
        </Text>
      </View>
    </View>
  </View>
)