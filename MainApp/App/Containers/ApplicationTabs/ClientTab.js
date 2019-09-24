import React, { Component } from 'react';
import { View, Text } from 'react-native';
import colors from '../../Themes/Colors'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Home from '../MainFlow/Client/Home/home';
import { totalSize } from 'react-native-dimension';
import { Icon, Overlay } from 'react-native-elements'
import ProfileClient from '../MainFlow/Client/Profile/profileClient';
import MyBookings from './ClientBooking';
import Settings from '../MainFlow/Client/Settings/settings';
import OurStory from '../MainFlow/Client/ourStory/ourStory'
const tabNavigator = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="home" color={tintColor} size={totalSize(3.5)} />
            )
        }
    },
    MyBookings: {
        screen: MyBookings,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-calendar" color={tintColor} size={totalSize(3.5)} type='ionicon' />
            )
        }
    },
    Profile: {
        screen: ProfileClient,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="person" color={tintColor} size={totalSize(3.5)} />
            )
        }
    },
    OurStory: {
        screen:OurStory,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="book" color={tintColor} size={totalSize(3.5)} />
            )
        }
    },
    More: {
        screen: Settings,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="more" color={tintColor} size={totalSize(3.5)} type='material'/>
            )
        }
    },

}, {
        tabBarOptions: {
            activeTintColor: colors.SPA_redColor,
            //inactiveTintColor:colors.SPA_graycolor,
            inactiveTintColor: 'gray',
            //activeBackgroundColor: 'rgb(0,41,132)',
            //inactiveBackgroundColor: 'rgb(0,41,132)',
            safeAreaInset: { bottom: 'never', top: 'never' }
        },

    }
);

export default createAppContainer(tabNavigator);