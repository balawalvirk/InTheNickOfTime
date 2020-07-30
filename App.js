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
// import firebase from 'react-native-firebase';


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppNavigation/>
    );
  }
}


