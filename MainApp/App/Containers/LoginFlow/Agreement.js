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
import SignatureComponent from "../../Components/SignatureComponent";
import GlobalConst from "../../config/GlobalConst";
import firebase from 'firebase';
class Agreement extends Component {
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
                        <View style={{ flex: 1, width: width(95), alignItems: 'center', backgroundColor: 'transparent', marginTop: height(5) }}>
                            <Image source={images.logo} style={styles.logo} />
                            <View style={[styles.txtContainer, {}]}>
                                <Text style={[styles.welcome2, { fontSize: totalSize(2.3), fontWeight: "bold" }]}>
                                    Independent Contractor Agreement
                                </Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>This agreement is made and entered into on the date indicated above between In The Nick of Time, Inc., hereafter “TNT” and the Independent Contractor listed above. This contract is good for a period of one year and renews automatically thereafter. TNT is a licensed business in the Commonwealth of Virginia and whereas TNT provides Salon/Spa Services. The following will occur:</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2), }]}>1. Independent contractor responsible for providing all supplies and equipment to perform requested services for clients.
                                </Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2), }]}>2. Independent contractor will submit an invoice with client's name, location, and price (that is on their page) via online portal. This shall be an accurate account of services provided. If invoice is not accurate, payment may be delayed to the next pay period. All completed, accurate invoices submitted between the 1st of the month and the 15th, will be paid on the 25th of the month. All completed, accurate invoices submitted between the 16th of the month and the end of the month will be paid on the 10th. For events & parties invoice is still required, payments made 1-3 business days post event. </Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2), }]}>3. Independent contractor will set their own prices and agrees that TNT shall receive 30% of prices, 70% is paid to independent contractor contingent on independent contractor having and maintaining valid liability insurance.  Events & parties are paid based upon verbal & written agreed amount. No percentage will be taken out in the case of events and parties.


                                </Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2), }]}>4. In the Nick of Time Inc. shall not schedule clients for independent contractor but rather independent contractor makes own schedule based on client request.

                                    </Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2), }]}>5. The Independent Contractor must hold a valid state issued professional license as required and liability insurance.
                                    </Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2), }]}>6. Independent contractor agrees not to solicit or personally advertise to any client, customer, or referral source identified by TNT during term of the contract and for a period of 1 year from the written termination of this contract. Furthermore, if there is any breach regarding this agreement, independent contractor understands he/she is subject to claims for damages from TNT in the amount of $5,000 per client.

                                    </Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2), }]}>7. Independent contractor understands they are NOT employees of TNT, they are their own entity, and therefore shall not be entitled to any employee benefits or salary by TNT including but not limited to vacation, pension, sick leave, overtime pay, workman's compensation, or health insurance.


                                    </Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2), }]}>8. The Independent Contractor shall: • Be responsible for paying all local, county and federal taxes as required. • File all state and federal tax returns as required.


                                    </Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2), }]}>9. As an independent contractor, we have the right to take you off the website and cease promoting you/your services depending on your reliability and any client complaints. This may happen with no notice.


                                    </Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2), }]}>10.  Independent contractor understands that if client requests a full refund due to complaint of poor quality of work or poor quality of supplies, refund will be given and stylist/massage therapist/barber will not be paid for that service/client.

                                    </Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2), }]}>It is mutually understood and agreed that no alteration or variation of the terms of this contract shall be valid unless made in writing and signed by both parties, and that no oral alterations or variations of the terms hereof unless made in writing between the parties hereto shall be binding on and for the parties hereto.
                                    </Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2), }]}>Subject to the terms and conditions of this agreement, In the Nick of Time Inc. hereby engages the independent contractor to perform the services set forth herein, and the independent contractor hereby accepts such engagement.*
                                    </Text>
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='person' color='rgb(66,67,69)' size={totalSize(3)} />
                                <TextInput
                                    //onChangeText={(value) => this.getSchool_predictions(value)}
                                    placeholder='Name'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                    value={this.state.Name}
                                    onChangeText={(text) => this.setState({ Name: text })}
                                />
                            </View>
                            <View style={{
                                width: width(80),
                                height: height(40),
                                marginHorizontal: 20,
                                marginVertical: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <SignatureComponent />
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

export default Agreement;


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
        alignItems: "center",
        justifyContent: 'center',
        marginVertical: height(3),
        marginHorizontal: height(3),
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
