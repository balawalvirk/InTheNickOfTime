import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity, TextInput, ImageBackground, StyleSheet, Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
//import styles from '../../Styles/editeProfileStyles'
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast'
//import store from '../../../Stores/orderStore';
import { Icon } from 'react-native-elements'
//import { observer } from 'mobx-react'
import colors from '../../../../Themes/Colors';
import { totalSize, width, height } from 'react-native-dimension';
import images from '../../../../Themes/Images';
import AsyncStorage from '@react-native-community/async-storage';
import { uploadAsFile, editProfilePic } from '../../../../backend/firebase/auth_new';
import { updateDocument } from '../../../../backend/firebase/utility';
import Loader from '../../../../Components/Loader'

class EditProfileTechnician extends Component {
    static navigationOptions = {
        title: 'Edit Profile',

    };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            name: 'Alina Shaw',
            Password: '',
            image: null,
            avatarSource: null,
            camera: false,
            user: {},

        };
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
                this.state.user.photo = response.uri;
                await this.setState({
                    camera: true,
                    avatarSource: { uri: response.uri, type: response.type, name: response.fileName },
                    image: { uri: response.uri, width: response.width, height: response.height }

                });




            }
        });
    }


    async componentDidMount() {
        this.loader.show()
        usr = await AsyncStorage.getItem('user')
        usr = JSON.parse(usr)
        this.setState({ user: usr })
        this.loader.hide()

    }


    editeProfile = async () => {
        this.loader.show()
        if (this.state.avatarSource != null) {
            await editProfilePic(this.state.avatarSource, { collection: "Technician", uid: this.state.user.id }).then((res) => {
                console.log(res);
                this.state.user.photo = res;
                this.setState({ avatarSource: null })

            })
        }
        updateDocument('Technician', this.state.user.id, this.state.user)
        tmpState = JSON.stringify(this.state.user)
        AsyncStorage.setItem('user', tmpState)
        this.loader.hide()
    }
    render() {
        //console.warn('image===>',store.USER_LOGIN.profile_pic);
        return (

            <View style={styles.Container}>
                <Loader ref={r => this.loader = r} />
                <View style={[styles.pfContainer, { marginVertical: height(5) }]}>

                    <Image source={this.state.user.photo ? { uri: this.state.user.photo } : images.profilePic} style={styles.profileImage} />
                    <TouchableOpacity onPress={this.image_picker}>
                        <Icon name='camera' type='entypo' color='gray' size={totalSize(4)} />
                    </TouchableOpacity>
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
                <View style={styles.txtContainer}>
                    <Text style={styles.formTxt}>Your Name</Text>
                    <TextInput
                        value={this.state.user.name}
                        placeholderTextColor='rgb(183,179,179)'
                        style={styles.input}
                        onChangeText={(value) => {
                            this.state.user.name = value
                            this.setState(this.state)


                        }}
                    />
                </View>
                <View style={styles.txtContainer}>
                    <Text style={styles.formTxt}>Email Address</Text>
                    <TextInput
                        editable={false}
                        placeholder={this.state.user.email}
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


                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn} onPress={() => { this.editeProfile() }}>
                        {
                            this.state.loading === true ?
                                <ActivityIndicator size='small' color='white' />
                                :
                                <Text style={styles.btnTxt}>Update Profile</Text>
                        }
                    </TouchableOpacity>
                </View>



            </View>


        );
    }
}

export default EditProfileTechnician;


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
        width: width(80),
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: height(5),
        backgroundColor: 'red'

    },
    txtContainer: {
        width: width(80),
        //alignItems: 'flex-start',
        marginTop: height(3),

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
        fontSize: totalSize(1.6),
        fontWeight: 'bold',
        marginBottom: height(0.5),
        alignSelf: 'flex-start',

    },
    formTxt2: {
        fontSize: totalSize(1.6),
        color: 'rgb(207,207,207)',
        //marginTop:height(1)


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
        width: width(80),
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