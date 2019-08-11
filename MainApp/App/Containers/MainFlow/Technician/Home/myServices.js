import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Picker } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension'
import { Icon } from 'react-native-elements'
import images from '../../../../Themes/Images';
import Modal from 'react-native-modal'
import colors from '../../../../Themes/Colors';
import { getData, updateDocument } from '../../../../backend/firebase/utility';
import AsyncStorage from '@react-native-community/async-storage';
import { throwStatement } from '@babel/types';
_this = null;
class MyServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      user: {},
      loadingServices: false,
      isModalVisible: false,
      isModalVisibleEdite: false,
      idToUpdtate: '',
      s_name: '',
      s_duration: '',
      s_description: '',
      s_price: '',
      s_category: '',

      e_name: '',
      e_duration: '',
      e_description: '',
      e_price: '',
      e_category: '',


      Categories_list: [
        { id: 1, category_name: 'Hair' },
        { id: 2, category_name: 'Nails' },
        { id: 3, category_name: 'Massage' },
        { id: 4, category_name: 'Hands Care' },
      ]
    };
  }
  async componentWillMount() {
    user = await AsyncStorage.getItem('user')
    user = JSON.parse(user)
    console.log(user)
    this.setState({ services: JSON.parse(user.service_details), user: user })
    console.log(this.state.services);
    _this = this;
  }

  addService = async () => {
    newService = {}
    newService.service_name = this.state.s_name
    newService.service_price = this.state.s_price
    newService.service_duration = this.state.s_duration
    newService.service_description = this.state.s_description
    newService.service_category = this.state.s_category
    console.log("bef", this.state.user);
    this.state.services.push(newService)
    tmp = this.state.services
    this.state.user.service_details = JSON.stringify(tmp)
    console.log(tmp);
    console.log(this.state.user);


    let rs = await updateDocument('Technician', this.state.user.id, this.state.user);
    await AsyncStorage.setItem('user', JSON.stringify(this.state.user));
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  updateService = async () => {
    console.log(this.state.idToUpdtate)
    console.log(this.state.services);
    index = this.state.idToUpdtate
    this.state.services[index].service_name = this.state.e_name
    this.state.services[index].service_category = this.state.e_category
    this.state.services[index].service_description = this.state.e_description
    this.state.services[index].service_duration = this.state.e_duration
    this.state.services[index].service_price = this.state.e_price

    tmp = this.state.services
    this.state.user.service_details = JSON.stringify(tmp)

    await updateDocument('Technician', this.state.user.id, this.state.user).then(success => {
      AsyncStorage.setItem('user', JSON.stringify(this.state.user))
    })

    this.setState({
      isModalVisibleEdite: !this.state.isModalVisibleEdite
    });
  }

  deleteService = async (i) => {
    this.state.services.splice(i,1)
    tmp = this.state.services
    this.state.user.service_details = JSON.stringify(tmp)

    await updateDocument('Technician', this.state.user.id, this.state.user).then(success => {
      AsyncStorage.setItem('user', JSON.stringify(this.state.user))
    })
    this.setState(this.state)
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  _toggleModalEdite = (service) => {
    if (this.state.isModalVisibleEdite) {
      this.setState({
        isModalVisibleEdite: !this.state.isModalVisibleEdite
      });
    }
    else {
      this.setState({
        e_name: service.service_name,
        e_price: service.service_price,
        e_duration: service.service_duration,
        e_category: service.service_categoryy,
        e_description: service.service_description,
        isModalVisibleEdite: !this.state.isModalVisibleEdite
      });
    }
  }

  static navigationOptions = {
    title: 'My Services',
    headerRight: (
      <TouchableOpacity onPress={() => _this._toggleModal()} style={{ backgroundColor: colors.SPA_redColor, borderRadius: 5, marginHorizontal: 5 }} >
        <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name='add' color='white' size={totalSize(3)} />
          <View style={{ width: width(1) }}></View>
          <Text style={{ fontSize: totalSize(2), color: 'white' }}>Add</Text>
        </View>
      </TouchableOpacity>
    )
  };
  render() {
    return (
      <View style={styles.Container}>

        <ScrollView
          showsVerticalScrollIndicator={false}>
          {
            this.state.loadingServices === true ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color="rgb(0,41,132)" />
              </View>
              :
              this.state.services.map((service, key) => {
                return (
                  <View key={key} style={styles.shopContainer}>
                    <View style={{ flex: 0.1 }}>
                    </View>
                    <View style={styles.shopTxtContainer}>
                      <Text style={styles.shopName}>{service.service_name}</Text>
                      <Text style={styles.shopDetail}>Price: {service.service_price} $</Text>
                      <Text style={styles.shopDetail}>Duration: {service.service_duration} min</Text>
                    </View>
                    <View style={styles.shopIconContainer}>
                      <TouchableOpacity style={styles.iconContainer} onPress={() => {
                        this._toggleModalEdite(service)
                        this.setState({ idToUpdtate: key })
                      }} >
                        <Icon name="pencil" size={totalSize(2)} color="white" type='font-awesome' />
                      </TouchableOpacity>
                      <View style={{ width: width(2) }}></View>
                      <TouchableOpacity onPress={() => {
                        this.deleteService(key)
                      }} style={[styles.iconContainer, { backgroundColor: colors.SPA_graycolor }]} >
                        <Icon name="delete" size={totalSize(2)} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                );

              })
          }
        </ScrollView>
        <Modal
          isVisible={this.state.isModalVisible}
          animationIn='slideInUp'
          animationOut='slideOutDown'
          backdropColor='black'
          animationInTiming={250}
          animationOutTiming={250}
          backdropOpacity={0.50}
          onBackdropPress={this._toggleModal}>
          <View >
            <View style={styles.popUpTop}>
              <Text style={styles.popUpTopTxt}>Create Service</Text>
              <View style={{ width: width(25) }}></View>
              <TouchableOpacity onPress={this._toggleModal} style={{ marginRight: width(1) }} >
                <Icon name="close" size={totalSize(4)} color="white" />
              </TouchableOpacity>
            </View>



            <View style={styles.popUpContainerService}>

              <View style={styles.inputTxtContainer} >
                <Text style={styles.popUpText}>Category</Text>
                <View style={{ marginTop: height(1), alignItems: 'center', justifyContent: 'center', width: width(80), height: height(6), borderRadius: 5, elevation: 5, backgroundColor: 'white', }}>
                  <Picker
                    mode='dropdown'
                    selectedValue={this.state.s_category}
                    style={styles.PickerStyle}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ s_category: itemValue })
                    }>
                    <Picker.Item label="Select category" value='' />
                    {
                      this.state.Categories_list.map((item, key) => {
                        return (
                          <Picker.Item key={key} label={item.category_name} value={item.id} />
                        )
                      })

                    }
                  </Picker>
                </View>
              </View>
              <View style={styles.inputTxtContainer}>
                <Text style={styles.popUpText}>Service name</Text>
                <TextInput
                  placeholder='service name'
                  placeholderTextColor='rgb(217,217,217)'
                  style={styles.popUpInput}
                  onChangeText={(value) => {
                    this.setState({ s_name: value })
                  }}
                />
              </View>

              {/* <View style={styles.inputTxtContainer}>
                <Text style={styles.popUpText}>Service Code</Text>
                <TextInput
                  placeholder='125547845'
                  placeholderTextColor='rgb(217,217,217)'
                  style={styles.popUpInput}
                />
              </View> */}

              <View style={styles.inputTxtContainer}>
                <Text style={styles.popUpText}>Service Price</Text>
                <TextInput
                  placeholder='100'
                  keyboardType='numeric'
                  placeholderTextColor='rgb(217,217,217)'
                  style={styles.popUpInput}
                  onChangeText={(value) => {
                    this.setState({ s_price: value })
                  }}
                />
              </View>

              <View style={styles.inputTxtContainer}>
                <Text style={styles.popUpText}>Service Duration</Text>
                <TextInput
                  placeholder='In minutes'
                  placeholderTextColor='rgb(217,217,217)'
                  keyboardType='numeric'
                  style={styles.popUpInput}
                  onChangeText={(value) => {
                    this.setState({ s_duration: value })
                  }}
                />
              </View>

              <View style={styles.inputTxtContainer}>
                <Text style={styles.popUpText}>Description</Text>
                <TextInput
                  placeholder='About Your Service'
                  placeholderTextColor='rgb(217,217,217)'
                  style={styles.popUpInput}
                  onChangeText={(value) => {
                    this.setState({ s_description: value })
                  }}
                />
              </View>
              {/* <View style={styles.uploadContainer}>
                <TouchableOpacity style={styles.btnUpload} onPress={this.imagePicker}>
                  <Text style={styles.btnUploadTxt}>Upload Image</Text>
                </TouchableOpacity>
                {
                  this.state.image === null ?
                    <Text style={styles.filesTxt} >no files selected</Text>
                    :
                    <Image source={this.state.image} style={{ height: totalSize(2), width: totalSize(2) }} />
                }
              </View> */}

              <TouchableOpacity style={styles.btnFinish} onPress={() => {
                this.addService()
              }}>
                {
                  this.state.loading === true ?
                    <ActivityIndicator size="small" color="white" />
                    :
                    <Text style={styles.btnFinishTxt}>Add</Text>
                }
              </TouchableOpacity>
            </View>
          </View>

        </Modal>

        <Modal
          isVisible={this.state.isModalVisibleEdite}
          animationIn='slideInUp'
          animationOut='slideOutDown'
          backdropColor='black'
          animationInTiming={250}
          animationOutTiming={250}
          backdropOpacity={0.50}
          onBackdropPress={this._toggleModalEdite}>
          <View >
            <View style={styles.popUpTop}>
              <Text style={styles.popUpTopTxt}>Edit Service</Text>
              <View style={{ width: width(25) }}></View>
              <TouchableOpacity onPress={this._toggleModalEdite} style={{ marginRight: width(1) }} >
                <Icon name="close" size={totalSize(4)} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.popUpContainerService}>
              <View style={styles.inputTxtContainer}>
                <Text style={styles.popUpText}>Service name</Text>
                <TextInput
                  //placeholder={this.state.e_name}
                  value={this.state.e_name}
                  placeholderTextColor='rgb(217,217,217)'
                  style={styles.popUpInput}
                  onChangeText={(value => {
                    this.setState({ e_name: value })
                  })}
                />
              </View>

              <View style={styles.inputTxtContainer}>
                <Text style={styles.popUpText}>Service Price</Text>
                <TextInput
                  value={this.state.e_price}
                  placeholderTextColor='rgb(217,217,217)'
                  style={styles.popUpInput}
                  keyboardType="numeric"
                  onChangeText={(value) => {
                    this.setState({ e_price: value })
                  }}
                />
              </View>

              <View style={styles.inputTxtContainer}>
                <Text style={styles.popUpText}>Service Duration</Text>
                <TextInput
                  value={this.state.e_duration}
                  placeholderTextColor='rgb(217,217,217)'
                  keyboardType="numeric"
                  style={styles.popUpInput}
                  onChangeText={(value) => {
                    this.setState({ e_duration: value })
                  }}
                />
              </View>

              <View style={styles.inputTxtContainer}>
                <Text style={styles.popUpText}>Description</Text>
                <TextInput
                  value={this.state.e_description}
                  placeholderTextColor='rgb(217,217,217)'
                  style={styles.popUpInput}
                  onChangeText={(value) => {
                    this.setState({ e_description: value })
                  }}
                />
              </View>

              {/* <View style={styles.uploadContainer}>
                <TouchableOpacity style={styles.btnUpload} onPress={this.imagePicker}>
                  <Text style={styles.btnUploadTxt}>Upload Image</Text>
                </TouchableOpacity>
                {
                  this.state.image === null ?
                    <Text style={styles.filesTxt} >no files selected</Text>
                    :
                    <Image source={this.state.image} style={{ height: totalSize(2), width: totalSize(2) }} />
                }
              </View> */}

              <TouchableOpacity style={styles.btnFinish} onPress={() => {
                this.updateService()
              }}>
                {
                  this.state.loading === true ?
                    <ActivityIndicator size="small" color="white" />
                    :
                    <Text style={styles.btnFinishTxt}>Update</Text>
                }
              </TouchableOpacity>
            </View>
          </View>

        </Modal>
      </View>
    );
  }
}

