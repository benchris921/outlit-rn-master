import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import EventAction from '../Event/EventAction'

const styles = {
  eventWrapper: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e6ecf1',
    marginBottom: 5,
    marginTop: 5,
    padding: 10
  },
  eventDetails: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(230, 236, 241, 0.5)',
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  eventImage: {
    width: 64,
    height: 64,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  eventTitle: {
    fontSize: 20,
  },
  eventPlace: {
    fontSize: 14,
  },
  venueInfo: {
    flexDirection: 'row'
  },
  details: {
    fontSize: 11,
    color: '#637786',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 5
  },
  dateWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
}

const typeText = {
  'food_spot': 'Food Spot',
  'bar': 'Bar',
  'club': 'Club',
  'cafe': 'Cafe',
  'house': 'House'
}

function getTypeText(locationType) {
  const types = Object.getOwnPropertyNames(locationType)
  let typeTexts = []
  for(let i=0; i<types.length; i++) {
    typeTexts.push(typeText[types[i]])
  }
  return typeTexts.join(', ')
}

export default SingleEvent = ({eventId, eventTitle, locationType, locationName, time, image}) => (
  <View style={styles.eventWrapper}>
    <View style={styles.eventDetails}>
      <Image
        style={styles.eventImage}
        source={{uri: image}}
        resizeMode="cover"
      />
      <View>
        <Text style={styles.eventTitle}>
          {eventTitle}
        </Text>
        <Text style={styles.eventPlace}>
          {`at ${locationName}`}
        </Text>
        <View style={styles.venueInfo}>
          <Text style={styles.details}>
            {getTypeText(locationType)}
          </Text>
          <Text style={styles.details}>
            {time}
          </Text>
        </View>
      </View>
    </View>
    <EventAction eventId={eventId} />
  </View>
)