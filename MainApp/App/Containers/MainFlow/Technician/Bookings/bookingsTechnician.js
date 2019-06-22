import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import images from '../../../../Themes/Images';
import { width, height, totalSize } from 'react-native-dimension'
import { Icon } from 'react-native-elements'
import colors from '../../../../Themes/Colors';
class bookingTechnician extends Component {
  constructor(props) {
    super(props);
    this.state = {

      Booking_list: [
        { id: 1, client_name: 'Lina', client_profile_pic: images.profilePic, service_name: 'Hand massage', service_code: '025012', Address: '18002 Sea Island olace, New York, USA', service_price: '50', dateTime: '8:00AM 06-15-19' },
        { id: 2, client_name: 'Salish', client_profile_pic: images.profilePic, service_name: 'Face Cleaning & Facial', Address: '18002 Sea Island olace, New York, USA', service_duration: '30', service_price: '50', dateTime: '8:00AM 06-15-19' },
        { id: 3, client_name: 'Hanana', client_profile_pic: images.profilePic, service_name: 'Hair Diy', Address: '18002 Sea Island olace, New York, USA', service_duration: '30', service_price: '50', dateTime: '8:00AM 06-15-19' },
        { id: 4, client_name: 'Hanana', client_profile_pic: images.profilePic, service_name: 'Hair Diy', Address: '18002 Sea Island olace, New York, USA', service_duration: '30', service_price: '50', dateTime: '8:00AM 06-15-19' },
        { id: 5, client_name: 'Hanana', client_profile_pic: images.profilePic, service_name: 'Hair Diy', Address: '18002 Sea Island olace, New York, USA', service_duration: '30', service_price: '50', dateTime: '8:00AM 06-15-19' },
      ]
    };
  }

  render() {
    return (
      <View style={styles.Container}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end', }}>
            <Text style={[styles.shopName, { color: colors.SPA_graycolor, fontSize: totalSize(2.5), left: width(5) }]}>Pending Bookings </Text>
          </View>

          <View style={{ flex: 4, alignItems: 'center' }}>
            <ScrollView
              showsVerticalScrollIndicator={false}>
              {
                this.state.loadingServices === true ?
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color="rgb(0,41,132)" />
                  </View>
                  :
                  this.state.Booking_list.map((items, key) => {
                    return (
                      <View key={key} style={styles.shopContainer}>
                        <View style={styles.shopImageContainer}>
                          <Image source={items.client_profile_pic} style={styles.shopImage} />
                        </View>
                        <View style={styles.shopTxtContainer}>
                          <Text style={styles.shopName}>Alina</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.shopDetail, { color: colors.SPA_graycolor }]}>Services: </Text>
                            <Text style={styles.shopDetail}>{items.service_name}</Text>
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.shopDetail, { color: colors.SPA_graycolor }]}>Note: </Text>
                            <Text style={styles.shopDetail}>This is the client's request message</Text>
                          </View>
                          <Text style={styles.shopDetail}>At {items.dateTime}</Text>
                          <Text style={styles.shopDetail}>{items.Address}</Text>
                        </View>
                        <View style={[styles.shopIconContainer, { backgroundColor: 'transparent', flexDirection: 'row' }]}>
                          <TouchableOpacity style={[styles.iconContainer, { backgroundColor: colors.SPA_redColor }]} >
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 5, marginHorizontal: 5, }}>
                              {/* <Icon name="check" size={totalSize(2)} color="white" type='antdesign' /> */}
                              <Text style={[styles.shopDetail, { color: 'white', fontSize: totalSize(1) }]}>Accept</Text>
                            </View>
                          </TouchableOpacity>
                          <View style={{ width: width(2) }}></View>
                          <TouchableOpacity style={[styles.iconContainer, { backgroundColor: colors.SPA_graycolor }]} >
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 5, marginHorizontal: 5, }}>
                              {/* <Icon name="check" size={totalSize(2)} color="white" type='antdesign' /> */}
                              <Text style={[styles.shopDetail, { color: 'white', fontSize: totalSize(1) }]}>Decline</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );

                  })
              }
            </ScrollView>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end', }}>
            <Text style={[styles.shopName, { color: colors.SPA_graycolor, fontSize: totalSize(2.5), left: width(5) }]}>Proccess Bookings </Text>
          </View>

          <View style={{ flex: 4, alignItems: 'center' }}>
            <ScrollView
              showsVerticalScrollIndicator={false}>
              {
                this.state.loadingServices === true ?
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color="rgb(0,41,132)" />
                  </View>
                  :
                  this.state.Booking_list.map((items, key) => {
                    return (
                      <View key={key} style={styles.shopContainer}>
                        <View style={styles.shopImageContainer}>
                          <Image source={items.client_profile_pic} style={styles.shopImage} />
                        </View>
                        <View style={styles.shopTxtContainer}>
                          <Text style={styles.shopName}>Alina</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.shopDetail, { color: colors.SPA_graycolor }]}>Services: </Text>
                            <Text style={styles.shopDetail}>{items.service_name}</Text>
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.shopDetail, { color: colors.SPA_graycolor }]}>Note: </Text>
                            <Text style={styles.shopDetail}>This is the client's request message</Text>
                          </View>
                          <Text style={styles.shopDetail}>At {items.dateTime}</Text>
                          <Text style={styles.shopDetail}>{items.Address}</Text>
                        </View>
                        <View style={[styles.shopIconContainer]}>
                          {/* <TouchableOpacity style={styles.iconContainer} >
                        <Icon name="pencil" size={totalSize(2)} color="white" type='font-awesome' />
                      </TouchableOpacity> */}
                          <View style={{ width: width(2) }}></View>
                          <TouchableOpacity style={[styles.iconContainer, { backgroundColor: colors.SPA_redColor }]} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 4, marginHorizontal: 7, }}>
                              {/* <Icon name="check" size={totalSize(2)} color="white" type='antdesign' /> */}
                              <Text style={[styles.shopName, { color: 'white' }]}>Done</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );

                  })
              }
            </ScrollView>
          </View>
        </View>

      </View>
    );
  }
}

