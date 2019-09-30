import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity, TextInput, ImageBackground, StyleSheet, Dimensions, Alert, Linking } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast'
import { Icon } from 'react-native-elements'
import colors from '../../../../../Themes/Colors';
import { totalSize, width, height } from 'react-native-dimension';
import images from '../../../../../Themes/Images';
import { saveData, createData, updateDocument } from '../../../../../backend/firebase/utility'
import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { CreditCardInput } from 'react-native-credit-card-input'

class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            instruction: 'After submitting your request, wait for an app and email notification of the technicians confirmation of your appointment. Your card will be charged only if/when the technician accepts your request. If the technician declines your request, your credit will not be charged. In this case you may want to try another date, time, or technician. View the status of your request on the booking tab at the bottom of the app. By booking, via website, phone or mobile application and submitting payment you acknowledge that you have reviewed and agreed to all In The Nick of Time Inc. terms, conditions and polices. Do not book service if you are unwilling or unable to be bound by the terms',
            amount: parseFloat(this.props.navigation.getParam('services_cost', 0.00)) + parseFloat(this.props.navigation.getParam('travel_cost', 0.00)),
        };
    }

    static navigationOptions = {
        title: 'Payment',

    };


    getCreditCardToken = (creditCardData) => {
        const card = {
            'card[number]': creditCardData.values.number.replace(/ /g, ''),
            'card[exp_month]': creditCardData.values.expiry.split('/')[0],
            'card[exp_year]': creditCardData.values.expiry.split('/')[1],
            'card[cvc]': creditCardData.values.cvc
        };

        return fetch('https://api.stripe.com/v1/tokens', {
            headers: {
                // Use the correct MIME type for your server
                Accept: 'application/json',
                // Use the correct Content Type to send data in request body
                'Content-Type': 'application/x-www-form-urlencoded',
                // Use the Stripe publishable key as Bearer
                Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
            },
            // Use a proper HTTP method
            method: 'post',
            // Format the credit card data to a string of key-value pairs
            // divided by &
            body: Object.keys(card)
                .map(key => key + '=' + card[key])
                .join('&')
        }).then(response => response.json());
    };

    checkOut = async () => {
        try {
            this.setState({ loader: true });
            let Booking = {
                userId: '',
                userName: '',
                amount: 0.00,
                status: 'pending',
                comments: '',
                date_time: '',
                location: '',
                services: {},
                services_cost: 0.00,
                travel_cost: 0.00,
                technicianId: '',
                technicianName: '',
                servicesList: '',
                address: '',
                card: ''

            }

            user = AsyncStorage.getItem('user', async (error, data) => {
                console.log("USER", data)
                if (data) {
                    res = JSON.parse(data)
                    console.log(res);
                    Booking.userId = res.id
                    Booking.userName = res.name
                    Booking.Email= res.email
                    Booking.phoneNumber= res.phoneNumber
                }
                for (i = 0; i < this.props.navigation.getParam('services', 0).length; i++) {
                    Booking.servicesList = Booking.servicesList + " " + this.props.navigation.getParam('services', '')[i].service_name
                }
                Booking.services_cost = parseFloat(this.props.navigation.getParam('services_cost', 0.00))
                Booking.travel_cost = parseFloat(this.props.navigation.getParam('travel_cost', 0.00))
                Booking.date_time = this.props.navigation.getParam('date_time', '')
                Booking.location = this.props.navigation.getParam('location', '')[0].Name
                Booking.services = this.props.navigation.getParam('services', '')
                Booking.technicianId = this.props.navigation.getParam('technician', '').UserId
                Booking.technicianName = this.props.navigation.getParam('technician', '').name
                Booking.amount = Booking.services_cost + Booking.travel_cost
                Booking.address = this.props.navigation.getParam('address')
                Booking.card = this.props.navigation.getParam('card')
                Booking.id= this.props.navigation.getParam('technician', '').id
                this.setState({ amount: Booking.amount })
                Booking.comments = this.props.navigation.getParam("comments", '')
                await createData("Bookings", Booking);
                tmp = this.props.navigation.getParam('technician', '').notification
                txt = Booking.userName + " has requested for an appointment."
                tmp.push(txt)
                kk = this.props.navigation.getParam('technician', '').id
                
                result = await updateDocument("Technician",kk,{notification:tmp})
                console.log(result);
                
                
                this.setState({ loader: false });
                console.log("Normal Booking", Booking);
                let msg = 'Your request has been sent! Please wait while the technician confirms your appointment. You will be notified via app and e-mail. Your card is not charged until the technician confirms your appointment.';
                Alert.alert('Success', msg, [{ text: 'OK', onPress: () => { this.props.navigation.navigate('clientTab'); } }], { cancelable: false });
            });

        } catch (e) {
            console.log(e);
            Alert.alert('Failure', 'Failed to checkout. Please try again.', [{ text: 'OK', onPress: () => { } }]);
        } finally {
            // this.loader.hide();
            this.setState({ loader: false });
        }
        //console.log("String Booking", JSON.parse(JSON.stringify(Booking)));
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

    render() {
        return (
            <View style={styles.Container}>
                {/* <CreditCardInput requiresName onChange={(cardData) => this.setState({ cardData })} /> */}
                <View style={{ width: width(90), marginTop: height(2), }}>
                    <Text style={[styles.formTxt2, { textAlign: 'justify' }]}>{this.state.instruction}</Text>
                    <Text style={{color:'blue', alignSelf:'center', margin:15}}onPress={() => { Linking.openURL('https://inthenickoftimespa.com/policies/') }}>Terms And Conditions</Text>
                </View>




                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn} onPress={() => { this.checkOut() }} >
                        {
                            this.state.loading === true ?
                                <ActivityIndicator size='small' color='white' />
                                :
                                <Text style={styles.btnTxt}>Pay ${this.state.amount}</Text>
                        }
                    </TouchableOpacity>
                </View>


            </View>
        );
    }
}

