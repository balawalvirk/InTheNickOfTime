import React, { Component } from "react";
import { Platform } from "react-native";
import colors from "../../Themes/Colors";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { totalSize } from "react-native-dimension";
import { Icon } from "react-native-elements";
import bookingTechnician from "../MainFlow/Technician/Bookings/bookingsTechnician";
import ProfileTechnician from "../MainFlow/Technician/Profile/profileTechnician";
import SettingTechnician from "../MainFlow/Technician/Settings/settingsTechnician";
import HomeTechnician from "../MainFlow/Technician/Home/homeTechnician";
import TecBooking from "./TecBooking";
const tabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeTechnician,
      navigationOptions: {
        tabBarLabel: "",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" color={tintColor} size={totalSize(3.5)} />
        )
      }
    },
    Bookings: {
      screen: TecBooking,
      navigationOptions: {
        tabBarLabel: "",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="md-calendar"
            color={tintColor}
            size={totalSize(3.5)}
            type="ionicon"
          />
        )
      }
    },
    Profile: {
      screen: ProfileTechnician,
      navigationOptions: {
        tabBarLabel: "",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="person" color={tintColor} size={totalSize(3.5)} />
        )
      }
    },
    More: {
      screen: SettingTechnician,
      navigationOptions: {
        tabBarLabel: "",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="more"
            color={tintColor}
            size={totalSize(3.5)}
            type="material"
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: colors.SPA_redColor,
      //inactiveTintColor:colors.SPA_graycolor,
      inactiveTintColor: "gray",
      //activeBackgroundColor: 'rgb(0,41,132)',
      //inactiveBackgroundColor: 'rgb(0,41,132)',
      safeAreaInset: { bottom: "never", top: "never" },
      style: {
        height: Platform.OS === "ios" ? totalSize(8) : totalSize(5),
        paddingBottom: Platform.OS === "ios" ? totalSize(2) : null,
        paddingTop: Platform.OS === "ios" ? totalSize(0.5) : null
      }
    }
  }
);

export default createAppContainer(tabNavigator);
