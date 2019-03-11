import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SocialIcon } from 'react-native-elements'

import GradientContainer from '../components/GradientContainer'
import LoginForm from '../templates/LoginForm'
import { loginUser, createUser, fbLoginUser } from '../reducers/AuthReducer'

class Login extends Component {
  componentWillMount() {
    this.props.loginUser({email: 'npaul98@vt.edu', password: 'paulnoble'})
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <GradientContainer>
        <LoginForm
          signup={(username, password) => {
            this.props.loginUser({username, password})
          }}
          fbAuth={()=>{this.props.fbLoginUser()}}
          toSignup={()=>{this.props.navigation.navigate('Signup')}}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
