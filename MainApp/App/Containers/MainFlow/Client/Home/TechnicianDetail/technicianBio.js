import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, Picker, ImageBackground } from 'react-native';
import images from '../../../../../Themes/Images';
import { totalSize, height, width } from 'react-native-dimension';
import { Icon, } from 'react-native-elements'
import StarRating from 'react-native-star-rating';
import colors from '../../../../../Themes/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal'
//import DateTimePicker from "react-native-modal-datetime-picker"
import DateTimePicker from 'react-native-datepicker'
import styles from '../../../../Styles/technicianDetailStyles'

export default class TechnicianBio extends Component {
    constructor(props) {
        super(props);
        console.log("TECHNICIAN CHECK", this.props.navigation.getParam('technician', ''));

        this.state = {
            name: this.props.navigation.getParam('technician', '').name,
            aboutMe: this.props.navigation.getParam('technician', '').description,
            timings: this.props.navigation.getParam('technician', '').weekly_availability + " " + this.props.navigation.getParam('technician', '').daily_availability,
            photo: this.props.navigation.getParam('technician', '').photo
        };
    }



    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 2, backgroundColor: 'transparent', flexDirection: 'row' }}>
                    <View style={{ flex: 2, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={this.state.photo
                            ? { uri: this.state.photo }
                            : images.profilePic} style={styles.shopImage} style={styles.profilePic} />
                    </View>
                    <View style={{ flex: 3, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={styles.txtLarg}> {this.state.name} </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='calendar-clock' color='gray' size={totalSize(2)} type='material-community' />
                            <Text style={styles.txtSmall}>  Availability : {this.state.timings}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 4, backgroundColor: 'transparent', flexWrap: 'wrap' }}>
                    <Text style={{ marginHorizontal: 20 }}>{this.state.aboutMe}</Text>
                </View>
            </View>
        );
    }
}