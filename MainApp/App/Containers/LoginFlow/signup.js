import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Image, Alert } from 'react-native';
import { height, width, totalSize } from 'react-native-dimension'
import { Icon } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import images from '../../Themes/Images';
import colors from '../../Themes/Colors';
import { signUp } from './../../backend/firebase/auth';
import Loader from "../../Components/Loader";


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school_pridictions: [],
            loading_getSchools: false,
            isModalVisible: false,
            school_id: '',
            school: 'SCHOOL',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: '',
            loading: false,
            camera: false,
            avatarSource: null,
            image: null,


        };
    }

    static navigationOptions = {
        header: null
    }


    async register() {
        const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        try {
            if (this.state.email === "" || this.state.password === "" || this.state.name === "" || this.state.confirm_password === "" || this.state.email === null || this.state.password === null || this.state.name === null || this.state.confirm_password === "") {
                Toast.show("Some fields are missing", Toast.LONG);
                return;
            }
            if (this.state.password != this.state.confirm_password) {
                Toast.show('Passwords do not match.', Toast.SHORT);
                return;
            }
            if (email.test(this.state.email) == false) {
                Toast.show("Invalid Email Entered")
                return;
            }
            this.loader.show()
            await signUp(this.state.email, this.state.password, this.state.name, '', '', 'client','');
            this.loader.hide()
            Alert.alert('Success', 'User signed up successfully.', [{ text: 'OK', onPress: () => { this.props.navigation.navigate('login') } }]);

        } catch (e) {
            console.log(e);
            this.loader.hide()
            Alert.alert('Failure', 'Failed to sign up. Please try again.', [{ text: 'OK', onPress: () => { } }]);
        } finally {

        }
    }

    image_picker = () => {
        const options = {
            title: 'Select Avatar',
            // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, func = async (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                //   console.log('User cancelled image picker');
            } else if (response.error) {
                //   console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //   console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                // await this.setState({ image: source })
                // You can also display the image using data:
                //const image = { uri: response.uri, width: response.width, height: response.height }
                //const avatar = { uri: response.uri, type: response.type, name: response.fileName }
                //this.state.Images.push(image);
                //this.state.simpleImages.push(avatar);
                await this.setState({
                    camera: true,
                    avatarSource: { uri: response.uri, type: response.type, name: response.fileName },
                    image: { uri: response.uri, width: response.width, height: response.height }
                });

            }
        });
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
                                <Text style={[styles.welcome, { fontSize: totalSize(4) }]}>Sign Up</Text>
                            </View>
                            <View style={[styles.txtContainer, { flexDirection: 'row' }]}>
                                <Text style={[styles.welcome, { fontSize: totalSize(1.5), fontWeight: 'normal' }]}>ALREADY HAVE AN ACCOUNT? </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('login')}>
                                    <Text style={[styles.welcome, { fontSize: totalSize(1.5), color: 'rgb(219,0,0)', fontWeight: 'normal' }]}>LOGIN!</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='person' color='rgb(66,67,69)' size={totalSize(3)} />
                                <TextInput
                                    onChangeText={(value) => this.setState({ name: value })}
                                    placeholder='Full Name'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                />
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='email' color='rgb(66,67,69)' size={totalSize(3)} />
                                <TextInput
                                    onChangeText={(value) => this.setState({ email: value })}
                                    placeholder='Email'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                />
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='lock' color='rgb(66,67,69)' size={totalSize(3)} />
                                <TextInput
                                    onChangeText={(value) => this.setState({ password: value })}
                                    placeholder='Password'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    secureTextEntry={true}
                                    style={[styles.TxtInput, { width: width(66) }]}
                                />
                                <TouchableOpacity>
                                    <Icon name='eye' color='rgb(217,217,217)' size={totalSize(2)} type='font-awesome' />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='lock' color='rgb(66,67,69)' size={totalSize(3)} />
                                <TextInput
                                    onChangeText={(value) => this.setState({ confirm_password: value })}
                                    placeholder='Confirm Password'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    secureTextEntry={true}
                                    style={[styles.TxtInput, { width: width(66) }]}
                                />
                                <TouchableOpacity>
                                    <Icon name='eye' color='rgb(217,217,217)' size={totalSize(2)} type='font-awesome' />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.txtContainer, { flexDirection: 'row', width: width(80), height: height(8), justifyContent: 'flex-start', backgroundColor: 'transparent', marginVertical: 0 }]}>
                                <TouchableOpacity style={[styles.buttonSmall, { backgroundColor: colors.SPA_redColor }]} onPress={() => this.image_picker()} >
                                    <Text style={[styles.welcome, { fontSize: totalSize(1), color: 'white', marginHorizontal: 5, marginVertical: 4 }]}>Upload Image</Text>
                                </TouchableOpacity>
                                <View style={{ width: width(2) }}></View>
                                {
                                    this.state.image === null ?
                                        <Text style={[styles.instructions, { fontSize: totalSize(1), color: 'rgb(217,217,217)' }]}>No file selected</Text>
                                        :
                                        <Image source={this.state.image} style={{ height: totalSize(5), width: totalSize(5) }} />
                                }
                            </View>
                            <View style={styles.btnContainer}>

                                <TouchableOpacity style={styles.button} onPress={() => this.register()}>
                                    {
                                        this.state.loading === true ?
                                            <ActivityIndicator size={'small'} color='white' />
                                            :
                                            <View style={styles.btnTxtContainer}>
                                                <Text style={styles.btnTxt}>Signup</Text>
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

export default SignUp;


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
        alignItems: 'center',
        justifyContent: 'center',
        //marginVertical: height(3)
        marginVertical: height(1),
    },
    welcome: {
        fontSize: totalSize(5),
        //textAlign: 'center',
        //margin: 10,
        color: 'rgb(66,67,69)',
        fontWeight: 'bold',
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
        marginVertical: height(5),
        elevation: 5,
        borderRadius: 5,

    },
    buttonSmall: {
        //width: width(15),
        //height: height(3),
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
