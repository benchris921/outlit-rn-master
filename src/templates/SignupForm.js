import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import { isEmpty } from 'lodash'

import TextInput from '../components/TextInput'
import PasswordField from '../components/PasswordField'
import AuthButton from '../components/AuthButton'
import FBAuthButton from '../components/FBAuthButton'
import SpliterWithText from '../components/SpliterWithText'
import TouchableText from '../components/TouchableText'
import ScreenDescription from '../components/ScreenDescription'
import AppLogo from '../components/AppLogo'

export default class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state= {
      email: '',
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
    }
  }

  validate() {
    if(isEmpty(this.state.email)){
      Alert('Email cannot be empty')
      return;
    }
    if(isEmpty(this.state.username)){
      Alert('Username cannot be empty')
      return;
    }
    if(isEmpty(this.state.password)){
      Alert('Password cannot be empty')
      return;
    }
    this.props.signup(this.state.email, this.state.username, this.state.password)
  }

  render() {
    return (
      <View>
        <AppLogo />
        <TextInput
          text={this.state.email}
          placeholder={"Email address"}
          onChange={(text) => {this.setState({email: text})}}
        />
        <TextInput
          text={this.state.username}
          placeholder={"Username"}
          onChange={(text) => {this.setState({username: text})}}
        />
        <PasswordField
          placeholder={"Password"}
          onChange={(text) => {this.setState({password: text})}}
        />
        <AuthButton text="Sign Up" onPress={() =>{this.validate()}}/>
        <SpliterWithText text="or Sign Up with" />
        <FBAuthButton text="Facebook" onPress={this.props.fbAuth}/>
        <TouchableText text="Do you have an account already? Sign In" onPress={this.props.toLogin} />
      </View>
    )
  }
}