import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import { height, width, totalSize } from 'react-native-dimension'
import { Icon, Overlay } from 'react-native-elements'
import Toast from 'react-native-simple-toast'
import store from '../../../../Stores/orderStore';
import images from '../../../../Themes/Images';
import colors from '../../../../Themes/Colors';
//import Modal from 'react-native-modal';
//import api from '../../lib/api'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisibleLogout: false,
            loading: false
        };
    }
    _toggleModalLogout = () =>
        this.setState({ isModalVisibleLogout: !this.state.isModalVisibleLogout });
    // logOut = () => {
    //     store.USER_LOGIN = {}
    //     this._toggleModalLogout()
    //     this.props.navigation.navigate('login')
    // }

    log_out = async () => {
        this.props.navigation.push('login')
        this._toggleModalLogout()
    }
    componentDidMount() {
        //console.warn('Email is===>',store.RESPONSE)
    }
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <ImageBackground source={images.HomeBG} style={styles.container}>
                <View style={{ flex: 0.1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: 'transparent' }}>
                        <View style={{ width: 20 }}></View>
                        <Icon name='bell' color={colors.SPA_redColor} type='octicon' size={totalSize(4)} onPress={() => this.props.navigation.navigate('notificationClient')} />
                    </View>
                </View>
                <ImageBackground style={styles.lowerContainer}>
                    <View style={styles.txtContainer}>
                        <View style={styles.btnTxtContainer}>
                            <Text style={styles.welcome}>THE ELITE MOBILE</Text>
                            {/* <Text style={[styles.welcome, { color: 'rgb(219,0,0)' }]}>ELITE</Text>
                            <Text style={styles.welcome}> MOBILE</Text> */}
                        </View>
                        <Text style={styles.welcome}> SALON & SPA</Text>
                    </View>
                    <View style={{marginBottom: 100, ...styles.txtContainer}}>
                        <Text style={[styles.welcome, { fontSize: totalSize(2), fontWeight: 'normal' }]}>BOOK BEAUTY & WELLNESS PROFESSIONALS</Text>
                        <Text style={[styles.welcome, { fontSize: totalSize(2), fontWeight: 'normal' }]}> TO COME TO YOU!</Text>
                    </View>
                    <View style={{marginTop: 100, ...styles.btnContainer}}>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('searchTechnician')}>
                            <View style={styles.btnTxtContainer}>
                                <Text style={[styles.btnTxt, { fontWeight: 'bold', fontSize: totalSize(3) }]}>Book Now!</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

            </ImageBackground>
        );
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        //justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'rgb(66,67,69)',
        backgroundColor: 'rgb(219,0,0)'

    },
    searchContainer: {
        width: width(70),
        height: height(6),
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        marginVertical: height(1),
        borderRadius: 25,
        flexDirection: 'row'
    },
    TxtInput: {
        width: width(65),
        height: height(8),
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'white',
        fontSize: totalSize(2.5),
        color: 'rgb(217,217,217)'
        //marginVertical:height(2),
        //borderRadius: 25,
    },
    lowerContainer: {
        flex: 1,
        width: width(100),
        //height: null,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'rgb(0,173,238)'
        //backgroundColor:'rgb(180,210,53)'
        //backgroundColor:'rgb(217,217,217)'
        //backgroundColor: 'rgb(245,245,238)',

    },
    txtContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: height(-5),
        
    },
    welcome: {
        fontSize: totalSize(4),
        //textAlign: 'center',
        //margin: 10,
        //color: 'white',
        color: '#fff',
        fontWeight: 'bold',
        //opacity: 0.6
    },
    instructions: {
        fontSize: totalSize(2),
        textAlign: 'center',
        color: 'rgb(217,217,217)',
        marginBottom: 5,
    },
    btnTxtContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTxt: {
        fontSize: totalSize(2.5),
        color: 'white',
        fontWeight: 'normal'
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 50,
        borderRightWidth: 50,
        borderBottomWidth: 100,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'red',
        position: 'absolute'
    },
    triangleDown: {
        width: width(1),
        height: height(2),
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 4,
        borderRightWidth: 3,
        borderBottomWidth: 6,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'rgb(180,210,53)',
        transform: [
            { rotate: '180deg' }
        ],
        bottom: height(0.1)
    },
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        width: width(60),
        height: height(15),
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'rgb(180,210,53)',
        backgroundColor: 'rgb(219,0,0)',
        marginVertical: height(1),
        elevation: 20,
        borderRadius: 5,
    }
});
