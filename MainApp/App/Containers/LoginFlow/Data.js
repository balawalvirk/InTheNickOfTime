import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Image, Alert } from 'react-native';
import { height, width, totalSize } from 'react-native-dimension'
import { Icon } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import images from '../../Themes/Images';
import uuid from 'uuid';
import { connectFirebase } from '../../backend/firebase/utility';
import { signUp , signUp2} from '../../backend/firebase/auth_new';
import Loader from "../../Components/Loader"
import SignUpConstraints from '../../Validations/SignUpConstraints';
import validate from 'validate.js'
import colors from '../../Themes/Colors';
import  GlobalConst from "../../config/GlobalConst";
class Data extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            first_name: '',
            last_name: '',
            email: '',
            Profession: "",
            Address: "",
            LNumber: "",
            LNumber2: "",
            LNumber3: "",
            phoneNumber: '',
            Description: "",
            loading: false,
            camera: false,
            avatarSource: null,
            image: null,
        });

        this.image_picker = this.image_picker.bind(this);
        this.register = this.register.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        connectFirebase();
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
    uniqueID() {
        function chr4() {
            return Math.random().toString(16).slice(-4);
        }
        return chr4() + chr4() +
            '-' + chr4() +
            '-' + chr4() +
            '-' + chr4() +
            '-' + chr4() + chr4() + chr4();
    }
    async register() {
        
        if(
            this.state.first_name!== '' &&
            this.state.last_name!== ''&&
            this.state.email!== ''&&
            this.state.Profession!== ""&&
            this.state.Address!== ""&&
            this.state.LNumber!== ""&&
            this.state.phoneNumber!== ''
        ) {
       
            let id= this.uniqueID();
            jsonObect = {
                id:id,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                name: this.state.first_name + ' ' + this.state.last_name,
                email: this.state.email,
                photo: null,
                phoneNumber: this.state.phoneNumber || null,
                userType: 'technician',
                Address: this.state.Address,
                Profession: this.state.Profession,
                LicenceNumber: this.state.LNumber,
                LicenceNumber1: this.state.LNumber2,
                LicenceNumber2: this.state.LNumber3,
                Description: this.state.Description,
                avatarSource: this.state.avatarSource,
                weekly_availability: [],
                travel_locations: [],
                services: [],
                service_details: '',
                ratings: '',
                locations_details: '',
                description: '',
                daily_availability: '',
                notification: []
            }
            console.log(jsonObect);
            await signUp2(jsonObect);
            GlobalConst.UserId= id;
            this.props.selectedData();
        } else {
            alert("Please Fill All Required Fields")
        }
    }

    async onChange(text, fieldValue) {
        await this.setState({ fieldValue: text });
    }
    async MoveNext() {
        this.register();
       // this.props.selectedData();
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
                                <Text style={[styles.welcome, { fontSize: totalSize(4) }]}>Let’s Get Started!</Text>
                            </View>
                            
                            <View style={styles.InputContainer}>
                                <Icon name='person' color='rgb(66,67,69)' size={totalSize(3)} />
                                <TextInput
                                    //onChangeText={(value) => this.getSchool_predictions(value)}
                                    placeholder='First Name'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                    value={this.state.first_name}
                                    onChangeText={(text) => this.setState({ first_name: text })}
                                />
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='person' color='rgb(66,67,69)' size={totalSize(3)} />
                                <TextInput
                                    //onChangeText={(value) => this.getSchool_predictions(value)}
                                    placeholder='Last Name'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                    value={this.state.last_name}
                                    onChangeText={(text) => this.setState({ last_name: text })}
                                />
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='email' color='rgb(66,67,69)' size={totalSize(3)} />
                                <TextInput
                                    //onChangeText={(value) => this.getSchool_predictions(value)}
                                    placeholder='Email'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                    value={this.state.email}
                                    onChangeText={(text) => this.setState({ email: text })}
                                />
                            </View>
                           
                            <View style={styles.InputContainer}>
                                <Icon name='phone' color='rgb(66,67,69)' size={totalSize(3)} />
                                <TextInput
                                    onChangeText={(value) => this.setState({ phoneNumber: value })}
                                    placeholder="Phone Number"
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                    keyboardType={'number-pad'}
                                />
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='person' color='rgb(66,67,69)' size={totalSize(3)} />
                                <TextInput
                                    //onChangeText={(value) => this.getSchool_predictions(value)}
                                    placeholder='Address'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                    value={this.state.Address}
                                    onChangeText={(text) => this.setState({ Address: text })}
                                />
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='person' color='rgb(66,67,69)' size={totalSize(3)} />
                                <TextInput
                                    //onChangeText={(value) => this.getSchool_predictions(value)}
                                    placeholder='Profession'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                    value={this.state.Profession}
                                    onChangeText={(text) => this.setState({ Profession: text })}
                                />
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='person' color='rgb(66,67,69)' size={totalSize(3)} />
                                <TextInput
                                    //onChangeText={(value) => this.getSchool_predictions(value)}
                                    placeholder='Professional License Number 1'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                    value={this.state.LNumber}
                                    onChangeText={(text) => this.setState({ LNumber: text })}
                                />
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='person' color='rgb(66,67,69)' size={totalSize(3)} />
                                <TextInput
                                    //onChangeText={(value) => this.getSchool_predictions(value)}
                                    placeholder='Professional License Number 2'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                    value={this.state.LNumber2}
                                    onChangeText={(text) => this.setState({ LNumber2: text })}
                                />
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='person' color='rgb(66,67,69)' size={totalSize(3)} />
                                <TextInput
                                    //onChangeText={(value) => this.getSchool_predictions(value)}
                                    placeholder='Professional License Number 3'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                    value={this.state.LNumber3}
                                    onChangeText={(text) => this.setState({ LNumber3: text })}
                                />
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='person' color='rgb(66,67,69)' size={totalSize(3)} />
                                <TextInput
                                    //onChangeText={(value) => this.getSchool_predictions(value)}
                                    placeholder='Something Unique About You'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                    value={this.state.Description}
                                    onChangeText={(text) => this.setState({ Description: text })}
                                />
                            </View>
                            <View style={[styles.txtContainer, { flexDirection: 'row', width: width(80), height: height(8), justifyContent: 'flex-start', backgroundColor: 'transparent', marginVertical: 0 }]}>
                                <TouchableOpacity style={[styles.buttonSmall, { backgroundColor: colors.SPA_redColor}]} onPress={() => this.image_picker()} >
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

                                <TouchableOpacity style={styles.button} onPress={() => this.MoveNext()}>
                                    {
                                        this.state.loading === true ?
                                            <ActivityIndicator size={'small'} color='white' />
                                            :
                                            <View style={styles.btnTxtContainer}>
                                                <Text style={styles.btnTxt}>Next</Text>
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

export default Data;


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
        marginVertical: height(3),
        elevation: 5,
        borderRadius: 5,

    },
    buttonSmall: {
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
