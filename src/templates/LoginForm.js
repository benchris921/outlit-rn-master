import React, { Component } from 'react'
import { View } from 'react-native'

import TextInput from '../components/TextInput'
import PasswordField from '../components/PasswordField'
import AuthButton from '../components/AuthButton'
import FBAuthButton from '../components/FBAuthButton'
import SpliterWithText from '../components/SpliterWithText'
import ForgotPassword from '../components/ForgotPassword'
import TouchableText from '../components/TouchableText'
import ScreenDescription from '../components/ScreenDescription'
import AppLogo from '../components/AppLogo'

export default class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state= {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
    }
  }

  validate() {
    if(isEmpty(this.state.username)){
      Alert('Username cannot be empty')
      return;
    }
    if(isEmpty(this.state.password)){
      Alert('Password cannot be empty')
      return;
    }
    this.props.signin(this.state.username, this.state.password)
  }

  render() {
    return (
      <View>
        <AppLogo />
        <ScreenDescription text="Find the best events and venues around you."/>
        <TextInput
          text={this.state.username}
          placeholder={"Username"}
          onChange={(text) => {this.setState({username: text})}}
        />
        <PasswordField
          placeholder={"Password"}
          onChange={(text) => {this.setState({password: text})}}
        />
        <AuthButton text="Sign In"  onPress={() =>{this.validate()}}/>
        <ForgotPassword onPress={this.props.recoverPassword}/>
        <SpliterWithText text="or Sign In with" />
        <FBAuthButton text="Facebook" onPress={this.props.fbAuth}/>
        <TouchableText text="Don't you have an account? Sign Up" onPress={this.props.toSignup} />
      </View>
    )
  }
}