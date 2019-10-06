import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import images from '../../../../Themes/Images';
import { width, height, totalSize } from 'react-native-dimension'
import { Icon } from 'react-native-elements'
import colors from '../../../../Themes/Colors';
import Loader from '../../../../Components/Loader';
import firebase from 'firebase'
import { getTechnicianBookings, updateDocument } from '../../../../backend/firebase/utility'

class bookingTechnician extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: [],
      accepted: [],
      refreshing: false
    };
  }

  async componentDidMount() {
    this.loader.show()
    this.getNames()
    this.loader.hide()
  }

  _onRefresh = async () => {
    console.log("here");

    this.setState({ refreshing: true });
    await this.getNames()
    this.setState({ refreshing: false });
  }


  async getNames() {
    bookings = await getTechnicianBookings("Bookings")
    pending = []
    accepted = []
    for (i = 0; i < bookings.length; i++) {

      let qSnapshot = await firebase.firestore().collection('Users').where('UserId', '==', bookings[i].userId).get()
      qSnapshot.forEach((doc) => {
        if (doc.exists) {
          console.log("Doc", doc.data());
          bookings[i].UserName = doc.data().firstName
          bookings[i].photo = doc.data().photo
          bookings[i].notification = doc.data().notification
        }
      })
      if (bookings[i].status === 'pending') {
        pending.push(bookings[i])
      }
      else if ((bookings[i].status === 'accepted')) {
        accepted.push(bookings[i])
      }
      this.setState({ pending: pending, accepted: accepted })

    }
    console.log("State", this.state);

    this.loader.hide()

  }

  updateBooking = async (booking, index) => {
    not = []
    try {
      console.log('booking', booking)
      if (!booking.photo) {
        delete booking.photo;
      }
      booking.UserName = booking.userName
      if (booking.status === 'pending') {
        try {
          not = JSON.parse(booking.notification)
          not.push("Booking request has been accepted by" + booking.technicianName)

        } catch (err) {
          not = []
          not.push("Booking request has been accepted by " + booking.technicianName)
        }
        booking.status = 'accepted'
        this.onCollect(booking.payment_id);
        let result = await updateDocument('Bookings', booking.id, booking);
        result = await updateDocument('Users', booking.userId, { notification: not });
        console.log('result', result);
        this.state.pending.splice(index, 1)
        this.setState({ accepted: [...this.state.accepted, booking] })
      } else if (booking.status === 'accepted') {
        booking.status = 'completed'
        let result = await updateDocument('Bookings', booking.id, booking);
        console.log('result', result);
        this.state.accepted.splice(index, 1)
        this.setState(this.state);
      }
    } catch (err) {
      console.log("Error", err);
    }
  }

  deleteBooking = async (booking, index) => {
    try {
      booking.UserName = booking.userName
      if (!booking.photo) {
        delete booking.photo;
      }
      booking.status = 'canceled'
      this.onReject(booking.payment_id);
      let result = await updateDocument('Bookings', booking.id, booking);
      console.log(result);
      this.state.pending.splice(index, 1)
      this.setState(this.state);
    } catch (err) {
      console.log("Error", err);
    }
  }


  async onCollect(id){
    fetch('https://api.stripe.com/v1/charges/'+id+'/capture', {

          headers: {
  
            Accept: 'application/json',
    
            'Content-Type': 'application/x-www-form-urlencoded',
          
            Authorization: `Bearer sk_test_jbVThMJnytG859dT7o8AvBc500oeMZcOo0`
            // Authorization: `Bearer sk_test_jbVThMJnytG859dT7o8AvBc500oeMZcOo0`
          },
          // Use a proper HTTP method
          method: 'post',
          // Format the credit card data to a string of key-value pairs
          // divided by &
          
      }).then(response => {alert('amount collected');console.log(response)}).catch(err => {
        alert(err.error.message)
      })
  }

  async onReject(id){

    const body = {};
    body['charge'] = id,
    fetch('https://api.stripe.com/v1/refunds', {

          headers: {
  
            Accept: 'application/json',
    
            'Content-Type': 'application/x-www-form-urlencoded',
          
            Authorization: `Bearer sk_test_jbVThMJnytG859dT7o8AvBc500oeMZcOo0`
            // Authorization: `Bearer sk_test_jbVThMJnytG859dT7o8AvBc500oeMZcOo0`
          },
          // Use a proper HTTP method
          method: 'post',
          // Format the credit card data to a string of key-value pairs
          // divided by &
          body: Object.keys(body)
          .map(key => key + '=' + body[key])
          .join('&')
          
      }).then(response => {alert('amount refunded');console.log(response)}).catch(err => {
        alert(err.error.message)
      })
  }
  render() {
    return (
      <View style={styles.Container}>
        <Loader ref={r => this.loader = r} />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end', }}>
            <Text style={[styles.shopName, { color: colors.SPA_graycolor, fontSize: totalSize(2.5), left: width(5) }]}>Pending Bookings </Text>
          </View>

          <View style={{ flex: 4, alignItems: 'center' }}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => { this._onRefresh() }}
                />
              }
            >

              {
                this.state.loadingServices === true ?
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color="rgb(0,41,132)" />
                  </View>
                  :
                  this.state.pending.map((items, key) => {
                    console.log("Key", key);

                    return (
                      <View key={key} style={styles.shopContainer}>
                        <View style={styles.shopImageContainer}>
                          <Image source={{ uri: items.photo }} style={styles.shopImage} />
                        </View>
                        <View style={styles.shopTxtContainer}>
                          <Text style={styles.shopName}>{items.userName}</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.shopDetail, { color: colors.SPA_graycolor }]}>Services: </Text>
                            <Text style={styles.shopDetail}>{items.servicesList}</Text>
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.shopDetail, { color: colors.SPA_graycolor }]}>Location: </Text>
                            <Text style={styles.shopDetail}>{items.location}</Text>
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.shopDetail, { color: colors.SPA_graycolor }]}>At: </Text>
                            <Text style={styles.shopDetail}>{items.date_time}</Text>
                          </View>
                          <Text style={styles.shopDetail}>Demo Description</Text>
                        </View>
                        <View style={[styles.shopIconContainer, { backgroundColor: 'transparent', flexDirection: 'row' }]}>
                          <TouchableOpacity onPress={() => { this.updateBooking(items, key) }} style={[styles.iconContainer, { backgroundColor: colors.SPA_redColor }]} >
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 5, marginHorizontal: 5, }} >
                              {/* <Icon name="check" size={totalSize(2)} color="white" type='antdesign' /> */}
                              <Text style={[styles.shopDetail, { color: 'white', fontSize: totalSize(1) }]}>Accept</Text>
                            </View>
                          </TouchableOpacity>
                          <View style={{ width: width(2) }}></View>
                          <TouchableOpacity onPress={() => { this.deleteBooking(items, key) }} style={[styles.iconContainer, { backgroundColor: colors.SPA_graycolor }]} >
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
            <Text style={[styles.shopName, { color: colors.SPA_graycolor, fontSize: totalSize(2.5), left: width(5) }]}>Accepted Bookings </Text>
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
                  this.state.accepted.map((items, key) => {
                    console.log("Key", key)
                    return (
                      <View key={key} style={styles.shopContainer}>
                        <View style={styles.shopImageContainer}>
                          <Image source={{ uri: items.photo }} style={styles.shopImage} />
                        </View>
                        <View style={styles.shopTxtContainer}>
                          <Text style={styles.shopName}>{items.userName}</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.shopDetail, { color: colors.SPA_graycolor }]}>Services: </Text>
                            <Text style={styles.shopDetail}>{items.servicesList}</Text>
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.shopDetail, { color: colors.SPA_graycolor }]}>Location: </Text>
                            <Text style={styles.shopDetail}>{items.location}</Text>
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.shopDetail, { color: colors.SPA_graycolor }]}>At: </Text>
                            <Text style={styles.shopDetail}>{items.date_time}</Text>
                          </View>
                          <Text style={styles.shopDetail}>Demo Description</Text>
                        </View>
                        <View style={[styles.shopIconContainer]}>
                          {/* <TouchableOpacity style={styles.iconContainer} >
                        <Icon name="pencil" size={totalSize(2)} color="white" type='font-awesome' />
                      </TouchableOpacity> */}
                          <View style={{ width: width(2) }}></View>
                          <TouchableOpacity onPress={() => { this.updateBooking(items, key) }} style={[styles.iconContainer, { backgroundColor: colors.SPA_redColor }]} >
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