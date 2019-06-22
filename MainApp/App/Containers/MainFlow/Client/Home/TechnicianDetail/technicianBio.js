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
        this.state = {
            aboutMe: 'As an Aveda graduate, Samaria’s background is as eclectic as is her personal style! She prides herself in being able to work with all different textures and ethnicities, all the while keeping her main goal for all clients in the forefront… #teamHEALTHYHAIR! While the hair coloring process is her passion, Samaria loves working and educating our curly girls on healthy maintenance, as well as men in clipper cutting. Working her way down from the crown, Samaria has an eye for brows and sixth sense for your makeup needs'
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 2, backgroundColor: 'transparent', flexDirection: 'row' }}>
                    <View style={{ flex: 2, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={images.profilePic} style={styles.profilePic} />
                    </View>
                    <View style={{ flex: 3, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={styles.txtLarg}> Alina Shaw </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='calendar-clock' color='gray' size={totalSize(2)} type='material-community' />
                            <Text style={styles.txtSmall}>  Availability : Mon-Sun 8AM-4PM</Text>
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