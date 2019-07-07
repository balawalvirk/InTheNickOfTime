import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity, TextInput, ImageBackground, StyleSheet, Dimensions, AsyncStorage, Alert } from 'react-native';
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
import { updateProfile } from './../../../../backend/firebase/auth_new';
import EditProfileConstraints from './../../../../Validations/EditProfileConstraints';
import validate from 'validate.js';
import Loader from "./../../../../Components/Loader";

class EditProfileClient extends Component {
    
    static navigationOptions = {
        title: 'Edit Profile',
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            name: '',
            email: '',
            photo: null,
            password: '',
            image: null,
            avatarSource: null,
            camera: false,
            id: null
        };
    }

    loadUser = () => {
        AsyncStorage.getItem('user', (error, data) => {
          if (data) {
            user = JSON.parse(data)
            console.log(user);
            let img = null;
            if (user.photo != null) {
              img = {uri: user.photo}
            } else {
              img = images.profilePic
            }
            this.setState({
              id: user.id,
              name: user.name,
              email: user.email,
              photo: img
            })
          }
        })
      }

    componentDidMount() {
        this.loadUser();
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

    saveLogin = (obj) => {
        //user = JSON.parse(obj)
        //console.log(user);
        
        AsyncStorage.setItem('user',JSON.stringify(obj.data));
        AsyncStorage.setItem('user_detail',JSON.stringify(obj));
    }

    editeProfile = async () => {
        try {
            
            jsonObect = {
              id: this.state.id,
              name: this.state.name,
              userType: 'client',
              avatarSource: this.state.avatarSource,
            }

            let err = validate(jsonObect, EditProfileConstraints, {format: 'flat'});
            if (err) {
                // this.loader.hide();
                Alert.alert('Error!', err.join('\n'), [ {text: 'OK', onPress: () => {}} ] );
            } else {
                this.loader.show();
                // let url = await uploadImage(this.state.avatarSource.uri)
                    // .then(url => this.setState({ image: url }))
                    // .catch(error => console.log(error))
                // jsonObect['photo'] = url;
                let success = await updateProfile(jsonObect);
                if (success != false) {
                    this.saveLogin(success);
                    this.props.navigation.goBack();
                }
            }

        } catch (e) {
            console.log(e);
            Alert.alert('Failure', 'Profile could not be updated. Please try again.', [{ text: 'OK', onPress: () => { } }]);
        } finally {
            this.loader.hide();
        }
        
    }

    render() {
        //console.warn('image===>',store.USER_LOGIN.profile_pic);
        return (

            <View style={styles.Container}>

                <Loader ref={r => this.loader = r} />

                <View style={[styles.pfContainer,{marginVertical:height(5)}]}>
                    <Image source={this.state.photo} style={styles.profileImage} />
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
                        value={this.state.name}
                        placeholderTextColor='rgb(183,179,179)'
                        style={styles.input}
                        onChangeText={(text) => this.setState({ name: text })}
                    />
                </View>
                <View style={styles.txtContainer}>
                    <Text style={styles.formTxt}>Email Address</Text>
                    <TextInput
                        value={this.state.email}
                        placeholder='example@example.com'
                        placeholderTextColor='rgb(183,179,179)'
                        style={styles.input}
                        editable = {false}
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
                    <TouchableOpacity style={styles.btn} onPress={this.editeProfile}>
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

export default EditProfileClient;


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