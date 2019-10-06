
  
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity, TextInput, ImageBackground, StyleSheet, Dimensions, Alert } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast'
import { Icon } from 'react-native-elements'
import colors from '../../../../../Themes/Colors';
import { totalSize, width, height } from 'react-native-dimension';
import images from '../../../../../Themes/Images';
import { saveData, createData } from '../../../../../backend/firebase/utility'
import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { CreditCardInput } from 'react-native-credit-card-input'

class CardData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            details : null
        };
    }

    static navigationOptions = {
        title: 'Payment',

    };

    confirmCard(creditCardData){
        
        this.props.navigation.navigate('payment', {
            services: this.props.navigation.getParam('services'),
            location: this.props.navigation.getParam('location'),
            travel_cost: this.props.navigation.getParam('travel_cost'),
            date_time: this.props.navigation.getParam('date_time'),
            time_time: this.props.navigation.getParam('time_time'),
            services_cost: this.props.navigation.getParam('services_cost'),
            technician: this.props.navigation.getParam('technician'),
            comments: this.props.navigation.getParam('comments'),
            address: this.props.navigation.getParam('address'),
            card_number: creditCardData.values.number.replace(/ /g, '') ,
            card_exp_month: creditCardData.values.expiry.split('/')[0], 
            card_exp_year: creditCardData.values.expiry.split('/')[1], 
            card_cvc: creditCardData.values.cvc,
        })
        
    }




    render() {
        return (
            <View>
                <View>
                    <CreditCardInput style={{flex:1,height:400}} requiresName onChange={(cardData) => this.setState({ details : cardData })} />
                </View>
                <TouchableOpacity style={styles.btnTxtContainer} onPress={()=>{this.confirmCard(this.state.details)}}>
                    <Text style={styles.btnTxt}>Next</Text>
                </TouchableOpacity>
            </View>

        )
    }
}

export default CardData;
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        //alignSelf:'center',
        //backgroundColor:colors.SPA_LightRed
        //height:null,
        //width:WIDTH +50
    },
    btnTxtContainer: {
        backgroundColor: colors.SPA_redColor,
        marginVertical: height(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    btnTxt: {
        fontSize: totalSize(2.5),
        color: 'white',

    },
})

