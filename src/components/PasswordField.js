import React, { Component } from 'react'
import { View, TextInput, Image, TouchableOpacity } from 'react-native'

export default class PasswordField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPassword: true,
    }
  }
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 59
        }}
      >
        <TextInput
          style={{
            flex: 1,
            backgroundColor: '#F2F5F8',
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
            padding: 10,
            margin: 10,
            marginRight: 0,
            fontSize: 15,
            fontFamily: 'Helvetica'
          }}
          onChangeText={this.props.onChange}
          placeholder={this.props.placeholder}
          placeholderTextColor='#637786'
          secureTextEntry={this.state.showPassword}
        />
        <TouchableOpacity
          style={{
            width: 36,
            height: 39,
            backgroundColor: '#F2F5F8',
            borderTopRightRadius: 2,
            borderBottomRightRadius: 2,
            paddingTop: 13,
            paddingLeft: 8,
            marginTop: 10,
            marginRight: 10
          }}
          onPress={() => {
            this.setState({
              showPassword: !this.state.showPassword
            })
          }}
        >
          <Image
            style={{
              width: 18,
              height: 12
            }}
            source={require('../Assets/Eye.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }
}