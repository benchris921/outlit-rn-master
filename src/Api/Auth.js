import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

export const createUser = (email, username, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      return user
    })
    .catch((error) => {
      return {
        error: 'error',
        detail: error
      }
    });
};

export const loginUser = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      return user
    })
    .catch((error) => {
      return {
        error: 'error',
        detail: error
      }
    })
};

export const loginWithFacebook = () => {
  return LoginManager.logInWithReadPermissions(['public_profile'])
    .then((result) => {
      return AccessToken.getCurrentAccessToken()
    })
    .then((data) => {
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      return firebase.auth().signInWithCredential(credential);
    }).then((user) => {
      return user
    })
    .catch((error) => {
      return {
        error: 'error',
        detail: error
      }
    });
};