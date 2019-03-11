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
import {Icon} from 'react-native-elements';

class AppNavBar extends Component {

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

  render() {
    return (
        <LinearGradient
          start={{x: 0.9, y: -0.7}} 
          end={{x: 0.1, y: 0.95}}
          colors={['#6644BA', '#6644BA'] }
          style={styles.mainContainer}
        >
          <View style={[styles.buffer, {backgroundColor: this.props.backgroundColor}]}/>
          {/* search bar */}
          <View style={[styles.navBarItemsContainer,{backgroundColor: this.props.backgroundColor}]}>
            {this.props.middleItem != 'search' &&
              this.getLeftItem()
            }
            {this.getMiddleItem()}
            {this.getRightItem()}
          </View>
        </LinearGradient>
    )
  }
}

AppNavBar.defaultProps = {
  backgroundColor: 'transparent',
  rightItem: 'none',
  leftItem: 'none',
  middleItem: 'title',
  title: 'title',
}

AppNavBar.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
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
    height: 64,
    alignItems: 'center',
    justifyContent: 'center'
  },
  navBarItemsContainer: {
    flex: 1,
    marginLeft: 9,
    marginRight: 9,
    flexDirection: 'row',
    alignItems: 'center'
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
    backgroundColor: 'transparent',
    flex: 1,
    alignSelf: 'stretch',
    fontSize: 16,
    height: 38,
    borderRadius: 2,
    borderWidth: 0,
    marginLeft: 15,

  },
  searchContainer: {
    flex: 1,
    height: 38,
    flexDirection: 'row',
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
  },
  buffer: {
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    height: 20,
  },
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch (NavigationActions.navigate("DrawerToggle")),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar);
