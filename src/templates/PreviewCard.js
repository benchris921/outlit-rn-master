import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Animated, Image} from 'react-native';
import Dimensions from 'Dimensions';
import TitleInfo from './TitleInfo';
import VoteSystem from './VoteSystem';

export default class PreviewCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //add state elements
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {/* Preview Section */}
        <View style={styles.previewContainer}>
          {/* First Section */}
          <View style={styles.firstContainer}>
            <View style={styles.imageContainer}>
              <Image style={{width: 75, height: 75, borderRadius: 37.5,}}
                defaultSource={require('../Assets/placeholder.png')}
              />
            </View>
            <View style={styles.titleContainer}>
              <TitleInfo/>
            </View>
            <View style={styles.voteContainer}>
              <VoteSystem />
            </View>
          </View>
          {/* Second Section */}
          <View style={styles.firstContainer}>
            <View style={styles.titleContainer}>
              <Text style={{margin: 10}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mattis nunc at porta venenatis. Fusce feugiat, est id porta iaculis, magna felis lacinia mauris, eu aliquet velit nunc dapibus felis. Fusce et dictum diam. Aenean commodo sem augue, ac faucibus metus molestie eu. Duis ultricies eleifend aliquet.
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
    backgroundColor: 'white',
    width: width - 12,
    borderRadius: 8,
  },
  previewContainer: {
    height: 232
  },
  firstContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 4,
  },
  voteContainer: {
    flex: 1,
  }

}
