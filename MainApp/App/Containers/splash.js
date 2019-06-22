import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
import { totalSize, width, height } from 'react-native-dimension'
import images from '../Themes/Images'
import colors from '../Themes/Colors';
class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        setTimeout(() => { this.props.navigation.replace('login') }, 5000);
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