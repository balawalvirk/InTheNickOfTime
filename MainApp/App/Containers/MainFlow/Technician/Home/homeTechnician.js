import React, { Component } from "react";
import {
  Platform,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Picker
} from "react-native";
import images from "../../../../Themes/Images";
import colors from "../../../../Themes/Colors";
import { Icon } from "react-native-elements";
import Toast from "react-native-simple-toast";
import Loader from "../../../../Components/Loader";
import { height, width, totalSize } from "react-native-dimension";
import { withNavigationFocus } from "react-navigation";
import firebase from "firebase";
import firestore from 'firebase/firestore';
import AsyncStorage from "@react-native-community/async-storage";
import { saveData } from "../../../../backend/firebase/utility";
class HomeTechnician extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      finishedTokens: 0,
      pendingTokens: 0,
      onProcessTokens: 0,
      loading_refresh: false,
      photo: null,
      name: "",
      user: ""
    };
  }

  checkImage(image) {
    let img = null;
    if (image != null) {
      img = { uri: image };
    } else {
      img = images.profilePic;
    }
    this.setState({
      photo: img
    });
  }

  loadUser = async () => {
    await AsyncStorage.getItem("user", (error, data) => {
      if (data) {
        console.log("Data",data)
        user = JSON.parse(data);
        console.log("Data",user)
        this.checkImage(user.data.photo);
        this.GetRatting(user.data);
        this.setState({
          name: user.data.name,
          email: user.data.email
        });
      }
    });
  };
  async GetRatting(element) {
    // if (element.isApproved !== undefined && element.isActive !== undefined) {

    //     if (element.isApproved && element.isActive) {
    let TempList2 = [];
    let isRated = false;
    let totalrating = 0;
    let RList2 = await firebase
      .firestore()
      .collection("Ratting")
      .where("technicianId", "==", element.UserId)
      .get();

    // alert(element.UserId);

    let TechnicianList = await firebase
      .firestore()
      .collection("Technician")
      .where("UserId", "==", element.UserId)
      .get();
    TechnicianList.forEach(element3 => {
      // if (element2.technicianId === element.UserId) {
      // alert(element3.data().weekly_availability);
      if (element3.data().weekly_availability !== undefined) {
        element.weekly_availability = element3.data().weekly_availability;
        day = new Date();
        day = day.getDay();
        if (
          element.weekly_availability[day].isAvailable !== undefined &&
          element.weekly_availability[day].isAvailable
        ) {
          element.daily_availability =
            element.weekly_availability[day].time_from +
            " - " +
            element.weekly_availability[day].time_to;
        }

        // alert(element.weekly_availability[0].isAvailable);
      }

      // }
    });
    RList2.forEach(element2 => {
      // if (element2.technicianId === element.UserId) {
      isRated = true;
      TempList2.push(element2.data());
      totalrating += element2.data().rating;
      // }
    });
    if (isRated) {
      element.rating = totalrating / TempList2.length;
    } else {
      element.rating = 0;
    }
    this.setState({ user: element });

    let fcmToken = await AsyncStorage.getItem("fcmToken");
    // alert("before fcmToken: "+ fcmToken);
    let jsonObject = {
      Token: fcmToken
    };
    //  alert("Save Token");
    await saveData("Technician", element.id, jsonObject);

    //     }
    // }
  }
  async componentDidMount() {
    this.props.navigation.addListener("didFocus", async () => {
      // if (this.state.name == null || this.state.name == "") {
        this.loader.show();
        await this.loadUser();
        this.loader.hide();
      // }
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.Container}>
        <Loader ref={r => (this.loader = r)} />
        <View
          style={{
            width: width(90),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "transparent",
            marginVertical: height(2)
          }}
        >
          <Icon
            name="bell"
            color={colors.SPA_redColor}
            type="octicon"
            size={totalSize(4)}
            onPress={() =>
              this.props.navigation.navigate("notificationTechnician", {
                notif: this.state.user.notification
              })
            }
          />
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.branchNameContainer}>
            <Text style={styles.branchName}>{this.state.name}</Text>
          </View>
          <View style={styles.activityContainer}>
            <Text style={styles.activity}>DASHBOARD</Text>
          </View>
          <View style={styles.tokensContainer}>
            <View style={styles.sqareView}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 10,
                  marginVertical: 10,
                  flexWrap: "wrap",
                  flex: 1
                }}
              >
                {this.state.user.daily_availability !== undefined ? (
                  <Text
                    style={{
                      fontSize: totalSize(1.6),
                      color: colors.SPA_graycolor
                    }}
                  >
                    {this.state.user.daily_availability}
                  </Text>
                ) : null}
              </View>

              <Text style={styles.txt}>TODAY</Text>
              <Text style={styles.txt}>AVAILABILITY</Text>
            </View>
            <View style={styles.sqareView}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 10,
                  marginVertical: 10,
                  flexWrap: "wrap",
                  flex: 1
                }}
              >
                {this.state.user.weekly_availability !== undefined
                  ? this.state.user.weekly_availability.map((item, key) => {
                      return (
                        <View key={key} style={{ flexDirection: "column" }}>
                          {item.isAvailable ? (
                            <Text
                              style={{
                                fontSize: totalSize(1.6),
                                color: colors.SPA_graycolor
                              }}
                            >
                              {item.val},
                            </Text>
                          ) : null}
                        </View>
                      );
                    })
                  : null}
              </View>
              <Text style={styles.txt}>WEEKLY</Text>
              <Text style={styles.txt}>AVAILABILITY</Text>
            </View>
            <View style={styles.sqareView}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 10,
                  marginVertical: 10,
                  flexWrap: "wrap",
                  flex: 1
                }}
              >
                <Icon
                  name="star"
                  size={totalSize(2)}
                  color={colors.SPA_redColor}
                  type="antdesign"
                />
                <Text style={[styles.count, { marginLeft: 10 }]}>
                  {this.state.user.rating}
                </Text>
              </View>

              <Text style={styles.txt}>RATING</Text>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("portfolio")}
              style={styles.btnRed}
            >
              <Text style={styles.btnTxt}>My Portfolio</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("myServices")}
              style={styles.btnRed}
            >
              <Text style={styles.btnTxt}>My Services</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('mySuperServices')} style={styles.btnRed}>
                            <Text style={styles.btnTxt}>My Sub Services</Text>
                        </TouchableOpacity> */}
          </View>
        </View>

        <View style={styles.shopImageContainer}>
          <Image source={this.state.photo} style={styles.shopImage} />
        </View>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(HomeTechnician);

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.SPA_LightRed,
    alignItems: "center"
    //opacity:0.5
  },
  searchInputContainer: {
    width: width(80),
    height: height(6),
    backgroundColor: "white",
    elevation: 10,
    borderRadius: 5,
    alignItems: "center",
    // justifyContent: 'center',
    flexDirection: "row",
    //marginTop: height(2)
    shadowColor: "gray",
    shadowOpacity: 0.3
  },
  searchInput: {
    width: width(75)
  },
  btnRefresh: {
    height: height(6),
    width: width(10),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 5,
    shadowColor: "gray",
    shadowOpacity: 0.3
  },
  titelContainer: {
    marginTop: height(3),
    alignItems: "center"
  },
  titelTxt: {
    fontSize: totalSize(3),
    fontWeight: "500",
    color: "rgb(0,41,132)"
  },
  shopImageContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    marginTop: height(5)
  },
  shopImage: {
    width: totalSize(25),
    height: totalSize(25),
    borderRadius: 200,
    borderWidth: 3,
    borderColor: "rgb(40,46,58)"
  },
  lowerContainer: {
    width: width(90),
    height: height(60),
    marginTop: height(15),
    borderRadius: 5,
    backgroundColor: "white"
    //elevation:5
  },
  branchNameContainer: {
    height: height(15),
    alignItems: "center",
    justifyContent: "flex-end"
  },
  branchName: {
    fontSize: totalSize(3),
    fontWeight: "bold",
    color: "rgb(40,46,58)"
  },
  activityContainer: {
    height: height(6),
    width: width(90),
    backgroundColor: "rgb(40,46,58)",
    alignItems: "center",
    justifyContent: "center"
  },
  activity: {
    color: "white",
    fontSize: totalSize(2),
    fontWeight: "300"
  },
  tokensContainer: {
    flexDirection: "row",
    height: height(20),
    alignItems: "center",
    justifyContent: "center"
  },
  sqareView: {
    height: height(15),
    width: width(25),
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "gray",
    shadowOpacity: 0.3,
    marginRight: width(1),
    borderBottomWidth: 4,
    borderColor: "rgb(40,46,58)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  tokenTxt: {
    height: height(5),
    width: width(20),
    alignItems: "center",
    justifyContent: "center"
  },
  count: {
    // color: 'rgb(0,41,132)',
    alignItems: "center",
    textAlignVertical: "center",
    color: colors.SPA_graycolor,
    fontSize: totalSize(2),
    marginBottom: height(0.3),
    justifyContent: "center"
  },
  txt: {
    color: "rgb(218,21,30)",
    fontSize: totalSize(1.5)
  },
  buttonsContainer: {
    flexDirection: "row",
    height: height(6),
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexWrap: "wrap"
  },
  btnRed: {
    shadowColor: "gray",
    shadowOpacity: 0.3,
    width: width(40),
    height: height(6),
    backgroundColor: "rgb(218,21,30)",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    borderRadius: 3,
    marginRight: width(2),
    marginBottom: 15
  },
  btnBlue: {
    shadowColor: "gray",
    shadowOpacity: 0.3,
    width: width(40),
    height: height(5),
    backgroundColor: "rgb(0,41,132)",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    borderRadius: 3
  },
  btnTxt: {
    color: "white",
    fontSize: totalSize(2),
    fontWeight: "300"
  }
});
