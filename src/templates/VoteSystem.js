import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import {Icon} from 'react-native-elements';


class VoteSystem extends Component {

  //TODO: Add tracking of upvotes and downvotes in the reducers
  //Also add a action/reducer to handle upvotes and down votes
  //Need to wait for that information to be passed from API calls
  render() {
    return(
      <View style={{flex: 1, alignSelf: 'stretch', alignItems: 'center'}}>
        <View style={{flex: 2, justifyContent: 'flex-end'}}>
          <Icon
            name='chevron-thin-up'
            type='entypo'
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20}}>00</Text>
        </View>
        <View style={{flex: 2, justifyContent: 'flex-start'}}>
          <Icon
            name='chevron-thin-down'
            type='entypo'
          />
        </View>
      </View>
    );
  }
}

export default VoteSystem;
