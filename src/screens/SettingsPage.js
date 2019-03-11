import React, { Component } from 'react';
import { View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  PanResponder,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Image } from 'react-native';

import { connect }from 'react-redux';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';
import FBAuthButton from '../components/FBAuthButton'
import OutlitData from '../outlitdata/OutlitData';
import AppNavBar from '../templates/AppNavBar';
import PreviewCard from '../templates/PreviewCard';

//Link to database
const outlit = new OutlitData();

class SettingsPage extends Component {
  static navigationOptions = {
    title: 'Settings',
    header: null,
  };
  //Begin Life cycle methods
  constructor(props) {
    super(props);
    //Get the nearby locations    
  }

  componentWillMount() {
    console.log("Component will mount: ")
  }
  componentDidMount() {
  }

  onChangePassword = () => {
    this.props.navigation.navigate('ChangePassword', {leftItem: 'settings'})
  }

  //End life cycle methods  
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.navBarContainer}>
          <AppNavBar title="Settings"
            rightItem="none"
            middleItem="title"
            leftItem='back'
            leftOnPress = {() => {
              this.props.navigation.goBack()
            }}
          />
        </View>
        <ScrollView style={styles.contentContainer}>

          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatarImage}
              source={require('../Assets/MediaPlaceholderCircle.png')}
              />
            <Text style={styles.avatarText}>
                Change profile picture
            </Text>
          </View>

          <Text style={styles.sectionTitle}>
              Information
          </Text>
          <View style={styles.sectionView}>
            <View style={styles.sectionRowView}>
              <Text style={styles.rowCaption}>Name</Text>
              <TextInput
                style={styles.textInput}
                underlineColorAndroid = "transparent"
                placeholder = "Enter your name"
                placeholderTextColor = "#637786"
                autoCapitalize = "words"
                />
            </View>
            <View style={styles.rowDivider} />
            <View style={styles.sectionRowView}>
              <Text style={styles.rowCaption}>Email</Text>
              <TextInput
                style={styles.textInput}
                underlineColorAndroid = "transparent"
                placeholder = "Email address"
                placeholderTextColor = "#637786"
                autoCapitalize = "words"
                />
            </View>
            <View style={styles.rowDivider} />
            <View style={styles.sectionRowView}>
              <Text style={styles.rowCaption}>Username</Text>
              <TextInput
                style={styles.textInput}
                underlineColorAndroid = "transparent"
                placeholder = "Username"
                placeholderTextColor = "#637786"
                autoCapitalize = "words"
                />
            </View>
          </View>

          <FBAuthButton text="Connect with Facebook" onPress={this.props.fbAuth}/>

          <Text style={styles.sectionTitle}>
              Events
          </Text>

          <View style={styles.sectionView}>
            <View style={styles.sectionRowView}>
              <Text style={styles.rowCaption}>Range</Text>
              <TextInput
                style={styles.textInput}
                underlineColorAndroid = "transparent"
                placeholder = "Range"
                placeholderTextColor = "#637786"
                autoCapitalize = "words"
                />
            </View>
          </View>

          <Text style={styles.sectionTitle}>
              Account
          </Text>

          <View style={styles.sectionView}>
            <View style={styles.sectionAccountRowView}>
              <Text style={styles.fullRowCoverCaption}>Notifications</Text>
              <Switch value={true}/>
            </View>
            <View style={styles.accountRowDivider} />
            <TouchableOpacity style={styles.sectionAccountRowView} onPress={this.onChangePassword}>
              <Text style={styles.fullRowCoverCaption}>Change Password</Text>
              <Icon name="angle-right" size={20} color="#999" />
            </TouchableOpacity>
            <View style={styles.accountRowDivider} />
            <TouchableOpacity style={styles.sectionAccountRowView}>
              <Text style={styles.fullRowCoverCaption}>Help Center</Text>
              <Icon name="angle-right" size={20} color="#999" />
            </TouchableOpacity>
            <View style={styles.accountRowDivider} />
            <TouchableOpacity style={styles.sectionAccountRowView}>
              <Text style={styles.fullRowCoverCaption}>Terms of Service</Text>
              <Icon name="angle-right" size={20} color="#999" />
            </TouchableOpacity>
            <View style={styles.accountRowDivider} />
            <TouchableOpacity style={styles.sectionAccountRowView}>
              <Text style={styles.fullRowCoverCaption}>Sign Out</Text>
              <Icon name="angle-right" size={20} color="#999" />
            </TouchableOpacity>
            <View style={styles.accountRowDivider} />
            <TouchableOpacity style={styles.sectionAccountRowView}>
              <Text style={styles.fullRowCoverCaption}>Close Account</Text>
              <Icon name="angle-right" size={20} color="#999" />
            </TouchableOpacity>
          </View>

        </ScrollView>

      </View>
    );
  }
}

var {height, width} = Dimensions.get('window');
const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: '#F2F5F8',
    justifyContent: 'center'
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

  avatarText: {
    marginTop: 10,
    color: '#512DA8',
    fontSize: 15
  },

  avatarImage: {
    width: 60,
    height: 60
  },

  sectionTitle: {
    margin: 10,
    fontSize: 15,
    fontWeight:'600',
    color: '#637786'
  },

  sectionView: {
    flexDirection: 'column',
    backgroundColor: 'white'
  },

  sectionRowView: {
    flexDirection: 'row',
    padding: 10,
  },

  sectionAccountRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },

  rowCaption: {
    width: 80,
    fontSize: 16
  },

  fullRowCoverCaption: {
    fontSize: 16,
  },

  textInput: {
    marginLeft: 15
  },

  rowDivider: {
    height: 0.33,
    backgroundColor: '#7f637786',
    marginLeft: 90,
  },

  accountRowDivider: {
    height: 0.33,
    backgroundColor: '#7f637786',
    marginLeft: 20,
  },
};
const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
