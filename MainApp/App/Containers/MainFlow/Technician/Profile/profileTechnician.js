import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  CheckBox,
  ScrollView,
  Picker
} from 'react-native';
import { height, width, totalSize } from 'react-native-dimension'
import DateTimePicker from 'react-native-datepicker'
import { Icon, Button } from 'react-native-elements'
import colors from '../../../../Themes/Colors';
import images from '../../../../Themes/Images';
import Modal from 'react-native-modal'
import AsyncStorage from '@react-native-community/async-storage';
import { updateDocument } from '../../../../backend/firebase/utility';
import Toast from 'react-native-simple-toast';
import Loader from "../../../../Components/Loader"

class ProfileTechnician extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      day_from: 'N/A',
      day_to: 'N/A',
      time_from: new Date().getHours().toString(),
      time_to: new Date().getHours().toString(),
      isModalVisibleForgetPassword: false,
      isModalVisibleLocation: false,
      days: [
        { id: 1, item: 'Monday', val: 'Mon' },
        { id: 2, item: 'Tuesday', val: 'Tue' },
        { id: 3, item: 'Wednesday', val: 'Wed' },
        { id: 4, item: 'Thursday', val: 'Thu' },
        { id: 4, item: 'Friday', val: 'Fri' },
        { id: 4, item: 'Saturday', val: 'Sat' },
        { id: 4, item: 'Sunday', val: 'Sun' },
      ],
      locations: [
        { id: 1, location: 'Sea site, New york, USA', travel_cost: 20 },
        { id: 2, location: 'Top Valley, New york, USA', travel_cost: 25 },
        { id: 3, location: 'Down Town, New york, USA', travel_cost: 45 },
        { id: 4, location: 'Sea site, New york, USA', travel_cost: 30 }
      ],
      states_list: [
        { id: 1, state_name: 'MaryLand' },
        { id: 2, state_name: 'Verginia' },
        { id: 3, state_name: 'Washingtn, DC' },
      ],
      cost: 0,
      location: '',
      loc_id: null
    };
  }

  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: 'rgb(66,67,69)',
      //height:height(5)
    },
    headerTintColor: colors.appGreen,
    headerTitleStyle: {
      fontSize: totalSize(2),
      //textAlign: 'center'
    }
  }

  async updateLocationCosts() {
    if (this.state.location == '' || this.state.cost == 0) {
      return
    } else {
      loc_arr = []
      tmp = {
        id: this.state.loc_id,
        location: this.state.location,
        travel_cost: this.state.cost
      }
      console.log(this.state.user.travel_locations);
      if(this.state.user.travel_locations.length == 0){
        kk = []
        kk.push(this.state.location)
        this.state.user.travel_locations = kk
      }else{
        kk = this.state.user.travel_locations
        kk.push(this.state.location)
        this.state.user.travel_locations = kk
      }
      try {
        loc_arr = JSON.parse(this.state.user.locations_details)

      } catch (err) {
        loc_arr = []
      }
      loc_arr.push(tmp)
      loc_arr = JSON.stringify(loc_arr)
      this.state.user.locations_details = loc_arr
      this._toggleModalLocation()
      this.loader.show()
      await updateDocument('Technician', this.state.user.id, this.state.user)
      let tmpState = JSON.stringify(this.state.user)
      await AsyncStorage.setItem('user', tmpState)
      this.loader.hide()


    }

  }

  async componentDidMount() {
    this.loader.show()
    usr = await AsyncStorage.getItem('user')
    usr = JSON.parse(usr)
    this.setState({ user: usr })
    this.loader.hide()
  }

  async updateAvailability() {
    console.log(this.state.time_from, " ", this.state.time_to);
    if (this.state.day_to == null || this.state.day_to == "" || this.state.day_from == null || this.state.day_from == "") {
      Toast.show("Some Informatin is Missing")
      return
    }
    if (this.state.time_from == null || this.state.time_from == "" || this.state.time_to == null || this.state.time_to == "") {
      Toast.show("Some Informatin is Missing")
      return
    }
    if (this.state.time_to == this.state.time_from || this.state.day_from == this.state.day_to) {
      Toast.show("To and From Time and Date can't be same")
      return
    }
    daily_availability = this.state.time_from + "-" + this.state.time_to
    weekly_availability = this.state.day_from + "-" + this.state.day_to;
    this.state.user.weekly_availability = weekly_availability;
    this.state.user.daily_availability = daily_availability;
    this.setState({ isModalVisibleForgetPassword: false })


    console.log("WA", weekly_availability);
    this.loader.show()
    await updateDocument('Technician', this.state.user.id, this.state.user)
    let tmpState = JSON.stringify(this.state.user)
    await AsyncStorage.setItem('user', tmpState)
    this.loader.hide()
  }

  _toggleModalForgetPassword = () =>
    this.setState({ isModalVisibleForgetPassword: !this.state.isModalVisibleForgetPassword });

  _toggleModalLocation = () =>
    this.setState({ isModalVisibleLocation: !this.state.isModalVisibleLocation });


  render() {
    return (

      <View style={styles.container}>
        <Loader ref={r => this.loader = r} />
        <View style={styles.uperContainer}>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('editProfileTechnician')} style={{ width: totalSize(6), height: totalSize(6), backgroundColor: 'transparent', borderRadius: 100, alignItems: 'center', justifyContent: 'center', marginTop: 5, marginRight: 5 }}>
            <Icon name='pencil' color={'white'} size={totalSize(4)} type='material-community' />
          </TouchableOpacity>
        </View>
        <View style={styles.lowerContainer}>
          <TouchableOpacity style={styles.button2} onPress={() => {
            this._toggleModalForgetPassword()
          }}>
            <View style={styles.iconContainer}>
              <Icon name='calendar-clock' color='white' size={totalSize(3)} type='material-community' />
            </View>
            <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
              <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>Availability </Text>
              <Text style={[styles.instructions, { fontSize: totalSize(1.5), color: 'gray' }]}>Manage your daily/weekly availability </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Icon name='arrow-right' color='rgb(66,67,69)' size={totalSize(2)} type='simple-line-icon' />
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button2} >
            <View style={styles.iconContainer}>
              <Icon name='star' color='white' size={totalSize(3)} type='material-community' />
            </View>
            <View  style={{alignItems:'flex-start',justifyContent:'center'}}>
              <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>Rating </Text>
              <Text style={[styles.instructions, { fontSize: totalSize(1.5), color: 'gray' }]}>View your ratings & reviews</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Icon name='arrow-right' color='rgb(66,67,69)' size={totalSize(2)} type='simple-line-icon' />
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              this._toggleModalLocation()
            }} >
            <View style={styles.iconContainer}>
              <Icon name='location' color='white' size={totalSize(3)} type='entypo' />
            </View>
            <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
              <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>Travel Locations and costs</Text>
              <Text style={[styles.instructions, { fontSize: totalSize(1.5), color: 'gray' }]}>Manage your travel locations</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Icon name='arrow-right' color='rgb(66,67,69)' size={totalSize(2)} type='simple-line-icon' />
            </View>
          </TouchableOpacity>

        </View>
        <View style={styles.imageContainer}>
          <Image source={this.state.user.photo ? { uri: this.state.user.photo } : images.profilePic} style={styles.imageProfile} />
          <Text style={[styles.welcome, { fontSize: totalSize(3) }]}>{this.state.user.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='email' size={totalSize(1.5)} color='gray' />
            <Text style={[styles.welcome, { fontSize: totalSize(1.5), fontWeight: 'normal', color: 'gray', left: 2 }]}>{this.state.user.email}</Text>
          </View>
        </View>

        <Modal
          isVisible={this.state.isModalVisibleForgetPassword} // Forget Password
          animationIn='slideInUp'
          animationOut='slideOutDown'
          backdropColor='black'
          animationInTiming={700}
          animationOutTiming={700}
          backdropOpacity={0.50}>
          <View style={{ backgroundColor: 'white', height: height(80), width: width(95), alignSelf: 'center', borderRadius: 5 }}>
            <Text style={{ fontSize: totalSize(2.5), color: 'gray', flexDirection: 'row', alignSelf: 'center', margin: 15 }}>Daily Availability</Text>
            <View style={styles.schoolInputContainer} >
              <DateTimePicker
                style={{ width: width(75) }}
                //date={this.state.time_from}


                mode='time'
                placeholder={this.state.time_from}
                showIcon={false}
                androidMode='spinner'
                placeholderTextColor={'rgb(217,217,217)'}
                format="H:mm"
                //minDate="2018-05-01"
                //maxDate="2020-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => { this.setState({ time_from: date }) }}
              />
            </View>
            <View style={styles.schoolInputContainer} >
              <DateTimePicker
                style={{ width: width(75) }}
                //date={this.state.time_to}
                mode='time'
                placeholder={this.state.time_to}
                showIcon={false}
                androidMode='spinner'
                placeholderTextColor={'rgb(217,217,217)'}
                format="H:mm"
                //minDate="2018-05-01"
                //maxDate="2020-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => { this.setState({ time_to: date }) }}
              />
            </View>

            <Text style={{ fontSize: totalSize(2.5), color: 'gray', flexDirection: 'row', alignSelf: 'center', margin: 15 }}>Weekly Availability</Text>
            <View style={styles.schoolInputContainer2}>
              <Picker

                mode='dropdown'
                selectedValue={this.state.day_from}
                style={styles.PickerStyle}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ day_from: itemValue })
                }>
                <Picker.Item key={'from'} label='From' value={'from'} />
                {
                  this.state.days.map((item, key) => {
                    return (
                      <Picker.Item key={key} label={item.item} value={item.val} />
                    )
                  })

                }
              </Picker>
            </View>
            <View style={styles.schoolInputContainer2}>
              <Picker

                mode='dropdown'
                selectedValue={this.state.day_to}
                style={styles.PickerStyle}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ day_to: itemValue })
                }>
                <Picker.Item key='to' label="To" value='to' />
                {
                  this.state.days.map((item, key) => {
                    return (
                      <Picker.Item key={key} label={item.item} value={item.val} />
                    )
                  })

                }
              </Picker>
            </View>


            <Button
              containerStyle={{
                margin: 2,
                backgroundColor: colors.SPA_redColor
              }}
              title="Update"

              onPress={() => {
                this.updateAvailability()

              }} />
            <Button
              containerStyle={{
                margin: 2,
                backgroundColor: colors.SPA_redColor
              }}
              title="Close"

              onPress={() => {
                this.setState({ isModalVisibleForgetPassword: false })
              }}>Close</Button>

          </View>
        </Modal>
        <Modal
          isVisible={this.state.isModalVisibleLocation} // Forget Password
          animationIn='slideInUp'
          animationOut='slideOutDown'
          backdropColor='black'
          animationInTiming={700}
          animationOutTiming={700}
          backdropOpacity={0.50}>
          <View style={{ backgroundColor: 'white', height: height(80), width: width(95), alignSelf: 'center', borderRadius: 5 }}>

            <Text
              underlineColorAndroid='transparent'
              style={[styles.TxtInput, { borderColor: 'grey', borderWidth: 1, margin: 15 }]}
              onPress={() => {
                this.setState({ showStates: !this.state.showStates })
              }}

            >
              {this.state.location ? this.state.location : "Enter Location"}
            </Text>

            <View style={{ flexDirection: 'row', width: width(90), marginLeft: 15, marginTop: -15 }}>{
              this.state.showStates ?
                <View style={{ width: width(30), backgroundColor: 'white', elevation: 5 }}>
                  <ScrollView>{
                    this.state.states_list.map((item, key) => {
                      return (
                        <TouchableOpacity key={key} style={{ marginHorizontal: 5, borderBottomWidth: 0.4, borderColor: 'gray', elevation: 0 }}
                          onPress={() => {
                            this.setState({ showLocations: !this.state.showLocations })
                          }}
                        >
                          <View style={{ marginVertical: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Text style={{ fontSize: totalSize(2), color: 'black', marginVertical: 3, fontWeight: 'bold' }}>{item.state_name}</Text>
                            {/* <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Price: {item.service_price} $</Text>
                                      <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Duration: {item.service_duration} min</Text>
                                      <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Description: {item.description}</Text> */}
                          </View>
                        </TouchableOpacity>
                      )
                    })
                  }
                  </ScrollView>
                </View>
                :
                null
            }
              {
                this.state.showLocations ?
                  <View style={{ width: width(40), backgroundColor: 'white', elevation: 5 }}>
                    <ScrollView>
                      {
                        this.state.locations.map((item, key) => {
                          return (
                            <TouchableOpacity key={key} style={{ marginHorizontal: 5, borderBottomWidth: 0.4, borderColor: 'gray', elevation: 0 }}
                              onPress={() => {
                                this.setState({
                                  location: item.location,
                                  loc_id: item.id,
                                  showLocations: false,
                                  showStates: false
                                })
                              }}
                            >
                              <View style={{ marginVertical: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text style={{ fontSize: totalSize(2), color: 'black', marginVertical: 3, fontWeight: 'normal' }}>{item.location}</Text>
                                {/* <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Price: {item.service_price} $</Text>
                                      <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Duration: {item.service_duration} min</Text>
                                      <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Description: {item.description}</Text> */}
                              </View>
                            </TouchableOpacity>
                          )
                        })
                      }
                    </ScrollView>
                  </View>
                  :
                  null
              }
            </View>
            <TextInput
              style={[styles.TxtInput, { backgroundColor: 'white', fontSize: totalSize(2.5), color: 'gray', flexDirection: 'row', margin: 15, borderColor: 'grey', borderWidth: 1 }]}
              keyboardType='numeric'
              placeholder="Enter Cost"
              onChangeText={(text) => { this.setState({ cost: text }) }}
            >
            </TextInput>
            <Button
              containerStyle={{
                margin: 2,
                backgroundColor: colors.SPA_redColor
              }}
              title="Update"

              onPress={async () => {
                await this.updateLocationCosts()
              }}>Update</Button>
            <Button
              containerStyle={{
                margin: 2,
                backgroundColor: colors.SPA_redColor
              }}
              title="Close"

              onPress={() => {
                this._toggleModalLocation()
              }}>Close</Button>

          </View>
        </Modal>

      </View >

    );
  }
}

export default ProfileTechnician;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width: null,
    //height: null,
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: 'rgb(66,67,69)',
    //backgroundColor: 'rgb(180,210,53)',
    backgroundColor: colors.SPA_redColor


  },
  searchContainer: {
    width: width(70),
    height: height(6),
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    marginVertical: height(1),
    borderRadius: 25,
    flexDirection: 'row'
  },
  TxtInput: {
    width: width(65),
    height: height(8),
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'white',
    fontSize: totalSize(2.5),
    color: 'rgb(217,217,217)'
    //marginVertical:height(2),
    //borderRadius: 25,
  },
  uperContainer: {
    flex: 0.2,
    flexDirection: 'row',
    //width: width(100),
    //height: null,
    //justifyContent: 'center',
    justifyContent: 'flex-end',
    //backgroundColor: 'rgb(0,173,238)'
    //backgroundColor:'rgb(180,210,53)'
    //backgroundColor:'rgb(217,217,217)'
    //backgroundColor: 'red',
    //marginTop: height(2),

  },
  PickerStyle: {
    width: width(75),
    height: height(8),
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'white',
    //fontSize: totalSize(2.5),
    color: 'rgb(66,67,69)',
    //marginVertical:height(2),
    borderRadius: 25,
    borderColor: 'black',
    borderStyle: 'solid',
    margin: 5
  },
  lowerContainer: {
    flex: 1,
    //width: width(100),
    //height: null,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgb(0,173,238)'
    //backgroundColor:'rgb(180,210,53)'
    //backgroundColor:'rgb(217,217,217)'
    //backgroundColor: colors.SPA_LightRed,
    backgroundColor: 'white'
    // marginTop: height(20),

  },
  txtContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height(3)
  },
  schoolInputContainer: {
    flexDirection: 'row',
    width: width(90),
    height: height(8),
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'rgb(180,210,53)',
    //backgroundColor: 'rgb(0,173,238)',
    //backgroundColor: 'white',
    //marginBottom: height(1),
    elevation: 10,
    //borderRadius: 5
  },
  schoolInputContainer2: {
    flexDirection: 'row',
    width: width(90),
    height: height(8),
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'rgb(180,210,53)',
    //backgroundColor: 'rgb(0,173,238)',
    //backgroundColor: 'white',
    //marginBottom: height(1),
    //elevation: 10,
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: 'black'
  },
  welcome: {
    fontSize: totalSize(5),
    //textAlign: 'center',
    //margin: 10,
    //color: 'white',
    color: 'rgb(66,67,69)',
    fontWeight: 'bold',
    //opacity: 0.6
  },
  instructions: {
    fontSize: totalSize(1.5),
    textAlign: 'center',
    color: 'rgb(217,217,217)',
    marginBottom: 5,
  },
  btnTxtContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  btnTxt: {
    fontSize: totalSize(1.5),
    //color: 'white',
    //color: 'rgb(66,67,69)',
    fontWeight: 'normal',
    color: 'gray'
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  button: {
    width: width(40),
    height: height(15),
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'rgb(180,210,53)',
    marginVertical: height(1),
    elevation: 2,
    //backgroundColor: 'rgb(245,245,238)',
    borderRadius: 5,
    backgroundColor: 'white',
    // borderWidth: 1,

  },
  button2: {
    width: width(90),
    //height: height(10),
    alignItems: 'center',
    //justifyContent: 'flex-start',
    //backgroundColor: 'rgb(180,210,53)',
    marginVertical: height(1),
    //elevation: 2,
    //backgroundColor: 'red',
    //borderRadius: 5,
    //backgroundColor: 'white',
    // borderWidth: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: 'rgb(66,67,69)'

  },
  iconContainer: {
    width: totalSize(5),
    height: totalSize(5),
    backgroundColor: colors.SPA_redColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginHorizontal: width(2),
    marginVertical: height(1)
  },
  imageContainer: {
    //flex:1,
    width: width(100),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    marginTop: height(5),
    // backgroundColor:'black'
  },
  imageProfile: {
    height: totalSize(20),
    width: totalSize(20),
    borderRadius: 100,
  }
});
