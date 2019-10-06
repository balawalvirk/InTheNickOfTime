import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Picker } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension'
import { Icon } from 'react-native-elements'
import images from '../../../../Themes/Images';
import Modal from 'react-native-modal'
import colors from '../../../../Themes/Colors';
import { getData, updateDocument, getAllOfCollection } from '../../../../backend/firebase/utility';
import AsyncStorage from '@react-native-community/async-storage';
import { throwStatement } from '@babel/types';
import Loader from "../../../../Components/Loader"
import firebase from 'firebase';
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
      Cindex: '',

      Categories_list: [
        { id: 1, category_name: 'Hair' },
        { id: 2, category_name: 'Nails' },
        { id: 3, category_name: 'Massage' },
        { id: 4, category_name: 'Hands Care' },
      ]
    };
  }
  async componentDidMount() {


    this.props.navigation.addListener("willFocus", async () => {

      this.loader.show()
      await this.loadUser()
      await this.loadServices()

      this.loader.hide()

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

    this.setState({ Categories_list: ServicesList });
    this.LoadServiceList();
  }

  async LoadServiceList() {
    let List = [];
    let TechnicianList = await firebase.firestore().collection("Technician").where("UserId", "==", this.state.user.UserId).get()
    TechnicianList.forEach(element3 => {

      if (element3.data().services !== undefined && element3.data().services.length > 0) {
        this.setState({ServicesTempList:element3.data().services });
        for (let i = 0; i < element3.data().services.length; i++) {
          this.state.Categories_list.forEach(element => {
            element.SubList.forEach(element2 => {
              if (element2.id === element3.data().services[i]) {
                List.push(element2);
              }
            });
          });
        }
        this.setState({ services: List })
      } else {
        this.setState({ services: [] })
      }
    });
  }

  async loadUser() {
    sv = []
    user = await AsyncStorage.getItem('user')
    user = JSON.parse(user)
    console.log(user)
    // try {
    //   sv = JSON.parse(user.service_details)
    // } catch (err) {
    //   sv = []
    // }
    this.setState({ user: user })
    console.log(this.state.services);
    _this = this;
  }



  addService = async () => {
    let List= this.state.ServicesTempList;
    List.push(this.state.ss_category);
    this.state.user.services=List;
    this.loader.show()
    let rs = await updateDocument('Technician', this.state.user.id, this.state.user);
    
    this.setState({ isModalVisible: !this.state.isModalVisible });
    this.LoadServiceList()
    this.loader.hide()
  }

  updateService = async () => {
    
    index = this.state.idToUpdtate
    let List= this.state.ServicesTempList;
    List[index]=this.state.ss_category;
    this.state.user.services=List;
    this.loader.show()
    await updateDocument('Technician', this.state.user.id, this.state.user).then(success => {
    })

    this.setState({
      isModalVisibleEdite: !this.state.isModalVisibleEdite
    });
    this.LoadServiceList()
    this.loader.hide()
  }

  deleteService = async (i) => {
   
    let List= this.state.ServicesTempList;
    List.splice(i,1);;
    this.state.user.services=List;
    this.loader.show()
    await updateDocument('Technician', this.state.user.id, this.state.user).then(success => {
      
    })
    this.LoadServiceList()
    this.loader.hide()
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
      let index=0;
      this.state.Categories_list.forEach(element => {
        index++;
        element.SubList.forEach(element2 => {
          if (element2.id === service.id) {
            this.setState({
              s_category: element.id,
              ss_category: element2.id,
              Cindex: index,
              isModalVisibleEdite: !this.state.isModalVisibleEdite
            });
          }
        });
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
        <Loader ref={r => this.loader = r} />
        <ScrollView
          showsVerticalScrollIndicator={false}>
          {
            this.state.loadingServices === true ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color="rgb(0,41,132)" />
              </View>
              :
              (
                this.state.services.length > 0 ?
                  this.state.services.map((service, key) => {
                    return (
                      <View key={key} style={styles.shopContainer}>
                        <View style={{ flex: 0.1 }}>
                        </View>
                        <View style={styles.shopTxtContainer}>
                          <Text style={styles.shopName}>{service.Name}</Text>
                          <Text style={styles.shopDetail}>Price: $ {service.Cost}</Text>
                          <Text style={styles.shopDetail}>Duration: {service.Duration} min</Text>
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
                  :
                  <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
                    <Text style={[styles.shopName, { color: colors.SPA_graycolor, fontSize: totalSize(2), left: width(0), marginTop: "50%" }]}>No Service</Text>
                  </View>
              )
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
                      this.setState({ s_category: itemValue, Cindex: itemIndex })
                    }>
                    <Picker.Item label="Select category" value='' />
                    {
                      this.state.Categories_list.map((item, key) => {
                        return (
                          <Picker.Item key={key} label={item.Name} value={item.id} />
                        )
                      })

                    }
                  </Picker>
                </View>
              </View>
              {this.state.Cindex !== "" ?
                // <View>
                //   <Text>
                //     {this.state.Cindex}
                //   </Text>
                // </View> 
                <View style={styles.inputTxtContainer} >
                  <Text style={styles.popUpText}>Sub Category</Text>
                  <View style={{ marginTop: height(1), alignItems: 'center', justifyContent: 'center', width: width(80), height: height(6), borderRadius: 5, elevation: 5, backgroundColor: 'white', }}>
                    <Picker
                      mode='dropdown'
                      selectedValue={this.state.ss_category}
                      style={styles.PickerStyle}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ ss_category: itemValue })
                      }>
                      <Picker.Item label="Select Sub category" value='' />
                      {
                        this.state.Categories_list[this.state.Cindex - 1].SubList !== undefined &&
                          this.state.Categories_list[this.state.Cindex - 1].SubList.length > 0 ?
                          this.state.Categories_list[this.state.Cindex - 1].SubList.map((item, key) => {
                            return (
                              <Picker.Item key={key} label={item.Name} value={item.id} />
                            )
                          })
                          :
                          null
                      }
                    </Picker>
                  </View>
                </View>
                :
                null
              }
 <View style={styles.inputTxtContainer}>
                <Text style={styles.popUpText}>Service Price</Text>
                <TextInput
                  placeholder='100'
                  keyboardType='numeric'
                  placeholderTextColor='rgb(217,217,217)'
                  style={styles.popUpInput}
                  onChangeText={(value) => {
                    this.setState({ NewCost: value })
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
                    this.setState({ NewDuration: value })
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
                    this.setState({ NewDescraption: value })
                  }}
                />
              </View>
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
              <Text style={styles.popUpTopTxt}>Update Service</Text>
              <View style={{ width: width(25) }}></View>
              <TouchableOpacity onPress={this._toggleModalEdite} style={{ marginRight: width(1) }} >
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
                      this.setState({ s_category: itemValue, Cindex: itemIndex })
                    }>
                    <Picker.Item label="Select category" value='' />
                    {
                      this.state.Categories_list.map((item, key) => {
                        return (
                          <Picker.Item key={key} label={item.Name} value={item.id} />
                        )
                      })

                    }
                  </Picker>
                </View>
              </View>
              {this.state.Cindex !== "" ?
                // <View>
                //   <Text>
                //     {this.state.Cindex}
                //   </Text>
                // </View> 
                <View style={styles.inputTxtContainer} >
                  <Text style={styles.popUpText}>Sub Category</Text>
                  <View style={{ marginTop: height(1), alignItems: 'center', justifyContent: 'center', width: width(80), height: height(6), borderRadius: 5, elevation: 5, backgroundColor: 'white', }}>
                    <Picker
                      mode='dropdown'
                      selectedValue={this.state.ss_category}
                      style={styles.PickerStyle}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ ss_category: itemValue })
                      }>
                      <Picker.Item label="Select Sub category" value='' />
                      {
                        this.state.Categories_list[this.state.Cindex - 1].SubList !== undefined &&
                          this.state.Categories_list[this.state.Cindex - 1].SubList.length > 0 ?
                          this.state.Categories_list[this.state.Cindex - 1].SubList.map((item, key) => {
                            return (
                              <Picker.Item key={key} label={item.Name} value={item.id} />
                            )
                          })
                          :
                          null
                      }
                    </Picker>
                  </View>
                </View>
                :
                null
              }

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
