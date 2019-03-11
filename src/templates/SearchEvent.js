import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { filter, isEmpty } from 'lodash'

import SingleEvent from '../components/Event/SingleEvent'

const SearchEventTemplate = ({events, searchKey}) => {
  const filteredEvent = isEmpty(events)?[]:isEmpty(searchKey)?events:filter(events, (o) => {
    return o.metadata.locationName.search(searchKey) != -1 ||
          o.metadata.title.search(searchKey) != -1
  })
  return (
    <View style={{flex: 1}}>
      {
        isEmpty(filteredEvent)&&
          <View>
            <Text>No Events</Text>
          </View>
      }
      {
        !isEmpty(filteredEvent)&&
        <ScrollView style={{flex: 1}}>
          {
            filteredEvent.map((event, key) => (
              <SingleEvent
                eventId={event.id}
                image={event.metadata.images[0]}
                eventTitle={event.metadata.title}
                locationType={event.metadata.locationType}
                locationName={event.metadata.locationName}
                time={`${event.metadata.start} - ${event.metadata.end}`}
                showDate={true}
              />
            ))
          }
        </ScrollView>
      }
    </View>
  )
}

export default SearchEventTemplate