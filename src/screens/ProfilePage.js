import React, { Component } from 'react';
import { View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  PanResponder,
  ActivityIndicator,
  TouchableHighlight,
  Button,
  Image } from 'react-native';
import { connect }from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'react-native-firebase';
import Dimensions from 'Dimensions';

import OutlitData from '../outlitdata/OutlitData';
import AppNavBar from '../templates/AppNavBar';
import PreviewCard from '../templates/PreviewCard';

//Link to database
const outlit = new OutlitData();


class ProfilePage extends Component {
  static navigationOptions = {
    title: 'Profile Page',
    header: null,
  };
  //Begin Life cycle methods
  constructor(props) {
    super(props);
    //Get the nearby locations
    this.state = {
      bounceValue: new Animated.Value(100),
    };

  }

  componentWillMount() {
    console.log("Component will mount: ")
  }
  componentDidMount() {
  }

  //End life cycle methods
  
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.navBarContainer}>
          <AppNavBar title="My Profile"
            rightItem='settings'
            leftItem='back'
            rightOnPress={() => { debugger; this.props.navigation.navigate('Settings', {leftItem: 'profile'})}}
            leftOnPress = {() => {
              this.props.navigation.goBack()
            }}
          />
        </View>
        <View style={styles.contentContainer}>

          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatarImage}
              source={require('../Assets/MediaPlaceholderCircle.png')}
              />
            <Text style={styles.profileNameText}>
                Profile name
            </Text>
          </View>

          <View style={styles.buttonsWrapper}>
            <View style={styles.buttonWrapper}>
              <View style={styles.buttonIconWrapper}>
                <Image
                  style={styles.buttonIcon}
                  source={require('../Assets/profile/Host.png')}
                />
              </View>
              <Text style={styles.buttonText}>
                Host event
              </Text>
            </View>

            <View style={styles.buttonWrapper}>
              <View style={styles.buttonIconWrapper}>
                <Image
                  style={styles.buttonIcon}
                  source={require('../Assets/profile/PastEvents.png')}
                />
              </View>
              <Text style={styles.buttonText}>
                Past Events
              </Text>
            </View>

            <View style={styles.buttonWrapper}>
              <View style={styles.buttonIconWrapper}>
                <Image
                  style={styles.buttonIcon}
                  source={require('../Assets/profile/MyGroups.png')}
                />
              </View>
              <Text style={styles.buttonText}>
                My Groups
              </Text>
            </View>
          </View>

        </View>
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
    height: 64,
    width: width,
    backgroundColor: '#6644BA'
  },

  contentContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    height: height-80,
    width: width,
  },

  avatarContainer: {
    marginTop: 20,
    width: width,
    alignItems: 'center',
    justifyContent: 'center'
  },

  profileNameText: {
    marginTop: 10,
    color: '#512DA8',
    fontWeight: '600',
    fontSize: 18
  },

  avatarImage: {
    
  },

  buttonsWrapper: {
    flexDirection: 'row',
    marginTop: 20,
  },

  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonIconWrapper: {
    width: width / 3 - 10,
    margin: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E6ECF1',
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
  buttonIcon: {
    width: width / 3 - 30,
    height: width / 3 - 30,
    resizeMode: 'contain'
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center'
  }
};
const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
