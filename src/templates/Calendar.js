import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import Month from '../components/Calendar/Month'
import WeekDays from '../components/Calendar/WeekDays'
import Days from '../components/Calendar/Days'
import EventsHolder from '../components/Calendar/EventsHolder'

const styles = {
  spliter: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginBottom: 5
  },
  spliterHolder: {
    backgroundColor: '#8f6fdc',
    height: 6,
    width: 110,
    borderRadius: 3,
    margin: 'auto'
  }
}

class Calendar extends Component {
  constructor(props){
    super(props)
    this.state={
      curMonth: new Date(),
      curDate: new Date(),
      weekMode: false
    }
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'stretch'}}>
        <View>
          <Month curDate={this.state.curMonth} onChange={(date) => {
            this.setState({
              curMonth: date,
              weekMode: false
            })
          }} />
          <WeekDays />
          <Days
            curDate={this.state.curDate}
            curMonth={this.state.curMonth}
            changeDate={(date) => {this.setState({curDate: date})}}
            weekMode={this.state.weekMode}
          />
        </View>
        <TouchableOpacity
          style={styles.spliter}
          onPress={() => {
            this.setState({
              weekMode: !this.state.weekMode,
              curMonth: this.state.curDate
            })
          }}
        >
          <View style={styles.spliterHolder}/>
        </TouchableOpacity>
        <EventsHolder />
      </View>
    )
  }
}

export default Calendar