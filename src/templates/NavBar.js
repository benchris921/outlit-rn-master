import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View,
  Text,
  Button,
  TextInput,
  TouchableHighlight,
  Image, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import { setSearchKey } from '../reducers/SearchReducer';

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
    };
  }

  getLeftItem() {
    if(this.props.leftItem == 'none') {
      return;
    }
    var name = 'none'
    if(this.props.leftItem == 'menu') {
      name = 'navicon'
    } else if (this.props.leftItem == 'profile') {
      name = 'user'
    }
    else if(this.props.leftItem == 'back') {
      name = 'angle-left'
    } 

    return(
      <Icon
        name={name}
        type='font-awesome'
        color='white'
        underLayColor='transparent'
        size={25}
        iconStyle={{margin: 6}}
        onPress={this.props.leftOnPress}
      />
    )
  }

  getRightItem() {
    if(this.props.rightItem == 'none') {
      return(
        <View style={styles.navBarButtons}/>
      )
    }
    var name = 'none'
    if(this.props.rightItem == 'calendarcheck') {
      name = 'calendar-check-o'
    } else if (this.props.rightItem == 'settings') {
      name = 'gear'
    }
    return(
      <Icon
        name={name}
        type='font-awesome'
        color='white'
        underLayColor='transparent'
        iconStyle={styles.navBarButtons}
        onPress={this.props.rightOnPress}
      />
    )
  }

  getMiddleItem() {
    if(this.props.middleItem == 'search') {
      return (
      <View style={styles.searchContainer}>
        {this.getLeftItem()}
        <TextInput style={styles.textBoxStyles}
          autoCapitalize='none'
          placeholder='Search here'
          placeholderTextColor='rgba(255, 255, 255, 0.5)'
          value={this.state.searchKey}
          onChangeText={(searchKey) => { this.setState({ searchKey }); }}
        />
      </View>)
    }
    else if(this.props.middleItem == 'title') {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
          <Text style={{color: 'white', flex: 1, fontSize: 20, fontWeight:'bold', marginTop: 5}} textAnchor="middle">
            {this.props.title}
          </Text>
        </View>
      )
    }
    else {
      return (
        <View style={{flex: 1}}/>
      )
    }
  }

  cancelSearch() {
    this.setState({
      searchNow: false
    })
    this.searchCtrl.blur();
    this.props.cancelSearch();
  }

  render() {
    return (
      <LinearGradient
        start={{x: 0.9, y: -0.7}} end={{x: 0.1, y: 0.95}}
        colors={['#3023ae', '#c86dd7'] }
        style={styles.mainContainer}
      >
        {!this.state.searchNow && <View style={[styles.navBarItemsContainer,{backgroundColor: this.props.backgroundColor}]}>
          <Icon
            name='user'
            color='white'
            size={25}
            onPress={this.props.leftOnPress}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: 'transparent'
            }}
          >
            Outlit
          </Text>
          <Icon
            name='calendar'
            color='white'
            size={25}
            onPress={this.props.rightOnPress}
          />
        </View>
        }
        <View style={styles.searchContainer}>
          <Icon
            name='magnifier'
            color='rgb(109, 127, 139)'
            size={20}
            style={{
              position: 'absolute',
              zIndex: 10,
              top: 13,
              left: 13,
              backgroundColor: 'transparent'
            }}
          />
          <TextInput
            ref={component => this.searchCtrl = component}
            style={styles.textBoxStyles}
            autoCapitalize='none'
            placeholder='Search here'
            placeholderTextColor='rgb(109, 127, 139)'
            value={this.props.searchKey}
            onChangeText={(searchKey) => { this.props.setSearchKey(searchKey) }}
            onFocus={() => {
              if(!this.state.searchNow) {
                this.setState({
                  searchNow: true
                })
                this.props.showSearch();
              }
            }}
          />
          {this.state.searchNow&&<Text style={styles.cancelText} onPress={() => {this.cancelSearch()}}>
            Cancel
          </Text>
          }
        </View>
      </LinearGradient>
    )
  }
}

NavBar.defaultProps = {
  backgroundColor: 'transparent',
  rightItem: 'none',
  leftItem: 'none',
  middleItem: 'title',
  title: 'title',
}

NavBar.propTypes = {
  rightItem: PropTypes.string,
  leftItem: PropTypes.string,
  middleItem: PropTypes.string,
  title: PropTypes.string,
  backgroundColor: PropTypes.string,
}

const styles = {
  mainContainer: {
    flexDirection: 'column',
    backgroundColor: 'black',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  navBarItemsContainer: {
    marginLeft: 9,
    marginRight: 9,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  navBarButtons: {
    flex: 1,
    width: 25,
    height: 25,
    borderRadius: 3,
    marginLeft: 12,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  textBoxStyles: {
    backgroundColor: 'rgb(241, 245, 248)',
    alignSelf: 'stretch',
    fontSize: 16,
    height: 38,
    borderRadius: 2,
    borderWidth: 0,
    paddingLeft: 35,
    flex: 1,
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'rgb(114, 63, 187)',
    shadowColor: "rgb(101, 59, 156)",
    shadowRadius: 3,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: 2,
    borderWidth: 0,
    padding: 5,
    justifyContent: 'center'
  },
  cancelText: {
    fontSize: 14,
    color: 'white',
    padding: 10,
  }
};

const mapStateToProps = state => ({
  searchKey: state.search.searchKey,
})

const mapDispatchToProps = {
  setSearchKey,
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
