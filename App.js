/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform} from 'react-native';
import AppNavigation from './MainApp/App/Navigation/AppNavigation';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log("before fcmToken: ", fcmToken);
   // alert(fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log("after fcmToken: ", fcmToken);
       // alert(fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission() {
    firebase.messaging().requestPermission()
      .then(() => {
        this.getToken();
      })
      .catch(error => {
        console.log('permission rejected');
      });
  }
  async checkPermission() {
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          console.log("Permission granted");
          this.getToken();
        } else {
          console.log("Request Permission");
          this.requestPermission();
        }
      });
  }
  async componentDidMount() {
    this.checkPermission();
  }

  render() {
    return (
      <AppNavigation/>
    );
  }
}


