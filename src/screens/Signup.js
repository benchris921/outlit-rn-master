import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SocialIcon } from 'react-native-elements'

import GradientContainer from '../components/GradientContainer'
import SignupForm from '../templates/SignupForm'
import { loginUser, createUser, fbLoginUser } from '../reducers/AuthReducer'

class Signup extends Component {
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <GradientContainer>
        <SignupForm
          signup={(email, username, password) => {
            this.props.createUser({email, username, password})
          }}
          fbAuth={()=>{this.props.fbLoginUser()}}
          toLogin={()=>{this.props.navigation.navigate('Login')}}
        />
      </GradientContainer>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  email: auth.email,
  username: auth.username,
  passowrd: auth.passowrd,
  error: auth.error
})

const mapDispatchToProps = {
  loginUser,
  createUser,
  fbLoginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
