import React, {Component} from 'react';
import {
  View,
  Text,
} from 'react-native';

import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';

import NavBar from '../templates/NavBar';
import ReservationsList from '../templates/reservation-list';
import GradientContainer from '../components/GradientContainer';
import Calendar from '../templates/Calendar';

class CalendarView extends Component {
  
  static navigationOptions = {
    leftItem: 'menu',
  }

  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

  loadItems(day) {
    
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  render() {
    return(
      <GradientContainer>
        <Calendar />
      </GradientContainer>
    );
  }
}

Calendar.defaultProps = {
  leftItem: 'menu',
  navigation: {
    state: {
      params: {
        leftItem: 'menu',
      }
    }
  }
}

Calendar.propTypes = {
  leftItem: PropTypes.string,
  leftOnPress: PropTypes.func,
}

var {height, width} = Dimensions.get('window');
const styles = {
  calendarView: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
}

export default CalendarView;