export default MyServices;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    //backgroundColor: colors.SPA_LightRed,
    alignItems: 'center',

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
    height: height(10),
    borderRadius: 4,
    elevation: 5,
    backgroundColor: 'white',
    marginVertical: height(0.5),
    marginHorizontal: width(2),
    flexDirection: 'row',
    alignItems: 'center',

  },
  shopImageContainer: {
    width: width(30),
    height: height(10),
    //alignItems:'center',
    //justifyContent:'center'
  },
  shopImage: {
    width: width(28),
    height: height(10),
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,

  },
  shopTxtContainer: {
    flex: 3,
    //alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor:'red'
  },
  shopIconContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:'green'
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: totalSize(5),
    height: totalSize(5),
    borderRadius: 100,
    //backgroundColor: 'rgb(0,41,132)',
    backgroundColor: colors.SPA_redColor
  },

  shopName: {

    fontSize: totalSize(2),
    fontWeight: '500',

  },
  shopDetail: {
    fontSize: totalSize(1.5),
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
  },
  PickerStyle: {
    width: width(60),
    height: height(5),
    //alignItems: 'center',
    //justifyContent: 'center',
    //backgroundColor: 'white',
    //fontSize: totalSize(2.5),
    color: 'rgb(66,67,69)'
    //marginVertical:height(2),
    //borderRadius: 25,
  },

})
