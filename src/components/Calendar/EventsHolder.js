import React from 'react'
import { ScrollView, View, Text } from 'react-native'

import SingleEvent from '../Event/SingleEvent'

const styles = {
  wrapper: {
    flex: 1,
    backgroundColor: '#f2f5f8',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  descriptionHolder: {
    height: 34,
    backgroundColor: 'transparent',
    padding: 10
  },
  description: {
    fontSize: 14,
    color: '#637786'
  },
  scrollView: {
    flex: 1
  }
}

const attendees = [
  {uri: 'https://www.incimages.com/uploaded_files/image/170x170/simon-sinek-headshot_34070.jpg'},
  {uri: 'https://media.glamour.com/photos/5695aa8e16d0dc3747ed3575/master/w_1250,c_limit/sex-love-life-2009-12-1207-02_party_pic_li.jpg'},
  {uri: 'https://lh3.googleusercontent.com/-j-_Hl3lNgMQ/U3d0CvZe9sI/AAAAAAAAAF8/Zk7AXFaDgOU/w530-h297-n/minion.jpg'},
]

export default EventsHolder = () => (
  <View style={styles.wrapper}>
    <View style={styles.descriptionHolder}>
      <Text style={styles.description}>
        You have 2 events today
      </Text>
    </View>
    <ScrollView style={styles.scrollView}>
      <SingleEvent
        eventTitle="First Summer Party"
        attendees={attendees}
        locationName="Playhouse"
        locationType="Bar"
        time="7:00 PM - 9:00 PM"
        going={17}
        total={82}
      />
      <SingleEvent
        eventTitle="First Summer Party"
        attendees={attendees}
        locationName="Playhouse"
        locationType="Bar"
        time="7:00 PM - 9:00 PM"
        going={17}
        total={82}
      />
    </ScrollView>
  </View>
)
