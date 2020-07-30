import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
import { totalSize, width, height } from 'react-native-dimension'
import images from '../Themes/Images'
import { connectFirebase } from '../backend/firebase/utility';
import AsyncStorage from '@react-native-community/async-storage';
class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static navigationOptions = {
        header: null
    }
    
    async componentDidMount() {

        console.log(JSON.stringify({ id: 1, location: 'Sea site, New york, USA', travel_cost: 20 }));
        connectFirebase();
        try{
            let data = await AsyncStorage.getItem('user');
            if (data) {
                user = JSON.parse(data);
                console.log(user);
                
                if (user.data.userType == "client") {
                    setTimeout(() => { this.props.navigation.replace('clientTab') }, 5000);

                } else if (user.data.userType == "technician") {
                    setTimeout(() => { this.props.navigation.replace('technicianTab') }, 5000);

                } else {
                    AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
                    setTimeout(() => { this.props.navigation.replace('login') }, 5000);
                }
            }
            else {
                AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
                setTimeout(() => { this.props.navigation.replace('login') }, 5000);
                AsyncStorage.setItem("test","test");
            }
        }catch(e){
            alert(JSON.stringify(e));
        }
    }




    render() {
        return (
            <ImageBackground style={styles.ImageBg}>
                <Image source={images.logo} style={styles.logo} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.txt}>The Elite Mobile Salon & Spa</Text>
                    {/* <Text style={[styles.txt, { color: colors.SPA_redColor }]}>Elite</Text>
                    <Text style={styles.txt}> Mobile Salon & Spa</Text> */}
                </View>
            </ImageBackground>
        );
    }
}

export default Splash;

const styles = StyleSheet.create({
    ImageBg: {
        flex: 1,
        height: null,
        width: null,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        //marginTop: height(30),
        height: totalSize(20),
        width: totalSize(17),
        //marginBottom: height(3),
    },
    txt: {
        marginTop: height(2.5),
        fontSize: totalSize(2),
        color: 'black'
        //color: 'rgb(219,0,0)'
    }
})