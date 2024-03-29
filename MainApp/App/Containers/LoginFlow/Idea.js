import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Easing, ScrollView, ActivityIndicator, Image, Alert } from 'react-native';
import { height, width, totalSize } from 'react-native-dimension'
import { Icon } from 'react-native-elements'

import Toast from 'react-native-simple-toast';
import images from '../../Themes/Images';
import uuid from 'uuid';
import { connectFirebase } from '../../backend/firebase/utility';
import { signUp } from '../../backend/firebase/auth_new';
import Loader from "../../Components/Loader"
import SignUpConstraints from '../../Validations/SignUpConstraints';
import validate from 'validate.js'
import ZoomImage from 'react-native-zoom-image';
import HTML from 'react-native-render-html';
class Idea extends Component {
    constructor(props) {
        super(props);
        this.state = ({

        });




    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        connectFirebase();
    }


    async MoveNext() {
        this.props.selectedData();
        // this.props.selectedData();
    }

    render() {
        return (
            <View style={styles.container}>
                <Loader ref={r => this.loader = r} />
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.lowerContainer}>
                        <View style={{ flex: 1, width: width(85), alignItems: 'center', backgroundColor: 'transparent', marginTop: height(5) }}>
                            <Image source={images.logo} style={styles.logo} />
                            <View style={[styles.txtContainer, {}]}>
                                <Text style={[styles.welcome2, { fontSize: totalSize(2.3), fontWeight: "bold" }]}>
                                    INDIVIDUAL CLIENTS & PARTIES/EVENTS
                                </Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>
                                    You have the opportunity to be featured on our website and receive individual clients to provide services at their location. You can also be called for big events, parties and wedding job opportunities.


                                </Text>
                                <Text style={[styles.welcome2, { fontSize: totalSize(2.3), fontWeight: "bold" }]}>
                                    There are great benefits of working with us:
                                </Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>- Able To Use The Products & Supplies Of Your Choosing</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>- No Required Hours/ Set Your Own Schedule</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>- Option: Featured On Mobile App</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>- Screened Clients</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>- Charge Clients For Travel</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>- Cash Tips</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>- Work With A Reputable Company With Great Clients!</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>- Get Paid Direct Deposit (Invoices paid twice a month for induvial clients and 1-3 business days post event for events. Invoices required for all jobs)</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>- Receive New Clients Via E-mail & App</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>- Ability To Decline Clients Or Change The Appointment Time</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>- Option: Participate In Events & Party Jobs</Text>
                                <Text style={[styles.welcome2, { fontSize: totalSize(2.3), fontWeight: "bold" }]}>
                                    Requirements
                                </Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>By proceeding you acknowledge the requirements to work with In the Nick of Time Inc.</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>- Must Have Professional Liability Insurance</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>- Must Have All Supplies/Equipment To Provide Offered Services</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>- State Issued Professional License Or Certification (Makeup Artists)</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>- Submit W-9 & Direct Deposit Forms</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>- Pass A Criminal Background Check</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>- You Create Your Own Services/ Prices & Travel Locations/Prices</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>- Technician Receives 70% Commission Of Total Booking.</Text>
                            </View>

                            <View style={styles.btnContainer}>

                                <TouchableOpacity style={styles.button} onPress={() => this.MoveNext()}>
                                    {
                                        this.state.loading === true ?
                                            <ActivityIndicator size={'small'} color='white' />
                                            :
                                            <View style={styles.btnTxtContainer}>
                                                <Text style={styles.btnTxt}>Next</Text>
                                            </View>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Idea;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        //justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'rgb(66,67,69)'

    },
    searchContainer: {
        width: width(90),
        height: height(6),
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        marginVertical: height(1),
        borderRadius: 25,
        flexDirection: 'row'
    },
    pic2: {
        height: height(30),
        width: width(50),
        marginVertical: 10
    },
    TxtInput: {
        width: width(70),
        height: height(6),
        //alignItems: 'center',
        //justifyContent: 'center',
        //backgroundColor: 'red',
        fontSize: totalSize(1.5),
        //color: 'rgb(217,217,217)'
        //color: 'rgb(180,210,53)',
        //marginVertical:height(2),
        //borderRadius: 25,
    },
    lowerContainer: {
        flex: 1,
        width: width(100),
        //height: null,
        //justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgb(245,245,238)',
        //backgroundColor: 'rgb(217,217,217)'
        // backgroundColor: 'rgb(0,173,238)'
        //backgroundColor:'rgb(180,210,53)'
        //marginTop: height(10)
    },
    logo: {
        marginVertical: height(1),
        height: totalSize(15),
        width: totalSize(12)
    },
    txtContainer: {
        alignItems: "flex-start",
        justifyContent: 'center',
        //marginVertical: height(3)
        marginVertical: height(1),
    },
    welcome: {
        fontSize: totalSize(5),
        textAlign: "left",

        color: 'rgb(66,67,69)',

        //opacity: 0.6
    },
    welcome2: {
        fontSize: totalSize(5),
        textAlign: "center",
        margin: 10,
        color: 'rgb(66,67,69)',

        //opacity: 0.6
    },
    instructions: {
        fontSize: totalSize(2),
        textAlign: 'center',
        color: 'rgb(66,67,69)',
        //color: 'rgb(217,217,217)',
        //marginBottom: 5,
    },
    btnTxtContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTxt: {
        fontSize: totalSize(2),
        color: 'white',
    },


    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'black'
    },
    InputContainer: {
        flexDirection: 'row',
        width: width(80),
        height: height(7),
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'rgb(180,210,53)',
        //backgroundColor: 'rgb(0,173,238)',
        backgroundColor: 'white',
        marginTop: height(1),
        elevation: 2.5,
        borderRadius: 5,
        //marginVertical: height(1),
        //borderWidth: 0.25,
        //borderColor: 'rgb(180,210,53)'
        //borderColor: 'rgb(66,67,69)'

    },
    button: {
        width: width(80),
        height: height(7),
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'rgb(180,210,53)',
        //backgroundColor: 'rgb(0,173,238)',
        backgroundColor: 'rgb(219,0,0)',
        marginVertical: height(3),
        elevation: 5,
        borderRadius: 5,

    },
    buttonSmall: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(66,67,69)',
        //marginVertical: height(1),
        borderRadius: 5
    },
    PickerStyle: {
        width: width(75),
        height: height(8),
        //alignItems: 'center',
        //justifyContent: 'center',
        //backgroundColor: 'white',
        fontSize: totalSize(2.5),
        color: 'rgb(66,67,69)'
        //marginVertical:height(2),
        //borderRadius: 25,
    },
});
