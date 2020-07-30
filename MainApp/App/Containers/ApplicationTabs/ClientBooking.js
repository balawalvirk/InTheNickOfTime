import React from "react";
import { totalSize } from "react-native-dimension";
import { Icon } from "react-native-elements";

import { createMaterialTopTabNavigator } from "react-navigation";
import AcceptedBooking from "../MainFlow/Client/My Booking/myBookings";
import PendingBooking from "../MainFlow/Client/My Booking/myBookingsPending";
import CanceledBooking from "../MainFlow/Client/My Booking/myBookingInCancel";
import CompletedBooking from "../MainFlow/Client/My Booking/myBookingsCompleted";
import colors from "../../Themes/Colors";
import { TechnicianRatings } from "../MainFlow/Client/Home/TechnicianDetail/technicianRatings";
export default createMaterialTopTabNavigator(
  {
    Pending: {
      screen: PendingBooking,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="tasks"
            size={totalSize(2)}
            type="font-awesome"
            color={tintColor}
          />
        )
      }
    },
    Accepted: {
      screen: AcceptedBooking,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="note"
            size={totalSize(2)}
            type="material-icon"
            color={tintColor}
          />
        )
      }
    },
    Completed: {
      screen: CompletedBooking,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="note"
            size={totalSize(2)}
            type="material-icon"
            color={tintColor}
          />
        )
      }
    },
    Cancelled: {
      screen: CanceledBooking,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="note"
            size={totalSize(2)}
            type="material-icon"
            color={tintColor}
          />
        )
      }
    }
  },
  {
    //initialRouteName : 'Tasks',
    //order:['Tasks','Notes'],
    //backBehavior: true,
    //lazy: true,
    swipeEnabled: true,
    tabBarOptions: {
      header: null,
      activeTintColor: colors.SPA_redColor,
      inactiveTintColor: "white",
      //activeBackgroundColor: colors.SPA_graycolor,
      //inactiveBackgroundColor: colors.SPA_graycolor,
      //showLabel: true,
      //showIcon: true,
      // allowFontScaling: true,
      style: {
        backgroundColor: colors.SPA_graycolor,
        paddingTop: totalSize(5)
        //justifyContent: 'center',
      },
      labelStyle: {
        fontWeight: "bold",
        fontSize: totalSize(1)
      }
      // tabStyle: {
      //   justifyContent:'center',
      //   alignItems:'center'
      // },
      // safeAreaInset: {bottom: 'always', top: 'never'}
      // navigationOptions: {
      //     header: null
      // }
    }
  }
);
