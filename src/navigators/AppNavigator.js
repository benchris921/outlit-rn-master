import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator, DrawerNavigator, TabNavigator, TabBarTop } from 'react-navigation'

import Welcome from '../screens/Welcome'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Map from '../screens/Map'
import CalendarView from '../screens/Calendar'
import ProfilePage from '../screens/ProfilePage'
import SettingsPage from '../screens/SettingsPage'
import ChangePasswordPage from '../screens/ChangePasswordPage'
import UITester from '../screens/UITester'
import SearchEvents from '../screens/SearchEvents'
import SearchVenues from '../screens/SearchVenues'
import NavBar from '../templates/NavBar'

const DrawerStack = DrawerNavigator({
  DiscoverMAP: { screen: Map },
  Calendar: {
    screen: CalendarView,
    params: {
      leftItem: 'menu',
    }
  },
  Profile: {screen: ProfilePage},
}, {
  mode: 'screen',
})

const SearchTabs = TabNavigator({
  SearchEvents: { screen: SearchEvents, navigationOptions: {title: 'Events'} },
  SearchVenues: { screen: SearchVenues, navigationOptions: {title: 'Venues'} }
}, {
  tabBarPosition: 'top',
  tabBarComponent: TabBarTop,
  tabBarOptions: {
    activeTintColor: 'rgb(0, 163, 178)',
    inactiveTintColor: 'rgb(120, 129, 139)',
    upperCaseLabel: false,
    style: {
      backgroundColor: 'white',
    },
    labelStyle: {
      fontSize: 14,
      lineHeight: 19,
    },
    tabStyle: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    indicatorStyle: {
      backgroundColor: 'rgb(0, 166, 186)'
    }
  }
})

const MainNavigator = StackNavigator({
  DrawerStack: { screen: DrawerStack },
  Search: { screen: SearchTabs }
}, {
  headerMode: 'float',
  mode: 'card',
  navigationOptions: {
    header: (props)=>{ return (
      <NavBar title="MAP"
        middleItem='search'
        rightItem='calendarcheck'
        showSearch={() => {props.navigation.navigate('Search')}}
        cancelSearch={() => {props.navigation.navigate('DiscoverMAP')}}
        rightOnPress={() => { props.navigation.navigate('Calendar', {leftItem: 'back'})}}
        leftItem={'menu'}
        leftOnPress={() => {  props.navigation.navigate('DrawerToggle')}}
      />
    )}
  }
});

export const AppNavigator = StackNavigator({
  Login: { screen: Login },
  Signup: { screen: Signup },
  Welcome: { screen: Welcome },
  Main: { screen: MainNavigator },
  Profile: {screen: ProfilePage },
  UiTester: { screen: UITester },
  Settings: {screen: SettingsPage},
  ChangePassword: {screen: ChangePasswordPage},
  UiTester: { screen: UITester },
}, {
  navigationOptions: {
    header: null,
  },
  mode: 'screen',
  headerMode: 'float',
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
