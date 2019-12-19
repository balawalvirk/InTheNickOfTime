import React from 'react';
import { totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements'; 

import { createMaterialTopTabNavigator } from 'react-navigation';
// import AcceptedBooking from '../MainFlow/Technician/Bookings/myBookings';
import PendingBooking from '../MainFlow/Technician/Bookings/bookingsTechnician';
import CanceledBooking from '../MainFlow/Technician/Bookings/myBookingInCancel';
import CompletedBooking from '../MainFlow/Technician/Bookings/myBookingsCompleted';
import colors from '../../Themes/Colors';
import { TechnicianRatings } from '../MainFlow/Client/Home/TechnicianDetail/technicianRatings';
export default createMaterialTopTabNavigator({
    Bookingss: {
        screen: PendingBooking,
        navigationOptions: {
            header: null,
            tabBarIcon: ({ tintColor }) => (<Icon name='tasks' size={totalSize(2)} type='font-awesome' color={tintColor} />)
        }
        
    },
    Completed : {
        screen: CompletedBooking,
        navigationOptions: {
            header: null,
            tabBarIcon: ({ tintColor }) => (<Icon name='note' size={totalSize(2)} type='material-icon' color={tintColor} />)
        }
    },
    Cancelled: {
        screen: CanceledBooking,
        navigationOptions: {
            header: null,
            tabBarIcon: ({ tintColor }) => (<Icon name='note' size={totalSize(2)} type='material-icon' color={tintColor} />)
        }
    },
}, {
        //initialRouteName : 'Tasks',
        //order:['Tasks','Notes'],
        //backBehavior: true,
        //lazy: true,
        swipeEnabled: true,
        tabBarOptions: {
            header: null,
            activeTintColor: colors.SPA_redColor,
            inactiveTintColor: 'white',
            //activeBackgroundColor: colors.SPA_graycolor,
            //inactiveBackgroundColor: colors.SPA_graycolor,
            //showLabel: true,
            //showIcon: true,
            // allowFontScaling: true, 
            style: {
                backgroundColor: colors.SPA_graycolor,
                //justifyContent: 'center',
            },
            labelStyle: {
                fontWeight: 'bold',
                fontSize: totalSize(1.2)
            },
            // tabStyle: {
            //   justifyContent:'center',
            //   alignItems:'center'
            // },
            // safeAreaInset: {bottom: 'always', top: 'never'}
            // navigationOptions: {
            //     header: null
            // }
        }
    });
