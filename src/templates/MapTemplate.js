import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'

import MapComponent from '../components/Map/Map'
import SingleEvent from '../components/Event/SingleEvent'
import OutlitData from '../outlitdata/OutlitData'

const outlit = new OutlitData();

const styles = {
  mapContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  eventContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  }
}

const attendees = [
  {uri: 'https://www.incimages.com/uploaded_files/image/170x170/simon-sinek-headshot_34070.jpg'},
  {uri: 'https://media.glamour.com/photos/5695aa8e16d0dc3747ed3575/master/w_1250,c_limit/sex-love-life-2009-12-1207-02_party_pic_li.jpg'},
  {uri: 'https://lh3.googleusercontent.com/-j-_Hl3lNgMQ/U3d0CvZe9sI/AAAAAAAAAF8/Zk7AXFaDgOU/w530-h297-n/minion.jpg'},
]

export default class MapTemplate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showEvent: false,
      curEvent: {}
    }
  }

  onPressEvent(event) {
    this.setState({
      showEvent: true,
      curEvent: event,
    })
  }

  onPressVenue(venue) {

  }

  render() {
    return (
      <View style={styles.mapContainer}>
        <MapComponent
          initialRegion={this.props.initialRegion}
          events={this.props.events}
          venues={this.props.venues}
          onPressEvent={(event) => {this.onPressEvent(event)}}
          onPressVenue={(venue) => {this.onPressVenue(venue)}}
          onChangeRegion={this.props.onChangeRegion}
        />
        {this.state.showEvent && 
          <View style={styles.eventContainer}>
            <SingleEvent
              eventId={this.state.curEvent.id}
              image={this.state.curEvent.metadata.images[0]}
              eventTitle={this.state.curEvent.metadata.title}
              locationType={this.state.curEvent.metadata.locationType}
              locationName={this.state.curEvent.metadata.locationName}
              time={`${this.state.curEvent.metadata.start} - ${this.state.curEvent.metadata.end}`}
            />
          </View>
        }
      </View>
    )
  }

}