import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { find, isEmpty } from 'lodash'

import OutlitData from '../../outlitdata/OutlitData';
const outlitdata = new OutlitData();

const styles = {
  actions: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  attendeeWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  attendees: {
    fontSize: 12,
    color: '#637786'
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: 'transparent',
    margin: 2,
  },
  actionButtonIcon: {
    color: '#7b92aa'
  },
  attendeeImageWrapper: {
    flexDirection: 'row',
    width: 65,
    height: 22,
  },
  attendeeImage: {
    width: 22,
    height: 22,
    borderRadius: 11,
    overflow: 'hidden',
    position: 'absolute'
  },
}

function calcGoing(invites) {
  let going = 0;
  for(let i=0; i<invites.length; i++)
    if(invites[i].going)
      going ++
  return going
}

class EventAction extends Component {
  constructor(props) {
    super(props)
    this.state={
      going: false,
      inviteId: '',
      goingCount: 0,
      invites: {}
    }
    outlitdata.getInvitesForEvent(props.eventId)
      .then(invites => {
        const tmp = find(invites.invites, {'userId': props.userId})
        if(tmp) {
          const going = tmp.going
          const inviteId = tmp.id
          this.setState({
            going,
            inviteId,
            invites,
            goingCount: calcGoing(invites.invites)
          })
        } else {
          this.setState({
            going: false,
            inviteId: false,
            invites: {},
            goingCount: calcGoing(invites.invites)
          })
        }
      })
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.eventId != nextProps.eventId) {
      outlitdata.getInvitesForEvent(nextProps.eventId)
        .then(invites => {
          const tmp = find(invites.invites, {'userId': nextProps.userId})
          if(tmp) {
            const going = tmp.going
            const inviteId = tmp.id
            this.setState({
              going,
              invites,
              inviteId,
              goingCount: calcGoing(invites.invites)
            })
          } else {
            this.setState({
              going: false,
              inviteId: false,
              goingCount: calcGoing(invites.invites)
            })
          }
        })
    }
  }
  setInvitationState(flg) {
    outlitdata.updateInviteStatus(this.props.eventId, this.state.inviteId, flg)
    this.setState({
      going: flg,
      goingCount: flg?this.state.goingCount+1:this.state.goingCount-1
    })
  }
  render() {
    const {eventId} = this.props
    const invites = this.state.invites
    if(!isEmpty(this.state.invites))
      return (
        <View style={styles.actions}>
          <View style={styles.attendeeWrapper}> 
            <View style={styles.attendeeImageWrapper}>
              {invites.profileImages.map((val, key) => (
                <Image style={[styles.attendeeImage, {left: key*15}]} source={{uri: val}} resizeMode="cover" key={key} />
              ))}
            </View>
            <Text style={styles.attendees}>
              {`${this.state.goingCount} of ${invites.invites.length} attending`}
            </Text>
          </View>
          {
            this.state.inviteId &&
            <View style={styles.actionWrapper}>
              <Text>
                Going?
              </Text>
              <TouchableOpacity style={styles.actionButton} onPress={() => {this.setInvitationState(false)}}>
                {this.state.going?
                <Icon style={styles.actionButtonIcon} name="ios-close-circle-outline" size={34}/>
                :
                <Icon style={[styles.actionButtonIcon, {color: 'red'}]} name="ios-close-circle" size={34}/>
                }
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => {this.setInvitationState(true)}}>
                {this.state.going?
                  <Icon style={styles.actionButtonIcon} name="ios-checkmark-circle" size={34}/>
                  :
                  <Icon style={styles.actionButtonIcon} name="ios-checkmark-circle-outline" size={34}/>
                }
              </TouchableOpacity>
            </View>
          }
        </View>
      )
    return (
      <View style={styles.actions}>
        <ActivityIndicator />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.userInfo.uid
});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(EventAction);