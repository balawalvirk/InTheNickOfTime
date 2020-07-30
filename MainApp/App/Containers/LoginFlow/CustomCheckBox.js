import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Easing, ScrollView, ActivityIndicator, Image, Alert } from 'react-native';
import { height, width, totalSize } from 'react-native-dimension'
import { Icon, CheckBox } from 'react-native-elements'

import Toast from 'react-native-simple-toast';
import images from '../../Themes/Images';
import uuid from 'uuid';
import { connectFirebase } from './../../backend/firebase/utility';
import { signUp } from './../../backend/firebase/auth_new';
import Loader from "../../Components/Loader"
import SignUpConstraints from './../../Validations/SignUpConstraints';
import validate from 'validate.js'
import ZoomImage from 'react-native-zoom-image';
import HTML from 'react-native-render-html';
import colors from '../../Themes/Colors';
class CustomCheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        };
    }
    toggleChange() {
        this.setState({ checked: !this.state.checked });
    }


    render() {
        return (

            <View style={{ flex: 1 }}>
                <View style={[styles.InputContainer, { backgroundColor: 'transparent', elevation: 0, justifyContent: 'flex-start', marginVertical: height(1) }]}>
                    <CheckBox
                        title={this.props.Name}
                        iconType='material-community'
                        checkedIcon='checkbox-marked-circle'
                        uncheckedIcon='checkbox-blank-circle-outline'
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                        textStyle={{ fontSize: totalSize(1.8), fontWeight: 'normal' }}
                        size={totalSize(2.5)}
                        checked={this.state.checked}
                        checkedColor={colors.SPA_redColor}
                        onPress={() =>  this.bind.toggleChange(this)}
                    />

                </View>

            </View>


        );
    }
}

export default CustomCheckBox;


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
