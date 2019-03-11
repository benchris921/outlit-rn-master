import React, { Component } from 'react';
import { View } from 'react-native';
import { connect }from 'react-redux';

import { getLocalEvents } from '../reducers/EventReducer'
import { getLocalVenues } from '../reducers/VenueReducer'
import OutlitData from '../outlitdata/OutlitData';
import NavBar from '../templates/NavBar';
import MapTemplate from '../templates/MapTemplate'

const outlit = new OutlitData();

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  navBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 78,
    width: '100%',
  },
};


class MapComponent extends Component {
  static navigationOptions = {
    title: 'Map View',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.769756,
        longitude: -122.465767,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }
  componentWillMount() {
    const CURRENT_LOCATION = {
        center: {
          latitude: 37.766369265658085,
          longitude: -122.44408313137559
        },
        radius: 10,
    };
    this.props.getLocalEvents(CURRENT_LOCATION);
    // this.props.getLocalVenues(CURRENT_LOCATION);
  }

  render() {
    return (
      <View style={styles.mainContainer} >
        <MapTemplate
          events={this.props.events}
          venues={this.props.venues}
          onChangeRegion={(region) => {
            const CURRENT_LOCATION = {
              center: {
                latitude: region.latitude,
                longitude: region.longitude
              },
              radius: 10,
            };
            this.props.getLocalEvents(CURRENT_LOCATION);
          }}
          initialRegion={this.state.region}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.events.events,
  venues: state.venues.venues
});

const mapDispatchToProps = {
  getLocalEvents,
  getLocalVenues
}


export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
