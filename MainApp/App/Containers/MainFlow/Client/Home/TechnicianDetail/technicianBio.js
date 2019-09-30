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
import firebase from 'firebase';
export default class TechnicianBio extends Component {
    constructor(props) {
        super(props);
        console.log("TECHNICIAN CHECK", this.props.navigation.getParam('technician', ''));

        this.state = {
            name: this.props.navigation.getParam('technician', '').name,
            aboutMe: this.props.navigation.getParam('technician', '').description,

            photo: this.props.navigation.getParam('technician', '').photo
        };
    }

    componentDidMount() {
        this.props.navigation.addListener("willFocus", () => {
            this.fetchOrder();
        });
    }
    async fetchOrder() {
        await this.setState({ isDataLoded: false });
        let TechnicianList = await firebase.firestore().collection("Technician").where("UserId", "==", this.props.navigation.getParam('technician', '').UserId).get()
        TechnicianList.forEach(element3 => {
            if (element3.data().weekly_availability !== undefined) {
                this.setState({ timings: element3.data().weekly_availability });
            }
        });
        await this.setState({ isDataLoded: true });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ flex: 2, backgroundColor: 'transparent', }}>
                        <View style={{ flex: 2, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={this.state.photo
                                ? { uri: this.state.photo }
                                : images.profilePic} style={styles.shopImage} style={styles.profilePic} />
                        </View>
                        <View style={{ flex: 3, backgroundColor: 'transparent', justifyContent: 'center', alignItems: "center" }}>
                            <Text style={styles.txtLarg}> {this.state.name} </Text>
                            <View style={{ backgroundColor: 'transparent', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={[styles.welcome, { fontSize: totalSize(2), fontWeight: 'normal' }]}>Technician Availability:   </Text>
                                {this.state.timings != "" && this.state.timings != null && typeof this.state.timings != 'string' ?
                                    this.state.timings.map(i => {
                                        return <View style={{ width: width(90), flexDirection: 'row' }}>
                                            <Text style={[styles.welcome, { fontSize: totalSize(2), fontWeight: 'normal', marginVertical: 5, marginHorizontal: 5 }]}>{i.item}</Text>
                                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}><Text style={{ textAlign: 'left' }}>{i.time_from} - {i.time_to}</Text></View>
                                        </View>
                                    })
                                    :
                                    <Text></Text>}
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 4, backgroundColor: 'transparent', flexWrap: 'wrap' }}>
                        <Text style={{ marginHorizontal: 20 }}>{this.state.aboutMe}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}