export default Payment;
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        //alignSelf:'center',
        //backgroundColor:colors.SPA_LightRed
        //height:null,
        //width:WIDTH +50
    },
    pfContainer: {
        width: totalSize(15),
        height: totalSize(15),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: width(2),
        borderRadius: 100,

    },
    profileImage: {
        width: totalSize(15),
        height: totalSize(15),
        position: 'absolute',
        borderRadius: 100,

    },
    cameraIcon: {
        width: width(8),
        height: height(5),

    },

    topContainer: {
        //width: width(),
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: height(5),
        //backgroundColor: 'red'

    },
    txtContainer: {
        alignItems: 'center',
        height: height(7),
        //borderWidth: 0.5,
        //borderColor: colors.SPA_redColor,
        //paddingLeft: 10,
        //borderRadius: 5,
        //fontSize: totalSize(1.5),
        //backgroundColor: 'red',
        //elevation: 5,
        flexDirection: 'row',
        width: width(90),
        //alignItems: 'flex-start',
        marginTop: height(1),
        //backgroundColor:'red'

    },
    btnContainer: {
        //width: width(80),
        alignItems: 'center',
        marginVertical: height(10),
        justifyContent: 'center',
        //backgroundColor:'green'
    },
    btnTxt: {
        fontSize: totalSize(1.6),
        fontWeight: '100',
        color: 'white'

    },
    btn: {
        width: width(80),
        height: height(6),
        backgroundColor: colors.SPA_redColor,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1
    },
    formTxt: {
        fontSize: totalSize(2),
        //fontWeight: 'bold',
        //marginBottom: height(0.5),
        //alignSelf: 'flex-start',
        color: colors.SPA_graycolor

    },
    formTxt2: {
        fontSize: totalSize(1.3),
        //color: 'rgb(207,207,207)',
        //marginTop:height(1),
        color: colors.SPA_graycolor


    },
    inputName: {
        width: width(48),
        height: height(6),
        //borderWidth: 0.5,
        //borderColor: colors.SPA_redColor,
        paddingLeft: 10,
        fontSize: totalSize(1.5),
        borderRadius: 5,
        backgroundColor: 'white',
        elevation: 5
    },
    input: {
        width: width(55),
        height: height(6),
        //borderWidth: 0.5,
        //borderColor: colors.SPA_redColor,
        paddingLeft: 10,
        borderRadius: 5,
        fontSize: totalSize(1.5),
        backgroundColor: 'white',
        elevation: 5
    },



})