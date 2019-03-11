import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import Day from './Day'

function getMonthStartDate(date) {
  date = new Date(date)
  const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const curDate = new Date(`${date.getFullYear()}-${month}-01`)
  return curDate;
}

function getMonthEndDate(date) {
  date = new Date(date)
  const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const curDate = new Date(`${date.getFullYear()}-${month}-01`)
  curDate.setMonth(curDate.getMonth() + 1)
  curDate.setDate(curDate.getDate() - 1)
  return curDate;
}

function compareDate(a, b) {
  if(a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()) {
      return true
    }
  return false
}

export default class Days extends Component {
  constructor(props) {
    super(props)
    startDate = getMonthStartDate(props.curMonth)
    endDate = getMonthEndDate(props.curMonth)
    startDay = startDate.getDay();
    endDay = endDate.getDay();
    fullWeeks = (endDate.getDate() - (7 - startDay) - (endDay + 1))/7
    this.state = {
      startDate,
      endDate,
      startDay,
      endDay,
      fullWeeks,
    }
    console.log(this.state)
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.curMonth !== this.props.curMonth) {
      startDate = getMonthStartDate(nextProps.curMonth)
      endDate = getMonthEndDate(nextProps.curMonth)
      startDay = startDate.getDay();
      endDay = endDate.getDay();
      fullWeeks = (endDate.getDate() - (7 - startDay) - (endDay + 1))/7
      this.setState({
        startDate,
        endDate,
        startDay,
        endDay,
        fullWeeks,
      })
    }
  }
  getDate(dayNum) {
    let date = new Date(this.state.startDate)
    date.setDate(dayNum)
    return date
  }
  renderFirstLine() {
    let nodes = [];
    let show = false;
    for(let i=0;i<this.state.startDay;i++){
      nodes.push(
        <Day number='' key={i} />
      )
    }
    for(let i=this.state.startDay;i<7;i++){
      const highlight = compareDate(this.getDate(i-this.state.startDay+1), this.props.curDate)
      show = show || highlight;
      nodes.push(
        <Day
          number={i-this.state.startDay+1}
          highlight={highlight}
          onPress={() => {
            this.props.changeDate(this.getDate(i-this.state.startDay+1))
          }}
          key={i-this.state.startDay+1}
        />
      )
    }
    if(this.props.weekMode)
      return show?nodes:null
    return nodes
  }
  renderFullLine(startDate) {
    let nodes = [];
    let show = false;
    for(let i=0;i<7; i++){
      const highlight = compareDate(this.getDate(startDate+i), this.props.curDate)
      show = show || highlight
      nodes.push(
        <Day
          number={startDate+i}
          highlight={highlight}
          onPress={() => {
            this.props.changeDate(this.getDate(startDate+i))
          }}
          key={this.state.startDay + startDate + i}
        />
      )
    }
    if(this.props.weekMode)
      return show?nodes:null
    return nodes
  }
  renderFullLines() {
    let lines = [];
    for(let i=0; i<this.state.fullWeeks; i++) {
      lines.push(
        <View style={{flexDirection: 'row'}} key={`line${i}`}>
          {this.renderFullLine(7-this.state.startDay+1 + i*7)}
        </View>
      )
    }
    return lines
  }
  renderLastLine() {
    let nodes = [];
    let show = false;
    startDate = this.state.endDate.getDate() - this.state.endDay
    for(let i = 0; i <= this.state.endDay; i++) {
      const highlight = compareDate(this.getDate(startDate+i), this.props.curDate)
      show = show || highlight
      nodes.push(
        <Day
          number={startDate + i}
          highlight={highlight}
          onPress={() => {
            this.props.changeDate(this.getDate(startDate+i))
          }}
          key={this.state.startDay+this.getDate(startDate+i)}
        />
      )
    }
    for(let i = this.state.endDay + 1; i<7; i++)
      nodes.push(
        <Day
          number=''
          key={this.state.startDay+this.getDate(startDate+i)}
        />
      )
    if(this.props.weekMode)
      return show?nodes:null
    return nodes
  }
  render() {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          {this.renderFirstLine()}
        </View>
        {this.renderFullLines()}
        <View style={{flexDirection: 'row'}}>
          {this.renderLastLine()}
        </View>
      </View>
    )
  }
}