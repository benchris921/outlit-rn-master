import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Button, TextInput, TouchableHighlight, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SocialIcon } from 'react-native-elements'

import GradientContainer from '../components/GradientContainer'
import { loginUser, createUser, fbLoginUser } from '../reducers/AuthReducer'

class Welcome extends Component {
  static navigationOptions = {
    title: "Welcome",
  };
  constructor(props) {
    super(props);
    console.log("Boi");
    this.state = {
      view: 'Welcome',
      email: '',
      username: '',
      password: '',
      error: '',
    };
  }

  formButton() {
    if(this.state.view == 'Log in') {
      return (
        <TouchableHighlight
          underlayColor={'transparent'}
          style={styles.submitButton}
          disabledSyle={styles.disabledButton}
          onPress={() => {this.props.loginUser({email: this.state.email, password: this.state.password})}}
        >
          <Text style={{color: 'white'}}> Login </Text>
        </TouchableHighlight>
      )
    }
    else {
      return (
        <TouchableHighlight
          underlayColor={'transparent'}
          style={styles.submitButton}
          disabledSyle={styles.disabledButton}
          onPress={() => this.props.createUser({email: this.state.email, username: this.state.username, password: this.state.password})}
        >
          <Text style={{color: 'white'}}> Create Account </Text>
        </TouchableHighlight>
      )
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      
      <GradientContainer>
        <Button onPress={() => this.props.loginUser({email: 'npaul98@vt.edu', password: 'paulnoble'})} title={'press to not log in'}/>
        {this.state.view == 'Welcome' &&
            <View style={{alignItems: 'center', flex: 1}}>
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  defaultSource={require('../Assets/logo_full.png')}
                  style={{height: 123, width: 185, resizeMode:'stretch'}}
                />
              </View>
              <View style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-end'}}>
                <SocialIcon
                  title='LOGIN WITH FACEBOOK'
                  button
                  type='facebook'
                  onPress={this.props.fbLoginUser}
                  style={{alignSelf: 'stretch', margin: 32, borderRadius: 3, backgroundColor: 'rgb(55, 108, 200)'}}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableHighlight
                    style={{flex: 1, alignItems: 'center'}}
                    onPress={() => { this.setState({ view: 'Sign up' }); }}
                  >
                    <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}> SIGN UP </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{flex: 1, alignItems: 'center'}}
                    onPress={() => { this.setState({ view: 'Log in' }); }}
                  >
                    <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}> LOG IN </Text>
                  </TouchableHighlight>
                </View>

                <TouchableHighlight
                    style={{alignItems: 'center', marginTop: 30}}
                    onPress={() => {this.props.loginUser('npaul98@vt.edu', 'paulnoble')}}
                  >
                    <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}> SKIP >></Text>
                  </TouchableHighlight>

              </View>
            </View>
        }

        {(this.state.view == 'Log in' || this.state.view == 'Sign up') &&
            <View style={{flex: 1, marginTop: 20}}>
                <View style={{flex: 1, alignItems: 'flex-end', marginTop: 20, marginRight: 15}}>
                  <TouchableHighlight onPress={() => {this.setState({view: 'Welcome'}); }}
                    style={styles.xButton}
                  >
                    <Image
                      source={require('../Assets/x-button.png')}
                      style={styles.xButton}
                    />
                  </TouchableHighlight>
                </View>
                <View style={{flex: 2, alignItems:'center'}}>
                  <Image
                    source={require('../Assets/Logo.png')}
                    style={{height: 48, width: 40, resizeMode:'stretch'}}
                  />
                </View>
                <Text style={{backgroundColor: 'transparent', color: 'white', fontSize: 20, fontWeight: '600', alignItems: 'center', marginLeft: 30, marginRight: 30, textAlign:'center'}}> 
                  Find the best events and venues around you.
                </Text>
                <View style={{flex: 5}}>
                  <View style={[styles.textInputViewStyles, styles.textInputMarginStyle]}>
                    <Text style={styles.errorTextStyle}>
                      {this.props.error}
                    </Text>
                  </View>
                  <View style={[styles.textInputViewStyles, styles.textInputMarginStyle]}>
                    <TextInput style={styles.textBoxStyles}
                      autoCapitalize='none'
                      autoCorrect={false}
                      placeholder='email address'
                      placeholderTextColor= '#637786'
                      value={this.state.email}
                      onChangeText={(email) => { this.setState({ email }); }}
                    />
                  </View>
                  {this.state.view == 'Sign up' &&
                    <View style={[styles.textInputViewStyles, styles.textInputMarginStyle]}>
                      <TextInput style={styles.textBoxStyles}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder='username'
                        placeholderTextColor= '#637786'
                        value={this.state.username}
                        onChangeText={(username) => { this.setState({ username }); }}
                      />
                    </View>
                  }
                  <View style={[styles.textInputViewStyles, styles.textInputMarginStyle]}>
                    <TextInput style={styles.textBoxStyles}
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={true}
                      placeholder='password'
                      placeholderTextColor= '#637786'
                      value={this.state.password}
                      onChangeText={(password) => { this.setState({ password }); }}
                    />
                  </View>
                  {this.formButton()}
                </View>
            </View>
        }
      </GradientContainer>
    )
  }
}

const styles = {
  textBoxStyles: {
    flex: 1,
    backgroundColor: 'white',
    color: 'black',
    paddingLeft: 5,
    paddingRight: 5
  },
  textInputViewStyles: {
      flexDirection: 'row',
      height: 36,
      marginTop: 10,
      marginBottom: 10,
  },
  textInputMarginStyle: {
      marginLeft: 32,
      marginRight: 32,
  },
  submitButton: {
      marginLeft: 32,
      marginRight: 32,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgb(0,172,193)',
      borderRadius: 4,
  },
  disabledButton: {
      marginLeft: 32,
      marginRight: 32,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderRadius: 2,
      borderWidth: 1,
      borderColor: 'rgb(255, 203, 46)',
  },
  xButton: {
      width: 20,
      height: 20,
  }
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
