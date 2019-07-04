import React, { Component } from 'react';
import { View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput, 
    ActivityIndicator, 
    ScrollView, 
    Image, 
    Alert,
    AsyncStorage } from 'react-native';
import { height, width, totalSize } from 'react-native-dimension'
import { Icon, Overlay, CheckBox } from 'react-native-elements'
//import store from '../../Stores/orderStore'
//import api from '../../lib/api'
import Toast from 'react-native-simple-toast'
import Modal from 'react-native-modal'
import images from '../../Themes/Images';
import colors from '../../Themes/Colors'
import firebase from 'firebase';
import Loader from "../../Components/Loader";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',//'virk@gmail.com',
            password: '',//'12345',
            loading: false,
            overlayVisible: false,
            checked: true,
            userType: 'user',
            isModalVisibleForgetPassword: false,
            IsModalVisibleSelectSignUp: false
        };
    }



    static navigationOptions = {
        header: null
    }

    _toggleModalForgetPassword = () =>
        this.setState({ isModalVisibleForgetPassword: !this.state.isModalVisibleForgetPassword });

    _toggleModalSelectSignUp = () =>
        this.setState({ IsModalVisibleSelectSignUp: !this.state.IsModalVisibleSelectSignUp });

    manageOverlay = () => this.setState({ overlayVisible: !this.state.overlayVisible })

    goto_signup_Client = () => {
        this.props.navigation.navigate('signupClient')
        this._toggleModalSelectSignUp()
    }
    goto_signup_Technician = () => {
        this.props.navigation.navigate('signUpTechnician')
        this._toggleModalSelectSignUp()
    }

    saveLogin = (obj) => {
        //user = JSON.parse(obj)
        //console.log(user);
        
        AsyncStorage.setItem('user',JSON.stringify(obj))
    }

    Login = async () => {
        let user = ""
        try {
            this.loader.show()
            let err = false
            let errMsg = ""
            
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
                console.log(error);
                if (error.code === 'auth/user-not-found') {
                    console.log("No user");
                    err = true;
                    errMsg = error.message
                    return;
                }
                if (error.code === 'auth/wrong-password') {
                    console.log("Wrong pass");
                    err = true;
                    errMsg = error.message
                    return;
                }
                if (error.code === 'auth/too-many-requests') {
                    console.log("Wrong pass");
                    errMsg = error.message
                    err = true;
                    return;
                }
                this.loader.hide()
            })

            if (err == false) {
                this.loader.show()
                if (this.state.checked == true) {
                    
                    firebase.firestore().collection("Users").where("email", "==", this.state.email).where("userType", "==", "client").get().then(resp => {
                        this.loader.hide()
                        console.log("res", resp.docs[0]._document.proto.fields);
                        resp.forEach(function(data){
                            user = data.data()   
                        })
                        
                        if (resp.size == 1) {
                            this.saveLogin(user)
                            Toast.show("Logged In", Toast.SHORT)
                            this.props.navigation.replace('clientTab')
                        }
                        else if (resp.size == 0) {

                            Toast.show("No Such Client")
                            return
                        }
                    })
                } else if (this.state.checked == false) {
                    firebase.firestore().collection("Users").where("email", "==", this.state.email).where("userType", "==", "technician").get().then(resp => {
                        this.loader.hide()
                        console.log("res", resp.docs[0]);
                        if (resp.size == 1) {
                            this.saveLogin(user)
                            Toast.show("Logged In", Toast.SHORT)
                            this.props.navigation.replace('technicianTab')
                        }
                        else if (resp.size == 0) {
                            Toast.show("No Such Technician")
                            return
                        }
                    })
                }
                else {
                    this.loader.hide()
                    Toast.show("Invalid Credentials Provided")
                }
            }else{
                this.loader.hide()
                Toast.show(errMsg)
            }
        } catch (e) {
            console.log(e);
            this.loader.hide()
            Alert.alert('Failure', 'Failed to sign in. Please try again.', [{ text: 'OK', onPress: () => { } }]);
        } finally {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Loader ref={r => this.loader = r} />
                <View style={styles.lowerContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ flex: 1, width: width(95), alignItems: 'center', backgroundColor: 'transparent', marginTop: height(5) }}>
                            <Image source={images.logo} style={styles.logo} />
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.txt}>The Elite Mobile Salon & Spa</Text>
                                {/* <Text style={[styles.txt, { color: colors.SPA_redColor }]}>Elite</Text>
                                <Text style={styles.txt}> Mobile Salon & Spa</Text> */}
                            </View>
                            <View style={[styles.txtContainer, {}]}>
                                <Text style={[styles.welcome, { fontSize: totalSize(4) }]}>Login</Text>
                            </View>
                            <View style={[styles.txtContainer, { flexDirection: 'row' }]}>
                                <Text style={[styles.welcome, { fontSize: totalSize(1.5), fontWeight: 'normal' }]}>DON'T HAVE AN ACCOUNT? </Text>
                                <TouchableOpacity onPress={() => this._toggleModalSelectSignUp()}>
                                    <Text style={[styles.welcome, { fontSize: totalSize(1.5), color: 'rgb(219,0,0)', fontWeight: 'normal' }]}>SIGN UP!</Text>
                                </TouchableOpacity>
                            </View>
                            {/* <Overlay
                                isVisible={this.state.overlayVisible}
                                // windowBackgroundColor="rgba(255, 255, 255, .5)"
                                // overlayBackgroundColor="white"
                                // width='80'
                                // height="30"
                                onBackdropPress={() => this.manageOverlay()}
                            //overlayStyle={{ alignItems: 'center', justifyContent: 'center' }}
                            >
                                <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0.5 }}>
                                    <Text style={[styles.welcome, { fontSize: totalSize(4) }]}>Register your</Text>
                                    <Text style={[styles.welcome, { fontSize: totalSize(4) }]}>New Account</Text>
                                </View>
                                <View style={{ flex: 2, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity style={[styles.button, { width: width(60), height: height(8), marginVertical: height(3), flexDirection: 'row' }]} onPress={() => this.goto_signup_Client()}>
                                        <Text style={[styles.welcome, { fontSize: totalSize(2), color: 'white', fontWeight: 'normal' }]}>signup as </Text>
                                        <Text style={[styles.welcome, { fontSize: totalSize(2.5), color: 'white' }]}>CLIENT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.button, { width: width(60), height: height(8), marginVertical: height(3), flexDirection: 'row' }]} onPress={() => this.goto_signup_Technician()}>
                                        <Text style={[styles.welcome, { fontSize: totalSize(2), color: 'white', fontWeight: 'normal' }]}>signup as </Text>
                                        <Text style={[styles.welcome, { fontSize: totalSize(2.5), color: 'white', }]}>TECHNICIAN</Text>
                                    </TouchableOpacity>
                                </View>
                            </Overlay> */}
                            <View style={styles.InputContainer}>
                                <Icon name='email' color='rgb(66,67,69)' size={totalSize(3)} />
                                <TextInput
                                    onChangeText={(value) => this.setState({ email: value })}
                                    placeholder='EMAIL'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                    value={this.state.email}
                                    onChangeText={(text) => this.setState({ email: text })}
                                />
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='lock' color='rgb(66,67,69)' size={totalSize(3)} />
                                <TextInput
                                    onChangeText={(value) => this.setState({ password: value })}
                                    placeholder='PASSWORD'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    secureTextEntry={true}
                                    style={styles.TxtInput}
                                    value={this.state.password}
                                    onChangeText={(text) => this.setState({ password: text })}
                                />
                            </View>
                            <View style={[styles.InputContainer, { backgroundColor: 'transparent', elevation: 0, justifyContent: 'flex-start', marginVertical: height(1) }]}>
                                <CheckBox
                                    title='Client'
                                    iconType='material-community'
                                    checkedIcon='checkbox-marked-circle'
                                    uncheckedIcon='checkbox-blank-circle-outline'
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                    textStyle={{ fontSize: totalSize(1.8), fontWeight: 'normal' }}
                                    size={totalSize(2.5)}
                                    checked={this.state.checked}
                                    checkedColor={colors.SPA_redColor}
                                    onPress={() => this.setState({
                                        checked: true,
                                        userType: 'user'
                                    })}
                                />
                                <CheckBox
                                    title='Technician'
                                    iconType='material-community'
                                    checkedIcon='checkbox-marked-circle'
                                    uncheckedIcon='checkbox-blank-circle-outline'
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                    textStyle={{ fontSize: totalSize(1.8), fontWeight: 'normal' }}
                                    size={totalSize(2.5)}
                                    checked={!this.state.checked}
                                    checkedColor={colors.SPA_redColor}
                                    onPress={() => this.setState({
                                        checked: false,
                                        userType: 'company'
                                    })}
                                />
                            </View>
                            <View style={[styles.InputContainer, { backgroundColor: 'transparent', elevation: 0, justifyContent: 'flex-end', marginVertical: 0 }]}>
                                <Text style={[styles.welcome, { fontSize: totalSize(1.5), color: colors.SPA_redColor }]} onPress={() => this._toggleModalForgetPassword()} >Forgot Password?</Text>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => this.Login()}>
                                    <View style={styles.btnTxtContainer}>
                                        {
                                            this.state.loading === true ?
                                                <ActivityIndicator size={'small'} color='white' />
                                                :
                                                <Text style={styles.btnTxt}>Login</Text>
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <Modal
                    isVisible={this.state.isModalVisibleForgetPassword} // Forget Password
                    animationIn='slideInUp'
                    animationOut='slideOutDown'
                    backdropColor='black'
                    animationInTiming={700}
                    animationOutTiming={700}
                    backdropOpacity={0.50}>
                    <View style={{ backgroundColor: 'white', height: height(35), width: width(95), alignSelf: 'center', borderRadius: 5 }}>
                        {
                            this.state.LoadingForgetPassword === true ?
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <ActivityIndicator color={colors.SPA_redColor} size={totalSize(5)} />
                                </View>
                                :
                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'transparent' }}>
                                        <TouchableOpacity onPress={this._toggleModalForgetPassword} style={{ backgroundColor: 'Transparent', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }}>
                                            <Icon
                                                name='close' color={colors.SPA_redColor} />
                                        </TouchableOpacity>
                                        <View style={{ width: 5 }}></View>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                        <Text style={[styles.welcome, { fontSize: totalSize(3) }]}>Forget Password</Text>
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                                        <TextInput
                                            onChangeText={(value) => this.setState({ email: value })}
                                            placeholder='Email Address'
                                            placeholderTextColor='gray'
                                            keyboardType={'email-address'}
                                            value={this.state.email}
                                            style={{ width: width(85), height: height(7), marginVertical: height(1), elevation: 5, borderRadius: 5, paddingLeft: width(4), backgroundColor: 'white', fontSize: totalSize(2) }}
                                        />
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                        <TouchableOpacity style={[styles.button, { height: height(6), width: width(40) }]}>
                                            <Text style={{ fontSize: totalSize(2), color: 'white' }}>Send</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        }
                    </View>
                </Modal>

                <Modal
                    isVisible={this.state.IsModalVisibleSelectSignUp} // Forget Password
                    animationIn='slideInUp'
                    animationOut='slideOutDown'
                    backdropColor='black'
                    animationInTiming={700}
                    animationOutTiming={700}
                    backdropOpacity={0.50}>
                    <View style={{ backgroundColor: 'white', height: height(35), width: width(95), alignSelf: 'center', borderRadius: 5 }}>
                        {
                            this.state.LoadingForgetPassword === true ?
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <ActivityIndicator color={colors.SPA_redColor} size={totalSize(5)} />
                                </View>
                                :
                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'transparent' }}>
                                        <TouchableOpacity onPress={this._toggleModalSelectSignUp} style={{ backgroundColor: 'Transparent', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }}>
                                            <Icon name='close' color={colors.SPA_redColor} />
                                        </TouchableOpacity>
                                        <View style={{ width: 5 }}></View>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                        <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>Register Your Account</Text>
                                        <Text style={[styles.welcome, { fontSize: totalSize(2) }]}>As</Text>
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                        {/* <TextInput
                                            onChangeText={(value) => this.setState({ email: value })}
                                            placeholder='Email Address'
                                            placeholderTextColor='gray'
                                            keyboardType={'email-address'}
                                            value={this.state.email}
                                            style={{ marginHorizontal: width(2.5), height: height(7), marginVertical: height(1), elevation: 5, borderRadius: 5, paddingLeft: width(4), backgroundColor:'white', fontSize: totalSize(2) }}
                                        /> */}
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transparent' }}>
                                            <Text style={[styles.welcome, { fontSize: totalSize(2.5), color: colors.SPA_redColor }]} onPress={() => this.goto_signup_Client()}>Client</Text>
                                        </View>
                                        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                            <Text style={[styles.welcome, { fontSize: totalSize(6) }]}>|</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', backgroundColor: 'transparent' }}>
                                            <Text style={[styles.welcome, { fontSize: totalSize(2.5), color: colors.SPA_redColor }]} onPress={() => this.goto_signup_Technician()}>Technician</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                        {/* <TouchableOpacity  style={[styles.button, { height: height(6), width: width(40) }]}>
                                            <Text style={{ fontSize: totalSize(2), color: 'white' }}>Send</Text>
                                        </TouchableOpacity> */}
                                    </View>
                                </View>
                        }
                    </View>
                </Modal>

            </View>
        );
    }
}

export default Login;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //width: null,
        //height: null,
        //justifyContent: 'center',
        //alignItems: 'center',
        //backgroundColor: 'rgb(66,67,69)'

    },
    txt: {
        marginTop: height(2.5),
        fontSize: totalSize(2),
        color: 'black'
        //color: 'rgb(219,0,0)'
    },
    logo: {
        //marginTop: height(2),
        height: totalSize(15),
        width: totalSize(12)
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
        // width: width(100),
        //height: null,
        //justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'rgb(245,245,238)',
        //backgroundColor: 'rgb(217,217,217)'
        // backgroundColor: 'rgb(0,173,238)'
        //backgroundColor:'rgb(180,210,53)'
        //marginTop: height(10)
    },
    txtContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        //marginVertical: height(3)
        marginVertical: height(2),
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
        fontSize: totalSize(2.5),
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
        //marginBottom: height(1),
        elevation: 5,
        borderRadius: 5,
        marginVertical: height(2),
        //borderWidth: 0.5,
        //borderColor: 'rgb(180,210,53)'
        borderColor: 'rgb(66,67,69)'

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


});
