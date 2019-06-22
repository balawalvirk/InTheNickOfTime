import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity, TextInput, ImageBackground, StyleSheet, Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast'
import { Icon } from 'react-native-elements'
import colors from '../../../../../Themes/Colors';
import { totalSize, width, height } from 'react-native-dimension';
import images from '../../../../../Themes/Images';

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instruction: 'After submitting your request, wait for an app and email notification of the technicians confirmation of your appointment. Your card will be charged only if/when the technician accepts your request. If the technician declines your request, your credit will not be charged. In this case you may want to try another date, time, or technician. View the status of your request on the booking tab at the bottom of the app. By booking, via website, phone or mobile application and submitting payment you acknowledge that you have reviewed and agreed to all In The Nick of Time Inc. terms, condintions and polices. Do not book service if you are unwilling or unable to be bound by the terms'
        };
    }

    static navigationOptions = {
        title: 'Payment',

    };

    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.topContainer}>
                    <Image source={images.VisaLogo} style={{ height: height(5), width: width(20) }} />
                    <Image source={images.masterCardLogo} style={{ height: height(10), width: width(20),marginHorizontal:width(5)}} />
                    <Image source={images.AMEXlogo} style={{ height: height(4), width: width(15) }} />
                </View>
                {/* <View style={styles.topContainer}>
            <View style={styles.pfContainer}>
                <Image source={images.profilePic} style={styles.profileImage} />
                <TouchableOpacity onPress={this.image_picker}>
                    <Icon name='camera' type='entypo' color='gray' size={totalSize(4)} />
                </TouchableOpacity>
            </View>
            <View >
                <Text style={styles.formTxt}>Your Name</Text>
                <TextInput
                    value={this.state.name}
                    placeholderTextColor='rgb(183,179,179)'
                    style={styles.inputName}
                />
            </View>
        </View> */}
                {/* <View style={[styles.txtContainer,{marginVertical:0,elevation:0,backgroundColor:'transparent',alignItems:'flex-end'}]}>
                    <Text style={styles.formTxt}>Card</Text>
                </View> */}
                <View style={styles.txtContainer}>
                    <View style={{ width: width(10), alignItems: 'center' }}>
                        <Icon name='credit-card-alt' type='font-awesome' color='gray' size={totalSize(3)} />
                    </View>
                    <View style={{ width: width(20), alignItems: 'center' }}>
                        <Text style={styles.formTxt}>Card</Text>
                    </View>
                    <TextInput
                        //value={this.state.name}
                        placeholder='**** **** **** ****'
                        placeholderTextColor='rgb(183,179,179)'
                        style={styles.input}
                    />
                </View>
                {/* <View style={[styles.txtContainer,{marginVertical:0,elevation:0,backgroundColor:'transparent',alignItems:'flex-end'}]}>
                    <Text style={styles.formTxt}>Expiry</Text>
                </View> */}
                <View style={styles.txtContainer}>

                    <View style={{ width: width(10), alignItems: 'center' }}>
                        <Icon name='calendar' type='material-community' color='gray' size={totalSize(4)} />
                    </View>
                    <View style={{ width: width(20), alignItems: 'center' }}>
                        <Text style={styles.formTxt}>Expiry</Text>
                    </View>
                    <TextInput
                        //value={this.state.name}
                        placeholder='MM/YY'
                        placeholderTextColor='rgb(183,179,179)'
                        style={styles.input}
                    />
                </View>
                {/* <View style={[styles.txtContainer, { marginVertical: 0, elevation: 0, backgroundColor: 'transparent', alignItems: 'flex-end' }]}>
                    <Text style={styles.formTxt}>CVC</Text>
                </View> */}
                <View style={styles.txtContainer}>
                    <View style={{ width: width(10), alignItems: 'center' }}>
                        <Icon name='lock' type='font-awesome' color='gray' size={totalSize(4)} />
                    </View>
                    <View style={{ width: width(20), alignItems: 'center' }}>
                        <Text style={styles.formTxt}>CVC</Text>
                    </View>
                    <TextInput
                        //value={this.state.name}
                        placeholder='123'
                        placeholderTextColor='rgb(183,179,179)'
                        style={styles.input}
                    />
                </View>
                {/* <View style={styles.txtContainer}>
            <Text style={[styles.formTxt, { color: 'rgb(218,21,30)', fontWeight: 'normal' }]}>*If you want to change the password then enter a new password below</Text>
            <Text style={styles.formTxt}>New Password</Text>
            <TextInput
                editable={true}
                placeholder='*******'
                placeholderTextColor='rgb(183,179,179)'
                style={styles.input}
            />
        </View> */}
                <View style={{width:width(90),marginTop:height(2),}}>
                    <Text style={[styles.formTxt2,{textAlign:'justify'}]}>{this.state.instruction}</Text>
                </View>

                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn} >
                        {
                            this.state.loading === true ?
                                <ActivityIndicator size='small' color='white' />
                                :
                                <Text style={styles.btnTxt}>Pay 120$</Text>
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
        color:colors.SPA_graycolor

    },
    formTxt2: {
        fontSize: totalSize(1.3),
        //color: 'rgb(207,207,207)',
        //marginTop:height(1),
        color:colors.SPA_graycolor


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