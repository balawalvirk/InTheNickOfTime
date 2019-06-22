import React, { Component } from 'react';
import colors from '../../Themes/Colors'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements'
import bookingTechnician from '../MainFlow/Technician/Bookings/bookingsTechnician';
import ProfileTechnician from '../MainFlow/Technician/Profile/profileTechnician';
import SettingTechnician from '../MainFlow/Technician/Settings/settingsTechnician';
import HomeTechnician from '../MainFlow/Technician/Home/homeTechnician';

const tabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeTechnician,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="home" color={tintColor} size={totalSize(3.5)} />
            )
        }
    },
    Bookings: {
        screen: bookingTechnician,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-calendar" color={tintColor} size={totalSize(3.5)} type='ionicon' />
            )
        }
    },
    Profile: {
        screen: ProfileTechnician,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="person" color={tintColor} size={totalSize(3.5)} />
            )
        }
    },
    More: {
        screen: SettingTechnician,
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