import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Picker,
  ImageBackground
} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import images from "../../../../../Themes/Images";
import { totalSize, height, width } from "react-native-dimension";
import { Icon } from "react-native-elements";
import StarRating from "react-native-star-rating";
import colors from "../../../../../Themes/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
//import DateTimePicker from "react-native-modal-datetime-picker"
import DateTimePicker from "react-native-datepicker";
// import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "../../../../Styles/technicianDetailStyles";
import SimpleToast from "react-native-simple-toast";
import { isGenericTypeAnnotation } from "@babel/types";
import firebase from "firebase";
import moment from "moment";
import { getAllOfCollection } from "../../../../../backend/firebase/utility";
import ModalSelector from "react-native-modal-selector";
export default class TechnicianServices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Services_list: this.props.navigation.getParam("services_details", ""),
      // [
      //     { id: 1, service_name: 'Hand massage', service_code: '025012', service_duration: '30', service_price: 50, description: 'we will provide you the full tension free service...we will provide you the full tension free service..we will provide you the full tension free service' },
      //     { id: 2, service_name: 'Face Cleaning', service_code: '025012', service_duration: '30', service_price: 50, description: 'we will provide you the full tension free service' },
      //     { id: 3, service_name: 'Hair Diy', service_code: '025012', service_duration: '30', service_price: 50, description: 'we will provide you the full tension free service..we will provide you the full tension free service' },
      //     { id: 4, service_name: 'Hand massage', service_code: '025012', service_duration: '30', service_price: 50, description: 'we will provide you the full tension free service.we will provide you the full tension free service.we will provide you the full tension free service' },
      //     { id: 5, service_name: 'Face Cleaning', service_code: '025012', service_duration: '30', service_price: 50, description: 'we will provide you the full tension free service' },
      //     { id: 6, service_name: 'Hair Diy', service_code: '025012', service_duration: '30', service_price: 50, description: 'we will provide you the full tension free service' },
      // ],
      location: null,
      travel_locations: [],
      // [
      //     { id: 1, location: 'Sea site, New york, USA', travel_cost: 20 },
      //     { id: 2, location: 'Top Valley, New york, USA', travel_cost: 25 },
      //     { id: 3, location: 'Down Town, New york, USA', travel_cost: 45 },
      //     { id: 4, location: 'Sea site, New york, USA', travel_cost: 30 }
      // ],

      technician: this.props.navigation.getParam("technician", ""),
      travel_cost: 0,
      showServicesList: false,
      loadingSelectedService: false,
      selected_Services: [],
      loadingUnSelectedServices: false,
      servicesTotalCost: 0,
      totalCost: 0.0,
      date_time: "03-23-2020",
      isDateChange: false,
      isTimeChange: false,
      time_time: "11:38 am",
      isDateTimePickerVisible: false,
      isModalVisibleMessage: false,
      comment: null,
      address: null,
      day_from: null,
      day_to: null,
      time_from: null,
      time_to: null
    };
  }

  getDayNumber(txt) {
    if (txt == "Sun") {
      return 0;
    } else if (txt == "Mon") {
      return 1;
    } else if (txt == "Tue") {
      return 2;
    } else if (txt == "Wed") {
      return 3;
    } else if (txt == "Thu") {
      return 4;
    } else if (txt == "Fri") {
      return 5;
    } else if (txt == "Sat") {
      return 6;
    }
  }
  goToPayment = () => {
    console.log(
      this.state.servicesTotalCost,
      " -- ",
      this.state.travel_locations[this.state.LocationIndex].Name,
      " -- ",
      this.state.date_time
    );

    this._toggelModalMessage();
    this.props.navigation.navigate("cardData", {
      services: this.state.selected_Services,
      location: this.state.travel_locations[this.state.LocationIndex].Name,
      travel_cost: this.state.travel_cost,
      date_time: this.state.date_time,
      time_time: this.state.time_time,
      services_cost: this.state.servicesTotalCost,
      technician: this.state.technician,
      comments: this.state.comment,
      address: this.state.address
    });
  };
  _toggleShowServicesList = () => {
    this.setState({ showServicesList: !this.state.showServicesList });
  };

  async componentDidMount() {
    this.props.navigation.addListener("didFocus", async () => {
      await this.loadServices();
    });
  }

  async loadServices() {
    let ServicesList = [];
    let SList = await getAllOfCollection("Category");

    SList.forEach(element => {
      if (element.SubList !== undefined) {
        ServicesList.push(element);
      }
    });

    let ServicesList2 = [];
    let SList2 = await getAllOfCollection("Location");

    SList2.forEach(element => {
      if (element.SubList !== undefined) {
        ServicesList2.push(element);
      }
    });

    this.setState({
      Categories_list: ServicesList,
      Location_List: ServicesList2
    });
    await this.getList();
  }

  async getList() {
    let List = [];
    let List2 = [];
    let NewList = [];
    let TechnicianList = await firebase
      .firestore()
      .collection("Technician")
      .where("UserId", "==", this.state.technician.UserId)
      .get();
    TechnicianList.forEach(async element3 => {
      if (element3.data().weekly_availability !== undefined) {
        this.state.technician.weekly_availability = element3.data().weekly_availability;
      }

      if (
        element3.data().servicesList !== undefined &&
        element3.data().servicesList.length > 0
      ) {
        element3.data().servicesList.forEach(element => {
          // if (element.ServiceId === this.props.navigation.getParam('ServiceId', "Nothing")) {
          List.push(element);
          // }
        });
      }
      if (
        element3.data().Subservices !== undefined &&
        element3.data().Subservices.length > 0
      ) {
        element3.data().Subservices.forEach(element => {
          // if (element.ServiceId === this.props.navigation.getParam('ServiceId', "Nothing")) {
          List.push(element);
          // }
        });
      }

      if (List.length > 0) {
        List.forEach(service => {
          let CategoryList = this.state.Categories_list;
          for (let i = 0; i < CategoryList.length; i++) {
            for (let m = 0; m < CategoryList[i].SubList.length; m++) {
              if (CategoryList[i].SubList[m].id === service.SubServiceId) {
                service.Name = CategoryList[i].SubList[m].Name;
                NewList.push(service);
              }
            }
          }
        });
      }
      Location_ListNew=[];
      let indexcounter=0;
      let OldList= element3.data().locationList;
      OldList.forEach(item => {
        item.index=indexcounter;
        Location_ListNew.push(item);
      });
      await this.setState({ travel_locations: Location_ListNew });

      // if (element3.data().locationList !== undefined && element3.data().locationList.length > 0) {
      //     element3.data().locationList.forEach(element => {
      //         let CategoryList = this.state.Location_List;
      //         for (let i = 0; i < CategoryList.length; i++) {
      //             for (let m = 0; m < CategoryList[i].SubList.length; m++) {
      //                 if (CategoryList[i].SubList[m].id === element.id) {
      //                     element.Name = CategoryList[i].SubList[m].Name;
      //                     // NewList.push(service);
      //                     List2.push(element);
      //                 }
      //             }
      //         }

      //     });

      // }
    });
    console.log(List2);
    // this.setState({Services_list: List, travel_locations:element3.data().locationList })
    await this.setState({ Services_list: NewList });
  }

  _toggelModalMessage = async () => {
    if (
      this.state.technician.weekly_availability !== undefined &&
      this.state.technician.weekly_availability.length > 0
    ) {
      tmp = this.state.technician.weekly_availability;
      // tmp1 = tmp2 = tmp
      // tmp1 = tmp1.slice(0, 3)
      // tmp2 = tmp2.slice(4)

      // alert(this.state.date_time + " : ");
      // let day = new Date(this.state.date_time)
      let day = new Date(moment(this.state.date_time, "MM-DD-YYYY"));
      let day2 = day.getDay();
      // console.log(day, "-", this.getDayNumber(tmp1), "-", this.getDayNumber(tmp2));
      // console.log(this.getDayNumber(tmp1) <= this.state.date_time);
      // console.log(this.state.date_time <= this.getDayNumber(tmp2));

      if (tmp !== undefined && tmp[day2].isAvailable) {
        // alert(this.state.date_time);
        final = new Date(this.state.date_time).toDateString();
        // time = timefinal.getHours()
        // console.log(tmp.time_from, '==', tmp.time_to, '==', time);
        if (
          tmp[day2].time_from !== "" &&
          tmp[day2].time_to !== "" &&
          this.state.time_time !== ""
        ) {
          // alert(tmp[day2].time_from+ " : " + this.state.time_time + " : " + tmp[day2].time_to);

          // moment(final+ " "+time, "YYYY-MM-DD hh:mm a").format("YYYY-MM-DDTHH:mm:ss")

          var BookingTime = moment(this.state.time_time, "HH:mm a"); // e.g. 11:00 pm
          var TimeFrom = moment(tmp[day2].time_from, "HH:mm a");
          var TimeTo = moment(tmp[day2].time_to, "HH:mm a");
          // TimeFrom= new Date('2019-01-01T' + tmp[day2].time_from + 'Z').toDateString();
          // BookingTime= new Date('2019-01-01T' + this.state.time_time + 'Z');
          // TimeTo= new Date('2019-01-01T' + tmp[day2].time_to + 'Z');

          //  alert(TimeFrom + " : " + BookingTime + " : " + TimeTo);
          if (TimeFrom <= BookingTime && BookingTime <= TimeTo) {
            console.log("IF");
          } else {
            alert(
              "The technician is not available at the selected time. Please have a look at their availability."
            );
            return;
          }
        } else {
          alert(
            "The technician is not available at the selected time. Please have a look at their availability."
          );
          return;
        }
      } else {
        alert(
          "The technician is not available at the selected time. Please have a look at their availability."
        );
        return;
      }
    } else {
      alert(
        "The technician is not available at the selected time. Please have a look at their availability."
      );
      return;
    }

    this.state.day_from = this.state;
    this.setState({ isModalVisibleMessage: !this.state.isModalVisibleMessage });
  };
  selectService = async id => {
    this.setState({ loadingSelectedService: true });
    for (let i = 0; i < this.state.Services_list.length; i++) {
      if (id === this.state.Services_list[i].id) {
        //await this.setState({ memberID: this.state.members[i].user_id })
        await this.state.selected_Services.push(this.state.Services_list[i]);
        await this.setState({
          servicesTotalCost:
            parseInt(this.state.servicesTotalCost) +
            parseInt(this.state.Services_list[i].Cost)
        });
        //await this.state.selected_members_IDs.push(this.state.members[i].user_id)
      }
    }
    console.warn("selected Services==>", this.state.selected_Services);
    //.warn('selected Members ID==>', this.state.selected_members_IDs)
    await this.setState({ loadingSelectedService: false });
    this._toggleShowServicesList();
  };

  UnselectService = async itemIndex => {
    this.setState({ loadingUnSelectedServices: true });
    await this.setState({
      servicesTotalCost:
        this.state.servicesTotalCost -
        this.state.selected_Services[itemIndex].Cost
    });
    await this.state.selected_Services.splice(itemIndex, 1);
    await this.setState({ loadingUnSelectedServices: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.lowerContainer}>
            <View style={{ flex: 1, width: width(95), alignItems: "center" }}>
              <View style={[styles.txtContainer]}>
                <Text style={[styles.txtLarg, { fontSize: totalSize(2) }]}>
                  Select Services
                </Text>
              </View>
              <View style={styles.schoolInputContainer}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={() => this._toggleShowServicesList()}
                >
                  <Text
                    style={[
                      styles.txtLarg,
                      {
                        color: "rgb(217,217,217)",
                        fontWeight: "normal",
                        fontSize: totalSize(3)
                      }
                    ]}
                  >
                    Select Service
                  </Text>
                  <View style={{ marginHorizontal: width(12) }}></View>
                  <Icon
                    name="md-arrow-dropdown"
                    color={colors.SPA_graycolor}
                    size={totalSize(3)}
                    type="ionicon"
                  />
                </TouchableOpacity>
              </View>
              {this.state.showServicesList ? (
                <View
                  style={{
                    width: width(90),
                    backgroundColor: "white",
                    elevation: 5
                  }}
                >
                  <ScrollView>
                    {this.state.Services_list.map((item, key) => {
                      return (
                        <TouchableOpacity
                          key={key}
                          style={{
                            marginHorizontal: 5,
                            borderBottomWidth: 0.4,
                            borderColor: "gray",
                            elevation: 0
                          }}
                          onPress={() => {
                            this.selectService(item.id);
                          }}
                        >
                          <View
                            style={{
                              marginVertical: 10,
                              alignItems: "flex-start",
                              justifyContent: "center"
                            }}
                          >
                            <Text
                              style={{
                                fontSize: totalSize(2),
                                color: "black",
                                marginVertical: 3,
                                fontWeight: "bold"
                              }}
                            >
                              {item.Name}
                            </Text>
                            <Text
                              style={{
                                fontSize: totalSize(1.5),
                                color: "gray"
                              }}
                            >
                              Price: ${item.Cost}
                            </Text>
                            <Text
                              style={{
                                fontSize: totalSize(1.5),
                                color: "gray"
                              }}
                            >
                              Duration: {item.Duration} min
                            </Text>
                            <Text
                              style={{
                                fontSize: totalSize(1.5),
                                color: "gray"
                              }}
                            >
                              Description: {item.Descraption}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              ) : null}
              {/* <View style={[styles.txtContainer, { alignItems: 'flex-start' }]}>
                                        <Text style={[styles.txtLarg, { fontSize: totalSize(2) }]}>Selected Servies</Text>
                                         <View style={{ borderColor: colors.SPA_redColor, borderWidth: 0.5, borderRadius: 5 }}>
                                            <Text style={[styles.welcome, { fontSize: totalSize(3), fontWeight: 'normal', marginVertical: 5, marginHorizontal: 5 }]}>175</Text>
                                        </View> 
                                    </View> */}
              {this.state.selected_Services.length !== 0 ? (
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {this.state.selected_Services.map((item, key) => {
                    return (
                      <View
                        key={key}
                        style={{
                          borderRadius: 25,
                          marginHorizontal: width(1),
                          marginVertical: height(1),
                          backgroundColor: colors.SPA_redColor,
                          elevation: 3,
                          shadowOpacity: 2,
                          shadowColor: "gray"
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <View
                            style={{
                              marginHorizontal: width(4),
                              marginVertical: height(1),
                              alignItems: "flex-start",
                              justifyContent: "center",
                              backgroundColor: "transparent"
                            }}
                          >
                            <Text
                              style={{
                                fontSize: totalSize(1.5),
                                color: "white"
                              }}
                            >
                              {item.Name}
                            </Text>
                            <Text
                              style={{
                                fontSize: totalSize(1.5),
                                color: "white"
                              }}
                            >
                              Price: ${item.Cost}
                            </Text>
                          </View>
                          <Icon
                            name="ios-close-circle"
                            size={totalSize(4)}
                            type="ionicon"
                            color="white"
                            onPress={() => this.UnselectService(key)}
                          />
                          <View style={{ width: 5 }}></View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : (
                  <Text>No Service Selected yet</Text>
                )}
              <View>
                <View style={[styles.txtContainer, {}]}>
                  <Text style={[styles.txtLarg, { fontSize: totalSize(2) , marginBottom: 10}]}>
                    Select Location
                  </Text>
                </View>
                <View style={styles.schoolInputContainer}>

                  {this.state.travel_locations.length > 0 ? (
                    // <Picker
                    //   mode="dropdown"
                    //   selectedValue={this.state.showValue}
                    //   style={[styles.PickerStyle, ]}
                    //   onValueChange={(itemValue, itemIndex) => {
                    //     kk = parseInt(itemValue);
                    //     this.setState({
                    //       travel_cost: kk,
                    //       showValue: itemValue,
                    //       LocationIndex: itemIndex
                    //     });
                    //   }}
                    // >
                    //   <Picker.Item label="Select Location" value="" />
                    //   {this.state.travel_locations.map((item, key) => {
                    //     return (
                    //       <Picker.Item
                    //         key={key}
                    //         label={item.Name}
                    //         value={item.Cost}
                    //       />
                    //     );
                    //   })}
                    // </Picker>
                    <ModalSelector
                        data={
                          this.state.travel_locations
                        }
                        initValue="Select Location"
                        // supportedOrientations={['landscape']}
                        accessible={true}
                        keyExtractor={(item) => item.id}
                        labelExtractor={(item) => item.Name}
                        scrollViewAccessibilityLabel={"Scrollable options"}
                        cancelButtonAccessibilityLabel={"Cancel Button"}
                        onChange={(itemValue) => {
                          // alert(itemValue.Name)
                          kk = parseInt(itemValue.Cost);
                        this.setState({
                          travel_cost: kk,
                          showValue: itemValue.Cost,
                          LocationIndex: itemValue.index,
                          LocationName: itemValue.Name,
                        });
                          // this.setState({
                          //   NewSCid: itemValue.id,
                          //   NewSCName: itemValue.Name,
                          // });
                        }}
                      >
                        <TextInput
                        blurOnSubmit={true}
                          style={styles.popUpInput}
                          editable={false}
                          placeholderTextColor="rgb(217,217,217)"
                          placeholderTextColor={"gray"}
                          placeholder="Select Location"
                          value={this.state.LocationName}
                        />
                      </ModalSelector>
                    // <View style={{ width: '60%', marginRight: 5, flex: 1 }}>
                    //   <RNPickerSelect
                    //     placeholder={{
                    //       label: 'Select Location',
                    //       value: "",
                    //       color: 'red',
                    //     }}
                    //     items={this.state.travel_locations.map((item, key) => {
                    //       return (
                    //         <Picker.Item
                    //           key={key}
                    //           label={item.Name}
                    //           value={item.Cost}
                    //         />
                    //       );
                    //     })}
                    //     style={{
                    //       ...pickerSelectStyles,
                    //       iconContainer: {
                    //         top: 1,
                    //         right: 7,
                    //       },
                    //       placeholder: {
                    //         color: 'gray',
                    //         fontSize: 12,
                    //         fontWeight: 'bold',
                    //       },
                    //     }}
                    //     onValueChange={(itemValue, itemIndex) => {
                    //       kk = parseInt(itemValue);
                    //       this.setState({
                    //         travel_cost: kk,
                    //         showValue: itemValue,
                    //         LocationIndex: itemIndex
                    //       });
                    //     }}

                    //     value={this.state.pickerValue}
                    //     useNativeAndroidPickerStyle={false}
                    //     textInputProps={{ underlineColor: 'yellow' }}
                    //     Icon={() => {
                    //       return <Icon name="caret-down" type="font-awesome" size={23} />;
                    //     }}
                    //   />
                    // </View>
                  ) : null}
                </View>
                <View style={[styles.txtContainer, { marginTop: 10 }]}>
                  <Text style={[styles.txtLarg, { fontSize: totalSize(2) }]}>
                    Enter Address
                  </Text>
                </View>
                <View style={[styles.schoolInputContainer, { height: height(12) }]}>
                  <TextInput
                    style={styles.TxtInput}
                    onChangeText={text => this.setState({ address: text })}
                    placeholder={"Enter Full Address"}
                    placeholderTextColor="rgb(217,217,217)"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    blurOnSubmit={true}
                  // style={styles.TxtInput}
                  />
                </View>
                <View style={[styles.txtContainer, {}]}>
                  <Text style={[styles.txtLarg, { fontSize: totalSize(2) }]}>
                    Select Date
                  </Text>
                </View>
                <View style={styles.schoolInputContainer}>
                  <DateTimePicker
                    // style={{width:'100%'}}
                    style={{ width: width(75) }}
                    date={this.state.date_time}
                    mode="date"
                    // is24Hour={false}
                    placeholder="Select Date"
                    showIcon={false}
                    display="default"
                    androidMode="spinner"
                    placeholderTextColor={"rgb(217,217,217)"}
                    //   format="MM-DD-YYYY h:mm a"
                    format="MM-DD-YYYY"
                    //minDate="2018-05-01"
                    //maxDate="2020-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={date => {
                      this.setState({ date_time: date, isDateChange: true });
                    }}
                  />
                  <View style={{ marginHorizontal: 10 }}>
                    <Icon
                      name="calendar-clock"
                      color="gray"
                      size={totalSize(3)}
                      type="material-community"
                    />
                  </View>
                </View>
                <View style={[styles.txtContainer, {}]}>
                  <Text style={[styles.txtLarg, { fontSize: totalSize(2) }]}>
                    Select Time
                  </Text>
                </View>
                <View style={styles.schoolInputContainer}>
                  <DateTimePicker
                    style={{ width: width(75) }}
                    date={this.state.time_time}
                    mode="time"
                    // is24Hour={false}
                    placeholder="Select Time"
                    showIcon={false}
                    androidMode="spinner"
                    placeholderTextColor={"rgb(217,217,217)"}
                    format="h:mm a"
                    // format=""
                    //minDate="2018-05-01"
                    //maxDate="2020-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={time => {
                      this.setState({ time_time: time, isTimeChange: true });
                    }}
                  />
                  <View style={{ marginHorizontal: 10 }}>
                    <Icon
                      name="calendar-clock"
                      color="gray"
                      size={totalSize(3)}
                      type="material-community"
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "transparent",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              >
                <Text
                  style={[
                    styles.welcome,
                    { fontSize: totalSize(2), fontWeight: "normal" }
                  ]}
                >
                  Technician Availability:{" "}
                </Text>
                {this.state.technician.weekly_availability != "" &&
                  this.state.technician.weekly_availability != null &&
                  typeof this.state.technician.weekly_availability != "string" ? (
                    this.state.technician.weekly_availability.map(i => {
                      return (
                        <View style={{ width: width(90), flexDirection: "row" }}>
                          <Text
                            style={[
                              styles.welcome,
                              {
                                fontSize: totalSize(2),
                                fontWeight: "normal",
                                marginVertical: 5,
                                marginHorizontal: 5
                              }
                            ]}
                          >
                            {i.item}
                          </Text>
                          <View
                            style={{
                              flex: 1,
                              alignItems: "flex-end",
                              justifyContent: "center"
                            }}
                          >
                            <Text style={{ textAlign: "left" }}>
                              {i.time_from} - {i.time_to}
                            </Text>
                          </View>
                        </View>
                      );
                    })
                  ) : (
                    <Text></Text>
                  )}
              </View>
              <View
                style={[
                  styles.txtContainer,
                  {
                    flexDirection: "row",
                    backgroundColor: "transparent",
                    justifyContent: "flex-start",
                    alignItems: "center"
                  }
                ]}
              >
                <Text
                  style={[
                    styles.welcome,
                    { fontSize: totalSize(2), fontWeight: "normal" }
                  ]}
                >
                  Travel Fee:{" "}
                </Text>
                <Text
                  style={[
                    styles.welcome,
                    {
                      fontSize: totalSize(2),
                      fontWeight: "normal",
                      marginVertical: 5,
                      marginHorizontal: 5
                    }
                  ]}
                >
                  ${!isNaN(this.state.travel_cost) ? this.state.travel_cost : 0}
                </Text>
              </View>
              <View
                style={[
                  styles.txtContainer,
                  {
                    flexDirection: "row",
                    backgroundColor: "transparent",
                    justifyContent: "flex-start",
                    alignItems: "center"
                  }
                ]}
              >
                <Text
                  style={[
                    styles.welcome,
                    {
                      fontSize: totalSize(3),
                      fontWeight: "normal",
                      color: colors.SPA_graycolor
                    }
                  ]}
                >
                  Total:{" "}
                </Text>
                <View
                  style={{
                    borderColor: colors.SPA_redColor,
                    borderWidth: 1,
                    borderRadius: 5
                  }}
                >
                  <Text
                    style={[
                      styles.welcome,
                      {
                        fontSize: totalSize(3),
                        fontWeight: "normal",
                        marginVertical: 5,
                        marginHorizontal: 5
                      }
                    ]}
                  >
                    $
                    {(!isNaN(this.state.servicesTotalCost)
                      ? this.state.servicesTotalCost
                      : 0) +
                      (!isNaN(this.state.travel_cost)
                        ? this.state.travel_cost
                        : 0)}
                  </Text>
                </View>
              </View>

              <View style={styles.btnContainer}>
                <TouchableOpacity
                  onPress={() => {
                    console.log(this.state.locations);

                    if (
                      this.state.servicesTotalCost == 0 ||
                      isNaN(this.state.travel_cost) ||
                      this.state.date_time == null ||
                      this.state.address == null ||
                      this.state.time_time == null
                    ) {
                      SimpleToast.show(
                        "Some fields are empty",
                        SimpleToast.SHORT
                      );
                      console.log("in if");

                      return;
                    }
                    if (!this.state.isDateChange) {
                      SimpleToast.show("Select Date First", SimpleToast.SHORT);
                      console.log("in if");

                      return;
                    }
                    if (!this.state.isTimeChange) {
                      SimpleToast.show("Select Time First", SimpleToast.SHORT);
                      console.log("in if");

                      return;
                    }
                    console.log("all ok");
                    this._toggelModalMessage();
                  }}
                  style={[
                    styles.schoolInputContainer,
                    {
                      backgroundColor: colors.SPA_redColor,
                      marginVertical: height(5)
                    }
                  ]}
                >
                  <View style={styles.btnTxtContainer}>
                    {this.state.loading_getProfessors_by_departmet === true ? (
                      <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.btnTxt}>Next</Text>
                      )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <Modal
          isVisible={this.state.isModalVisibleMessage}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropColor="black"
          animationInTiming={500}
          animationOutTiming={500}
          backdropOpacity={0.5}
          onBackdropPress={this._toggelModalMessage}
        >
          <KeyboardAvoidingView
            behavior="position"
            enabled
          >
            {/* <View style={styles.modalHeader}>
                            <Text style={[styles.txtLarg, { fontSize: totalSize(2), color: 'white' }]}>Rate a Technician</Text>
                        </View> */}

            <View style={[styles.modalBody, { borderRadius: 5 }]}>
              <View
                style={[
                  styles.txtContainer,
                  {
                    backgroundColor: "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: height(5)
                  }
                ]}
              >
                <Text style={[styles.txtLarg, { fontSize: totalSize(1.8) }]}>
                  Is there is anything else your technician should know?
                </Text>
                <Text style={[styles.txtLarg, { fontSize: totalSize(1.8) }]}>

                </Text>
                <Text
                  style={[
                    styles.txtLarg,
                    {
                      fontSize: totalSize(1.8),
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "justify", marginHorizontal: 20
                    }
                  ]}
                >
                  There are no refunds for services that are unable to be provided due to lack of disclosure from client.
                </Text>
              </View>
              <View
                style={[
                  styles.txtContainer,
                  {
                    backgroundColor: "transparent",
                    alignItems: "center",
                    justifyContent: "center"
                  }
                ]}
              >
                <Text
                  style={[
                    styles.txtSmall,
                    { fontSize: totalSize(1.5), color: "gray", textAlign: "justify", marginHorizontal: 20 }
                  ]}
                >
                  Please list ALL information that we not be able to ascertain because we are coming to your location sight unseen.
                </Text>

              </View>
              <View
                style={[
                  styles.txtContainer,
                  {
                    backgroundColor: "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: 10,
                    marginVertical: 10
                  }
                ]}
              >
                <Text
                  style={[
                    styles.txtSmall,
                    {
                      fontSize: totalSize(1.5),
                      color: "gray",
                      flexWrap: "wrap",
                      width: "90%",
                      textAlign: "justify", marginHorizontal: 20
                    }
                  ]}
                >
                  If you are requesting nail service, do you have anything on
                  your nails currently, do you have diabetes, mobility
                  difficulty. If you are requesting a chemical hair process,
                  when is the last time you had a chemical treatment, what is
                  the health of your hair etc.? Do you have stairs, pets,
                  parking, any obstacles to entry?
                </Text>
              </View>
              <View style={styles.inputTxtContainer}>
                <Text
                  style={[
                    styles.txtSmall,
                    { marginVertical: 3, color: colors.SPA_redColor }
                  ]}
                >
                  Message
                </Text>
                <View style={[styles.commentInputView, {}]}>
                  <TextInput
                    onChangeText={value => this.setState({ comment: value })}
                    placeholder="Type Your Request"
                    multiline={true}
                    scrollEnabled={true}
                    // placeholderTextColor="rgb(245,245,238)"
                    style={[styles.commentInput, {
                      shadowOffset: { width: 2, height: 0 },
                      shadowColor: 'gray',
                      backgroundColor: "white",
                      shadowOpacity: 0.5,
                    }]}
                  />
                </View>
              </View>
              <View
                style={[styles.btnContainer, { marginVertical: height(5), marginHorizontal: height(2), width: "90%", }]}
              >
                <Text
                  style={[styles.txtLarg, { fontSize: totalSize(1.8), marginHorizontal: 0 }]}
                  onPress={() => this.goToPayment()}
                >
                  NO, THANKS
                </Text>
                <View style={{ marginHorizontal: width(15) }}></View>
                <Text
                  style={[styles.txtLarg, { fontSize: totalSize(1.8) }]}
                  onPress={() => this.goToPayment()}
                >
                  YES, SURE
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  popUpInput: {
    height: height(30),
    width: width(80),
    //borderWidth: 0.25,
    backgroundColor: "white",
    elevation: 5,
    //borderColor: 'rgb(66,67,69)',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "gray",
    shadowOpacity: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
},
  inputAndroid: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});



