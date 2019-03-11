import React, { Component } from 'react'
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer';

const styles = {
  wrapper: {
    flex: 1,
    alignItems: 'stretch'
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    color: '#637786',
    padding: 20,
  },
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgb(238, 242, 246)'
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionPart: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  letterCount: {
    color: '#637786',
    fontSize: 12.5,
    marginRight: 10
  },
  button: {
    width: 69,
    height: 28,
    backgroundColor: '#00ACC1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowColor: '#596176',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
    letterSpacing: -0.35,
    lineHeight: 20
  }
}

export default class NewMessage extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      remainingLetters: 280
    }
  }

  componentWillMount() {
  }

  changeText(text) {
    this.setState({
      message: text,
      remainingLetters: 280 - text.length
    })
    if(this.props.onChange)
      this.props.onChange(text);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <TextInput
          multiline={true}
          style={styles.textInput}
          value={this.state.message}
          onChangeText={(text)=>{this.changeText(text)}}
        />
        <View style={styles.userSection}>
          <Image source={this.props.profilePic} style={styles.profileImage} resizeMode="cover" />
          <View style={styles.actionPart}>
            <Text style={styles.letterCount}>{this.state.remainingLetters}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>
                Post
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardSpacer />
      </View>
    )
  }
}
