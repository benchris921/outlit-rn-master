import React, { Component } from 'react';
import { View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  PanResponder,
  ActivityIndicator,
  TouchableHighlight,
  Image } from 'react-native';
import { connect }from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'react-native-firebase';
import MapView from 'react-native-maps';
import Dimensions from 'Dimensions';

import { getLocalEvents } from '../reducers/EventReducer'
import OutlitData from '../outlitdata/OutlitData';
import NavBar from '../templates/NavBar';
import PreviewCard from '../templates/PreviewCard';

//Event Markers array
var eventMarkers = [];
//Link to database
const outlit = new OutlitData();


class MapComponent extends Component {
  static navigationOptions = {
    title: 'Map View',
    header: null,
  };
  //Begin Life cycle methods
  constructor(props) {
    super(props);
    //Get the nearby locations
    this.state = {
      bounceValue: new Animated.Value(100),
      loadedEvents: false,
      region: {
        latitude: 37.769756,
        longitude: -122.465767,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      marker: { id: '',
          distance: 0,
          metadata:
           {private: false,
             types: { club: true, music: true },
             createdTime: 'Mon Jan 01 2018 23:39:47 GMT-0500 (EST)',
             creator: '',
             loc: [ 0, 0],
             title: '',
             g: ''}
      },
      previewOn: false,
      previewYPos: height,
      randomText: 'beep bop',

    };

  }

  componentWillMount() {
    console.log("Component will mount: ")

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => !!this.getDragDetails(gestureState),
      onPanResponderMove: (evt, gestureState) => {
        const drag = this.getDragDetails(gestureState);
        this.setState({
          randomText: drag,
        });
        if(drag == 'up prev') {
          console.log('Moving preview up');
          this._toggleFullDetailsUp();
        }
        else if(drag == 'down prev') {
          //this._toggleFullDetailsDown();
          console.log('Moving preview down');
          this._togglePreviewCard();
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
    });
  }
  componentDidMount() {
    const CURRENT_LOCATION = {
        center: [37.770635, -122.467476], // latitude, longitude
        radius: 10, // in kilometers
    };
    this.props.getLocalEvents(CURRENT_LOCATION);
  }

  //End life cycle methods

  //Begin animation methods
  _togglePreviewCard() {

    var toValue = 100;
    if(!this.state.previewOn) {
        toValue = -147;
    }

    Animated.spring (
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 2,
        friction: 8,
        tension: 1,
      }
    ).start();
    this.setState({previewOn: !this.state.previewOn, previewYPos: -1 * toValue + 100})
  }

  _toggleFullDetailsUp() {
    var toValue = -418;

    Animated.spring (
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 2,
        friction: 8,
        tension: 3,
      }
    ).start();
    this.setState({previewOn: false, previewYPos: -1 * toValue + 60})
  }


  //End animation methods
  //Pan Responder methods
  /**
  * moveX and moveY are the initial position of the gesture state
  * dX and dY are the change from where the initial touches were put down
  **/
  getDragDetails({moveX, moveY, dx, dy}) {
    //Must drag greater than |30| to register drag
    const draggedUp = dy < -15;
    const draggedDown = dy > 15;
    const draggedRight = dx > 15;
    const draggedLeft = dx < -15;
    //Check where the drag is
    //is the drag on the top portion of the preview
    const previewDrag = (moveY < 30 + height - this.state.previewYPos && moveY > -30 + height - this.state.previewYPos);
    let dragDirection = '';

    if (draggedUp && previewDrag) {
      dragDirection += 'up prev';
    }
    else if (draggedDown && previewDrag) {
      dragDirection += 'down prev';
    }
    else if(draggedUp) {
      dragDirection += 'up';
    }
    else {
      dragDirection = 'called';
    }

    if (dragDirection) {
      return dragDirection;
    }
  }
  //End Pan Responder methods
  didSelectMarker() {

  }
  //Load the map only when the nearbyEvents have been fetched
  loadMap() {
    if(!this.state.loadedEvents) {
      return(
        <MapView
          style={styles.mapContainer}
          initialRegion={this.state.region}
          onRegionChange={(region) => {
            this.setState({ region })
            this.props.getLocalEvents({
              center: [region.latitude, region.longitude],
              radius: 10,
            })
          }}
        >
        {//Dynamically load the map markers
          this.props.events.map((marker, i) => {
            return (
              <MapView.Marker
                key={marker.id}
                title={marker.metadata.title}
                coordinate={{latitude: marker.metadata.loc[0], longitude: marker.metadata.loc[1]}}
                onPress={() => {this._togglePreviewCard()}}
              >
                <View style={styles.customMarker}/>
              </MapView.Marker>
            );
          })}
        </MapView>
      )
    }
    else {
      return (
        <ActivityIndicator size="large" color="rgb(48, 35, 174)"/>
      )
    }
  }
  render() {
    return (
      <View style={styles.mainContainer} {...this._panResponder.panHandlers}>
        {this.loadMap()}
        <View style={styles.navBarContainer}>
          <NavBar title="Outlit"
            rightItem='calendarcheck'
            rightOnPress={() => { debugger; this.props.navigation.navigate('Calendar', {leftItem: 'back'})}}
            leftItem={'profile'}
            leftOnPress={() => {  debugger; this.props.navigation.navigate('Profile', {leftItem: 'back'})}}
          />
        </View>

        <Animated.View
          style={[styles.cardContainer, {transform: [{translateY: this.state.bounceValue}]}]}
        >
          <View style={styles.dragBar}/>
          <PreviewCard />
          <TouchableHighlight style={styles.exploreButton}>
            <Image style={{width: 56, height: 56, borderRadius: 28,}}
              defaultSource={require('../Assets/placeholder.png')}
            />
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }
}

var {height, width} = Dimensions.get('window');
const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  dragBar: {
    height: 5,
    width: 90,
    backgroundColor: 'rgba(203, 203, 203, 0.8)',
    margin: 6,
    borderRadius: 8,
  },
  cardContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    alignItems: 'center',
    width: width,
    height: height,
    top: height - 100,
    left: 0,
    backgroundColor: 'rgba(248, 248, 248, 0.6)'
  },
  navBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 78,
    width: width,
  },
  mapContainer: {
    flex: 1,
  },
  exploreButton: {
    position: 'absolute',
    top: 0 - 20 - 56,
    left: width - 20 - 56,
    backgroundColor: "rgb(255, 203, 46)",
  	shadowColor: "rgba(0, 0, 0, 0.16)",
  	shadowOffset: {
  		width: 0,
  		height: 2
  	},
  	shadowRadius: 4,
  	shadowOpacity: 1,
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  customMarker: {
    width: 18,
  	height: 18,
    borderRadius: 9,
  	backgroundColor: "rgb(182, 101, 211)",
  	shadowColor: "rgba(0, 0, 0, 0.15)",
  	shadowOffset: {
  		width: 0,
  		height: 0
  	},
  	shadowRadius: 5,
  	shadowOpacity: 1,
  	borderStyle: "solid",
  	borderWidth: 1,
  	borderColor: "rgb(255, 255, 255)"
  }
};

const mapStateToProps = (state) => ({
  events: state.events.events,
});

const mapDispatchToProps = {
  getLocalEvents
}


export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
