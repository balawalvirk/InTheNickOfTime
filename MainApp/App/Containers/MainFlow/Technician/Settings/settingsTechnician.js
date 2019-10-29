import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Share, Linking } from 'react-native';
//import styles from './Styles/settingCompanyStyles'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcons from 'react-native-vector-icons/Entypo'
import { height, width, totalSize } from 'react-native-dimension';
import { signOut } from './../../../../backend/firebase/auth_new';
//import Share from 'react-native-share';
//import store from '../Stores/orderStore'
import Modal from 'react-native-modal'
import colors from '../../../../Themes/Colors';
class SettingTechnician extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisibleLogout: false

    };
  }
  _toggleModalLogout = () =>
    this.setState({ isModalVisibleLogout: !this.state.isModalVisibleLogout });

  logOut = async () => {
    await signOut()
    await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
    this._toggleModalLogout()
    this.props.navigation.push('login')
  }

  share = async () => {
    try {
      const result = await Share.share({
        title: "In the nick of time",
        message:
          'Hi, I am using this awesome app you should also try this app. ',
        url: 'google.com'
      });

      if (result.action === Share.sharedAction) {
        console.log(result.activityType);

        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }
  render() {

    return (
      <View style={styles.container}>
        {/* <Icon name="ios-settings" size={totalSize(40)} />
        <Text style={styles.Txt}> Settings </Text>
        <Text>This is the settings screen</Text> */}
        <TouchableOpacity style={styles.mainBtn} >
          <View style={styles.btnIconContainer}>
            <View style={styles.IconContainer}>
              <EntypoIcons name="tools" size={totalSize(2)} color='white' />
            </View>
          </View>
          <View style={styles.btnTxtContainer}>
            <Text style={styles.btnTxt1}>How It Works</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Icon name="ios-arrow-forward" size={totalSize(2)} color='rgb(217,217,217)' />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainBtn} onPress={() => { Linking.openURL('mailto:testing@mailinator.com?subject=In the Nick of Time &body=Hi Team,') }}>
          <View style={styles.btnIconContainer}>
            <View style={styles.IconContainer}>
              <Icon name="ios-mail" size={totalSize(2)} color='white' />
            </View>
          </View>
          <View style={styles.btnTxtContainer}>
            <Text style={styles.btnTxt1}>Contact Us</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Icon name="ios-arrow-forward" size={totalSize(2)} color='rgb(217,217,217)' />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainBtn} onPress={() => { Linking.openURL('https://inthenickoftimespa.com/submit-invoice/') }} >
          <View style={styles.btnIconContainer}>
            <View style={styles.IconContainer}>
              <Icon name="ios-calendar" size={totalSize(2)} color='white' />
            </View>
          </View>
          <View style={styles.btnTxtContainer}>
            <Text style={styles.btnTxt1}>Submit Invoice</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Icon name="ios-arrow-forward" size={totalSize(2)} color='rgb(217,217,217)' />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainBtn} onPress={() => this.share()}>
          <View style={styles.btnIconContainer}>
            <View style={styles.IconContainer}>
              <Icon name="md-share" size={totalSize(2)} color='white' />
            </View>
          </View>
          <View style={styles.btnTxtContainer}>
            <Text style={styles.btnTxt1}>Invite Friends</Text>
            {/* <Text style={styles.btnTxt2}>Share with your friends</Text> */}
          </View>
          <View style={styles.arrowContainer}>
            <Icon name="ios-arrow-forward" size={totalSize(2)} color='rgb(217,217,217)' />
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.mainBtn} onPress={() => { this.props.navigation.navigate('WebViewOpensLink', { uri: 'https://play.google.com/store/apps/details?id=com.whatsapp' }) }}>
          <View style={styles.btnIconContainer}>
            <View style={styles.IconContainer}>
              <Icon name="ios-star" size={totalSize(2)} color='white' />
            </View>
          </View>
          <View style={styles.btnTxtContainer}>
            <Text style={styles.btnTxt1}>Rate Us</Text>
          
          </View>
          <View style={styles.arrowContainer}>
            <Icon name="ios-arrow-forward" size={totalSize(2)} color='rgb(217,217,217)' />
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.mainBtn} onPress={() => this._toggleModalLogout()}>
          <View style={styles.btnIconContainer}>
            <View style={styles.IconContainer}>
              <Icon name="ios-log-out" size={totalSize(2)} color='white' />
            </View>
          </View>
          <View style={styles.btnTxtContainer}>
            <Text style={styles.btnTxt1}>Logout</Text>
            {/* <Text style={styles.btnTxt2}>See FEEDBACK</Text> */}
          </View>
          <View style={styles.arrowContainer}>
            <Icon name="ios-arrow-forward" size={totalSize(2)} color='rgb(217,217,217)' />
          </View>
        </TouchableOpacity>


        {/* <TouchableOpacity style={styles.mainBtn} onPress={() => this.props.navigation.navigate('rateAppUser')}>
          <View style={styles.btnIconContainer}>
            <View style={{ width: totalSize(4), height: totalSize(4), borderRadius: 100,backgroundColor: 'rgb(0,173,238)', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="ios-star" size={totalSize(2)} color='white' />
            </View>
          </View>
          <View style={styles.btnTxtContainer}>
            <Text style={styles.btnTxt1}>Rate This App</Text>
            <Text style={styles.btnTxt2}>Write Your Review About This App</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Icon name="ios-arrow-forward" size={totalSize(2)} color='rgb(217,217,217)' />
          </View>
        </TouchableOpacity> */}

        {/* <TouchableOpacity style={styles.mainBtn} onPress={()=>this.props.navigation.navigate('rateus')}>
          <View style={styles.btnIconContainer}>
            <View style={{ width: totalSize(4), height: totalSize(4), borderRadius: 100, backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="ios-star" size={totalSize(2)} color='white' />
            </View>
          </View>
          <View style={styles.btnTxtContainer}>
            <Text style={styles.btnTxt1}>Rate us</Text>
            <Text style={styles.btnTxt2}>you like! Express it</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Icon name="ios-arrow-forward" size={totalSize(2)} color='rgb(217,217,217)' />
          </View>
        </TouchableOpacity> */}

        {/* <TouchableOpacity style={styles.btnLogout} onPress={()=>this._toggleModalLogout()}>
          <Icon name="ios-log-out" size={totalSize(2)} color='white' />
          <View style={{ width: 5 }}></View>
          <Text style={styles.btnLogoutTxt}>LOGOUT</Text>
        </TouchableOpacity> */}

        <Modal
          isVisible={this.state.isModalVisibleLogout} // Delete User
          animationIn='slideInUp'
          animationOut='slideOutDown'
          backdropColor='black'
          animationInTiming={250}
          animationOutTiming={250}
          backdropOpacity={0.50}>
          <View style={{ backgroundColor: 'white', height: height(20), width: width(70), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: totalSize(1.5) }}>Are you sure you want to logout?</Text>
              <View style={{ marginTop: height(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>

                <TouchableOpacity onPress={this._toggleModalLogout} style={{ height: height(8), width: width(30), backgroundColor: colors.SPA_graycolor, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                  <Text style={{ fontSize: totalSize(2), color: 'white' }}>Cancel</Text>
                </TouchableOpacity>
                <View style={{ width: width(2.5) }}></View>
                <TouchableOpacity onPress={() => this.logOut()} style={{ height: height(8), width: width(30), backgroundColor: colors.SPA_redColor, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                  <Text style={{ fontSize: totalSize(2), color: 'white' }}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default SettingTechnician;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //backgroundColor: colors.SPA_LightRed,

    //justifyContent:'center'
  },
  btnLogout: {
    width: width(30),
    height: height(5),
    borderRadius: 5,
    backgroundColor: 'rgb(218,21,30)',
    //elevation: 5,
    //backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: height(10),
    alignItems: 'center',
    flexDirection: 'row',


  },
  btnLogoutTxt: {
    fontSize: totalSize(1.2),
    color: 'white',
    fontWeight: '300',
    textAlign: 'center'
  },
  mainBtn: {
    flexDirection: 'row',
    height: height(8),
    width: width(90),
    borderBottomWidth: 0.5,
    borderColor: 'rgb(217,217,217)',
    alignItems: 'center'
  },
  btnIconContainer: { height: height(15), width: width(10), justifyContent: 'center' },
  IconContainer: { width: totalSize(4), height: totalSize(4), borderRadius: 100, backgroundColor: colors.SPA_graycolor, alignItems: 'center', justifyContent: 'center' },
  btnTxtContainer: { height: height(15), width: width(70), justifyContent: 'center' },
  btnTxt1: { fontSize: totalSize(2), fontWeight: 'bold' },
  btnTxt2: { fontSize: totalSize(1), color: 'rgb(217,217,217)' },
  arrowContainer: { width: width(10), height: height(15), alignItems: 'center', justifyContent: 'center' },
})