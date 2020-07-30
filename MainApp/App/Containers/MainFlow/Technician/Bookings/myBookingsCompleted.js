import React, { Component } from 'react';
// import { View, Text, StyleSheet, ScrollView, TextInput, Image, Button } from 'react-native';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';

import images from '../../../../Themes/Images';
import { width, height, totalSize } from 'react-native-dimension'
import { Icon } from 'react-native-elements'
import colors from '../../../../Themes/Colors';
import { getUserBookings, getUserId, saveData, getTechnicianBookings } from '../../../../backend/firebase/utility'
import Loader from '../../../../Components/Loader';
import firebase from 'firebase'
import StarRating from 'react-native-star-rating';
import Modal from 'react-native-modal'
import styles2 from '../../../Styles/technicianDetailStyles'
// import undefined from 'firebase/empty-import';
// import { TouchableOpacity } from 'react-native-gesture-handler';
class myBookingsCompleted extends Component {
  constructor(props) {
    super(props);



    this.state = {
      Booking_list: [
        // { id: 1, client_name: 'Lina', client_profile_pic: images.profilePic, service_name: 'Hand massage', service_code: '025012', Address: '18002 Sea Island olace, New York, USA', service_price: '50', dateTime: '8:00AM 06-15-19', status: 'Accepted', Categories: ['Care', 'NailCare', 'Facials', 'Hair'] },
        // { id: 2, client_name: 'Salish', client_profile_pic: images.profilePic, service_name: 'Face Cleaning & Facial', Address: '18002 Sea Island olace, New York, USA', service_duration: '30', service_price: '50', dateTime: '8:00AM 06-15-19', status: 'Declined', Categories: ['Care', 'NailCare', 'Facials', 'Hair'] },
        // { id: 3, client_name: 'Hanana', client_profile_pic: images.profilePic, service_name: 'Hair Diy', Address: '18002 Sea Island olace, New York, USA', service_duration: '30', service_price: '50', dateTime: '8:00AM 06-15-19', status: 'Pending', Categories: ['Care', 'NailCare', 'Facials', 'Hair'] },
        // { id: 4, client_name: 'Hanana', client_profile_pic: images.profilePic, service_name: 'Hair Diy', Address: '18002 Sea Island olace, New York, USA', service_duration: '30', service_price: '50', dateTime: '8:00AM 06-15-19', status: 'Declined', Categories: ['Care', 'NailCare', 'Facials', 'Hair'] },
        // { id: 5, client_name: 'Hanana', client_profile_pic: images.profilePic, service_name: 'Hair Diy', Address: '18002 Sea Island olace, New York, USA', service_duration: '30', service_price: '50', dateTime: '8:00AM 06-15-19', status: 'Accepted', Categories: ['Care', 'NailCare', 'Facials', 'Hair'] },
      ]
    };
  }

  // getNames = async () => {


  //   let TempArry = [];
  //   arr = await getUserBookings('Bookings')
  //   for (i = 0; i < arr.length; i++) {
  //     console.log("arr", arr[i].technicianId);
  //     if (arr[i].status !== undefined) {
  //       if (arr[i].status === 'completed') {

  //         let qSnapshot = await firebase.firestore().collection('Ratting').where('BookingId', '==', arr[i].id).get()
  //         qSnapshot.forEach((doc) => {
  //           if (doc.exists) {
  //             console.log("Doc", doc.data());
  //             // arr[i].technicianName = doc.data().name
  //             // arr[i].photo = doc.data().photo
  //             arr[i].isRated = doc.data().isRated;
  //             arr[i].rating = doc.data().rating;
  //           }
  //         })
  //         TempArry.push(arr[i])
  //       }
  //     }