export default bookingTechnician;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    //backgroundColor:colors.SPA_LightRed
    // backgroundColor: colors.silver,
    //alignItems: 'center',

  },
  btnAddSservice: {
    backgroundColor: 'rgb(0,41,132)',
    height: height(4),
    width: width(15),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width(5),
    borderRadius: 3,
    elevation: 2,
    flexDirection: 'row'
  },
  btnAddServiceTxt: {
    color: 'white',
    fontSize: totalSize(1)
  },
  searchInputContainer: {
    width: width(80),
    height: height(6),
    backgroundColor: 'rgb(255,255,255)',
    elevation: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: height(1),

  },
  searchInput: {
    width: width(70),
    height: height(4),
    fontSize: totalSize(0.8)

  },
  btnSearch: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchIcon: {
    width: totalSize(1.5),
    height: totalSize(1.5)
  },
  shopContainer: {
    width: width(90),
    //height: height(10),
    borderRadius: 4,
    elevation: 5,
    backgroundColor: 'white',
    marginVertical: height(0.5),
    marginHorizontal: width(2),
    flexDirection: 'row',
    //alignItems: 'center',

  },
  shopImageContainer: {
    flex: 1,
    //backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  shopImage: {

    height: totalSize(6),
    width: totalSize(6),
    borderRadius: 100

  },
  shopTxtContainer: {
    flex: 3,
    //alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor:'red'
    marginVertical: height(1)
  },
  shopIconContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    //flexDirection: 'row',
    //backgroundColor: 'green'
  },
  iconContainer: {
    //alignItems: 'center',
    //justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: 'rgb(0,41,132)'
  },

  shopName: {

    fontSize: totalSize(2),
    fontWeight: '500',

  },
  shopDetail: {
    fontSize: totalSize(1.3),
    color: 'gray',

  },
  popUpContainer: {
    height: height(60),
    width: width(90),
    elevation: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  popUpContainerService: {
    width: width(90),
    elevation: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },

  popUpTop: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    height: height(7),
    width: width(90),
    backgroundColor: colors.SPA_redColor,
    alignItems: 'center',
    justifyContent: 'flex-end',
    //alignSelf: 'center'
    flexDirection: 'row'
  },
  popUpTopTxt: {
    fontSize: totalSize(2),
    fontWeight: '300',
    color: 'white'
  },
  inputTxtContainer: {
    width: width(80),
    marginVertical: height(1),
    //backgroundColor:'blue'
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width(80),
    height: height(6),
    elevation: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: height(1),
    shadowColor: 'gray',
    shadowOpacity: 0.4
  },
  pickerStyle: {
    color: 'rgb(217,217,217)',
    height: height(6),
    width: width(78),
    alignSelf: 'center'
  },
  popUpText: {
    fontSize: totalSize(1.3),
    color: colors.SPA_redColor,
    fontWeight: '200',
    left: width(2)
  },
  popUpInput: {
    width: width(80),
    height: height(6),
    fontSize: totalSize(1.2),
    elevation: 5,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
    marginTop: height(1),
    shadowColor: 'gray',
    shadowOpacity: 0.4
  },
  uploadContainer: {
    flexDirection: 'row',
    width: width(80),
    marginTop: height(2),
    alignItems: 'center'
  },
  btnUpload: {
    height: height(3),
    width: width(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: 'rgb(0,41,132)',
    marginRight: width(2)
  },
  btnUploadTxt: {
    color: 'white',
    fontSize: totalSize(1.2)
  },
  filesTxt: {
    color: 'gray',
    fontSize: totalSize(1.2)
  },

  btnFinish: {
    width: width(80),
    height: height(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.SPA_redColor,
    borderRadius: 5,
    marginVertical: height(3)
  },
  btnFinishTxt: {
    color: 'white',
    fontSize: totalSize(1.8)
  }

})