  //   }
  //   this.setState({ Booking_list: TempArry });
  // }
  async getNames() {
    await this.setState({ Booking_list: [] })
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
      if (bookings[i].status === 'completed') {
        let qSnapshot2 = await firebase.firestore().collection('Ratting').where('BookingId', '==', bookings[i].id).get()
        qSnapshot2.forEach((doc) => {
          if (doc.exists) {
            console.log("Doc", doc.data());
            // arr[i].technicianName = doc.data().name
            // arr[i].photo = doc.data().photo
            bookings[i].isRated = doc.data().isRated;
            bookings[i].rating = doc.data().rating;
            bookings[i].Review = doc.data().comment;
          }
        })
        pending.push(bookings[i])
      }

      this.setState({ Booking_list: pending, })
    }
    console.log("State", this.state);
    // this.loader.hide()
  }

  async fetchOrders() {
    this.getNames();
  }

  async componentDidMount() {
    //  this.loader.show()
    this.props.navigation.addListener("willFocus", () => {
      this.setState({ isDataLoad: false });
      this.fetchOrders();
    });
    // this.loader.hide()
  }


  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });


  RattingBtn(index) {
    this.setState({ ActiveIndex: index });
    this._toggleModal();
  }
  async RattingSubmit() {

    let User = await getUserId();
    let ID = this.uniqueID();
    let Obj = {
      id: ID,
      name: User.name,
      isRated: true,
      rating: this.state.starCount,
      comment: this.state.comment,
      date: new Date().toDateString(),
      UserId: User.UserId,
      BookingId: this.state.Booking_list[this.state.ActiveIndex].id,
      technicianId: this.state.Booking_list[this.state.ActiveIndex].technicianId,
    }
    await saveData("Ratting", ID, Obj);
    let TempList = this.state.Booking_list;
    TempList[this.state.ActiveIndex].isRated = true;
    TempList[this.state.ActiveIndex].rating = this.state.starCount;
    this.setState({ starCount: 0, comment: "", ActiveIndex: 0, Booking_list: TempList });


    this._toggleModal();

  }


  uniqueID() {
    function chr4() {
      return Math.random().toString(16).slice(-4);
    }
    return chr4() + chr4() +
      '-' + chr4() +
      '-' + chr4() +
      '-' + chr4() +
      '-' + chr4() + chr4() + chr4();
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
    //console.warn('Rating===>', rating)
  }

  render() {
    return (
      <View style={styles.Container}>

        <View style={{ flex: 1 }}>


          <View style={{ flex: 4, alignItems: 'center' }}>
            <ScrollView
              showsVerticalScrollIndicator={false}>
              {
                this.state.loadingServices === true ?
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' color="rgb(0,41,132)" />
                  </View>
                  :
                  this.state.Booking_list.length > 0 ?
                    this.state.Booking_list.map((items, key) => {
                      let img = null;
                      if (items.photo != null) {
                        img = { uri: items.photo }
                      } else {
                        img = images.profilePic
                      }
                      return (
                        <View key={key} style={styles.shopContainer}>
                          <View style={styles.shopImageContainer}>
                            <Image source={img} style={styles.shopImage} />
                          </View>
                          <View style={styles.shopTxtContainer}>
                            <Text style={styles.shopName}>{items.userName}</Text>
                            <View style={{ flexDirection: 'row', flexWrap:"wrap" }}>
                              <Text style={[styles.shopDetail, { color: colors.SPA_graycolor }]}>Service: </Text>
                              {
                                items.services.map((u, i) => {
                                  return (
                                    <View key={i}>
                                      <Text style={styles.shopDetail}>{u.Name}</Text>
                                    </View>
                                  );
                                })
                              }
                            </View>
                            <Text style={styles.shopDetail}>Comments: {items.comments}</Text>
                            <Text style={styles.shopDetail}>Total Amount : {items.amount} $</Text>
                            <Text style={styles.shopDetail}>At {items.time} - {items.date_time}</Text>
                            <Text style={styles.shopDetail}>Location: {items.location}</Text>
                          </View>
                          <View style={[styles.shopIconContainer]}>
                            {items.isRated ?
                              <StarRating
                                disabled={false}
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                maxStars={5}
                                starSize={totalSize(1.5)}
                                rating={items.rating}
                                //selectedStar={(rating) => this.onStarRatingPress(rating)}
                                fullStarColor={colors.SPA_redColor}
                              />
                              :
                              <TouchableOpacity style={[styles2.button, { borderRadius: 5, backgroundColor: colors.SPA_redColor, marginRight: 0, height: 20, width: 80 }]}>
                                <Text style={[styles2.buttonTxt, { fontWeight: "bold", fontSize: 14 }]}>No Rating</Text>
                              </TouchableOpacity>
                            }
                            {items.isRated !== "" && items.Review!==undefined ? 
                            <View style={[styles.statusContainer,{marginVertical: 2, marginHorizontal: 0}]} >
                              <Text style={[styles.shopDetail,{marginVertical: 10, marginHorizontal: 10}]}>Review: {items.Review}</Text> 
                            </View>
                            : null}
                            <View style={[styles.statusContainer]} >
                              {
                                items.status === 'accepted' ?
                                  <Icon name="primitive-dot" size={totalSize(2.5)} color={colors.SPA_Green} type='octicon' style={{ marginLeft: 10 }} />
                                  :
                                  <Icon name="primitive-dot" size={totalSize(2.5)} color={items.status === 'pending' ? colors.SPA_graycolor : colors.error} type='octicon' style={{ marginLeft: 10 }} />
                              }
                              <Text style={[styles.shopName, { fontSize: totalSize(1.5), color: colors.SPA_redColor, fontWeight: 'normal', marginLeft: 5 }]}>{items.status}</Text>
                            </View>
                          </View>
                        </View>
                      );

                    })
                    :
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
                      <Text style={[styles.shopName, { color: colors.SPA_graycolor, fontSize: totalSize(2), left: width(0), marginTop: "50%" }]}>No Booking</Text>

                    </View>
              }
            </ScrollView>


          </View>
        </View>
        <Modal
          isVisible={this.state.isModalVisible}
          animationIn='slideInUp'
          animationOut='slideOutDown'
          backdropColor='black'
          animationInTiming={500}
          animationOutTiming={500}
          backdropOpacity={0.50}
          onBackdropPress={this._toggleModal}>

          <View>
            <View style={styles2.modalHeader}>
              <Text style={[styles2.txtLarg, { fontSize: totalSize(2), color: 'white' }]}>Rate a Technician</Text>
            </View>
            <View style={styles2.modalBody}>
              <View style={styles2.starTxtContainer}>
                <Text style={styles2.txtSmall}>
                  Tap to Rate:
                                </Text>
                <View style={{ width: width(5) }}></View>
                <StarRating
                  disabled={false}
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  halfStar={'ios-star-half'}
                  iconSet={'Ionicons'}
                  maxStars={5}
                  starSize={totalSize(3)}
                  rating={this.state.starCount}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                  fullStarColor={colors.SPA_redColor}
                />
              </View>
              <View style={styles2.inputTxtContainer}>
                <Text style={[styles2.txtSmall, { marginVertical: 3, color: colors.SPA_redColor }]}>Comment</Text>
                <View style={styles2.commentInputView}>
                  <TextInput
                    onChangeText={(value) => this.setState({ comment: value })}
                    placeholder='ENTER COMMENT HERE'
                    placeholderTextColor='rgb(245,245,238)'
                    style={styles2.commentInput}
                  />
                </View>
                <TouchableOpacity onPress={() => this.RattingSubmit()} style={styles2.buttonModal}>
                  {

                    <Text style={{ fontSize: totalSize(2), color: 'white', fontWeight: "bold" }}>Submit</Text>
                  }
                </TouchableOpacity>
              </View>


            </View>

          </View>
        </Modal>
      </View>
    );
  }
}

export default myBookingsCompleted;

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
    // height: height(10),
    flex: 0,
    borderRadius: 4,
    elevation: 5,
    backgroundColor: 'white',
    marginVertical: height(1),
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
    borderRadius: 30

  },
  shopTxtContainer: {
    flex: 3,
    marginVertical: height(1),
    //alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor:'red'
  },
  shopIconContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: 'center',
    // flexDirection: 'row',
    //backgroundColor: 'green'
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height(8),
    width: "100%",
    borderLeftWidth: 0.5,
    flexDirection: "row"
    // borderRadius: 5,
    //backgroundColor: 'rgb(0,41,132)'
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