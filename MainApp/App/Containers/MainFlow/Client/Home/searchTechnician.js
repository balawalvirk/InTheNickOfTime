import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Picker, ActivityIndicator, Alert } from 'react-native';
import { height, width, totalSize } from 'react-native-dimension'
import { Icon } from 'react-native-elements'
//import store from '../../../Stores/orderStore';
import Toast from 'react-native-simple-toast';
import colors from '../../../../Themes/Colors';
import firebase from 'firebase';
import Loader from '../../../../Components/Loader';
import SearchTechConstraints from './../../../../Validations/SearchTechConstraints';
import validate from 'validate.js';
import { connectFirebase, saveDate, getAllOfCollection} from "../../../../backend/firebase/utility";

//import api from '../../../lib/api'
class SearchTechnician extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service: '',
            showServicesList: false,
            showCategoryList: false,
            showStates: false,
            showLocations: false,
            Services_list: [
                { id: 1, service_name: 'Hand massage', service_code: '025012', service_duration: '30', service_price: 50, description: 'we will provide you the full tension free service...we will provide you the full tension free service..we will provide you the full tension free service' },
                { id: 2, service_name: 'Face Cleaning', service_code: '025012', service_duration: '30', service_price: 50, description: 'we will provide you the full tension free service' },
                { id: 3, service_name: 'Hair Diy', service_code: '025012', service_duration: '30', service_price: 50, description: 'we will provide you the full tension free service..we will provide you the full tension free service' },
                { id: 4, service_name: 'Hand massage', service_code: '025012', service_duration: '30', service_price: 50, description: 'we will provide you the full tension free service.we will provide you the full tension free service.we will provide you the full tension free service' },
                { id: 5, service_name: 'Face Cleaning', service_code: '025012', service_duration: '30', service_price: 50, description: 'we will provide you the full tension free service' },
                { id: 6, service_name: 'Hair Diy', service_code: '025012', service_duration: '30', service_price: 50, description: 'we will provide you the full tension free service' },
            ],
            location: '',
            locations: [
                { id: 1, location: 'Sea site, New york, USA', travel_cost: 20 },
                { id: 2, location: 'Top Valley, New york, USA', travel_cost: 25 },
                { id: 3, location: 'Down Town, New york, USA', travel_cost: 45 },
                { id: 4, location: 'Sea site, New york, USA', travel_cost: 30 }
            ],
            Categories_list: [
                
            ],
            states_list: [
               
            ]
        };
    }

    static navigationOptions = {
        title: 'Search',
    }

    async componentDidMount() {
        connectFirebase();
        // this.fetchOrders();
        this.props.navigation.addListener("willFocus", () => {
            this.setState({ isDataLoad: false });
            this.fetchOrders();
        });
    }

    async fetchOrders() {
        let LocationList = await getAllOfCollection("Location");
        this.setState({states_list: LocationList});
        let CategoriesList = await getAllOfCollection("Category");
        this.setState({Categories_list: CategoriesList}); 
    }


    compare = (respServices, respLocations, serviceToMatch, locationToMatch) => {

        let final = []
        let userIDSet = new Set()
        respServices.forEach(function (data) {
            if (data.data()['services'].includes(serviceToMatch) &&
                data.data()['travel_locations'].includes(locationToMatch)){
                    userIDSet.add(data.data()['UserId'])
                    final.push(data.data())
            }
        })
        respLocations.forEach(function (data) {
            if (data.data()['services'].includes(serviceToMatch) &&
                data.data()['travel_locations'].includes(locationToMatch)&&
                !userIDSet.has(data.data()['UserId'])){
                    final.push(data.data())
            }
        })
        return final
    }

    searchTechnicians = async () => {
        try {

            jsonObject = {
                service: this.state.service,
                location: this.state.location,
            }
            
            let err = validate(jsonObject, SearchTechConstraints, { format: 'flat' });
            if (err) {
                Alert.alert('Error!', err.join('\n'), [{ text: 'OK', onPress: () => { } }]);
            } else {
                this.loader.show();
                let respServices = await firebase.firestore().collection("Technician").where("services", "array-contains", this.state.service).get()
                let respTravelLocations = await firebase.firestore().collection("Technician").where("travel_locations", "array-contains", this.state.location).get()
                let technicians = this.compare(respServices,respTravelLocations,this.state.service,this.state.location)
                this.loader.hide()
                this.props.navigation.navigate('techniciansList', { data: technicians})
            }

        } catch (e) {
            console.log(e);
            Alert.alert('Failure', JSON.stringify(e), [{ text: 'OK', onPress: () => { } }]);
        } finally {
            this.loader.hide();
        }
    }



    render() {
        return (
            <View style={styles.container}>

                <Loader ref={r => this.loader = r} />
                <ScrollView>
                    <View style={styles.lowerContainer}>
                        <View style={{ flex: 1, width: width(95), alignItems: 'center', }}>
                            <View style={styles.txtContainer}>
                                <Text style={[styles.welcome, { fontSize: totalSize(3), fontWeight: 'normal' }]}>I'm looking for a Technician</Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(3), fontWeight: 'normal' }]}>for</Text>
                            </View>
                            <View style={styles.schoolInputContainer}>
                                <Icon name='search' color={colors.SPA_graycolor} size={totalSize(4)} />
                                <TextInput
                                    //onChangeText={(value) => this.getSchool_predictions(value)}
                                    onChangeText={async (text) => await this.setState({ service: text })}
                                    placeholder={'Enter Service'}
                                    placeholderTextColor='rgb(217,217,217)'
                                    value={this.state.service}
                                    //placeholderTextColor='gray'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                    onFocus={() => this.setState({ showCategoryList: !this.state.showCategoryList })}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', width: width(90) }}>
                                {
                                    this.state.showCategoryList ?
                                        <View style={{ width: width(30), backgroundColor: 'white', elevation: 5 }}>
                                            <ScrollView>
                                                {
                                                    this.state.Categories_list.map((item, key) => {
                                                        return (
                                                            <TouchableOpacity key={key} style={{ marginHorizontal: 5, borderBottomWidth: 0.4, borderColor: 'gray', elevation: 0 }}
                                                                onPress={() => {
                                                                    this.setState({ showServicesList: !this.state.showServicesList,ServicesIndex: key, ServiceId: item.id  })
                                                                }}
                                                            >
                                                                <View style={{ marginVertical: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                    <Text style={{ fontSize: totalSize(2), color: 'black', marginVertical: 3, fontWeight: 'bold' }}>{item.Name}</Text>
                                                                    {/* <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Price: {item.service_price} $</Text>
                                                                <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Duration: {item.service_duration} min</Text>
                                                                <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Description: {item.description}</Text> */}
                                                                </View>

                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                }
                                            </ScrollView>
                                        </View>
                                        :
                                        null
                                }
                                {
                                    this.state.showServicesList ?
                                        <View style={{ width: width(40), backgroundColor: 'white', elevation: 5 }}>
                                            <ScrollView>
                                                {
                                                    this.state.Categories_list[this.state.ServicesIndex].SubList !== undefined &&
                                                    this.state.Categories_list[this.state.ServicesIndex].SubList.length > 0 ?
                                                    this.state.Categories_list[this.state.ServicesIndex].SubList.map((item, key) => {
                                                        return (
                                                            <TouchableOpacity key={key} style={{ marginHorizontal: 5, borderBottomWidth: 0.4, borderColor: 'gray', elevation: 0 }}
                                                                onPress={() => {
                                                                    this.setState({
                                                                        service: item.Name, 
                                                                        showServicesList: false,
                                                                        showCategoryList: false
                                                                    })
                                                                }}
                                                            >
                                                                <View style={{ marginVertical: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                    <Text style={{ fontSize: totalSize(2), color: 'black', marginVertical: 3, fontWeight: 'normal' }}>{item.Name}</Text>
                                                                    {/* <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Price: {item.service_price} $</Text>
                                                                <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Duration: {item.service_duration} min</Text>
                                                                <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Description: {item.description}</Text> */}
                                                                </View>
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                    : null
                                                }
                                            </ScrollView>
                                        </View>
                                        :
                                        null
                                }
                            </View>

                            <View>
                                <View style={styles.txtContainer}>
                                    <Text style={[styles.welcome, { fontSize: totalSize(3), fontWeight: 'normal' }]}>in</Text>
                                </View>
                                <View style={styles.schoolInputContainer}>
                                    <Icon name='location-pin' color={colors.SPA_graycolor} size={totalSize(4)} type='entypo' />
                                    <TextInput
                                        //onFocus={() => this.getProfessors_predictions()}
                                        //onChangeText={(value) => this.getProfessors_predictions()}
                                        onChangeText={async (text) => await this.setState({ location: text })}
                                        placeholder={'Enter Location'}
                                        value={this.state.location}
                                        placeholderTextColor='rgb(217,217,217)'
                                        underlineColorAndroid='transparent'
                                        style={styles.TxtInput}
                                        onFocus={() => this.setState({ showStates: !this.state.showStates })}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', width: width(90) }}>{
                                this.state.showStates ?
                                    <View style={{ width: width(30), backgroundColor: 'white', elevation: 5 }}>
                                        <ScrollView>{
                                            this.state.states_list.map((item, key) => {
                                                return (
                                                    <TouchableOpacity key={key} style={{ marginHorizontal: 5, borderBottomWidth: 0.4, borderColor: 'gray', elevation: 0 }}
                                                        onPress={() => {
                                                            this.setState({ showLocations: !this.state.showLocations,LocationIndex: key })
                                                        }}
                                                    >
                                                        <View style={{ marginVertical: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                            <Text style={{ fontSize: totalSize(2), color: 'black', marginVertical: 3, fontWeight: 'bold' }}>{item.Name}</Text>
                                                            {/* <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Price: {item.service_price} $</Text>
                                                                <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Duration: {item.service_duration} min</Text>
                                                                <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Description: {item.description}</Text> */}
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                        </ScrollView>
                                    </View>
                                    :
                                    null
                            }
                                {
                                    this.state.showLocations ?
                                        <View style={{ width: width(40), backgroundColor: 'white', elevation: 5 }}>
                                            <ScrollView>
                                                {
                                                     this.state.states_list[this.state.LocationIndex].SubList !== undefined &&
                                                     this.state.states_list[this.state.LocationIndex].SubList.length > 0 ?
                                                     this.state.states_list[this.state.LocationIndex].SubList.map((item, key) => {
                                                        return (
                                                            <TouchableOpacity key={key} style={{ marginHorizontal: 5, borderBottomWidth: 0.4, borderColor: 'gray', elevation: 0 }}
                                                                onPress={() => {
                                                                    this.setState({
                                                                        location: item.Name,
                                                                        showLocations: false,
                                                                        showStates: false
                                                                    })
                                                                }}
                                                            >
                                                                <View style={{ marginVertical: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                    <Text style={{ fontSize: totalSize(2), color: 'black', marginVertical: 3, fontWeight: 'normal' }}>{item.Name}</Text>
                                                                    {/* <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Price: {item.service_price} $</Text>
                                                                <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Duration: {item.service_duration} min</Text>
                                                                <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Description: {item.description}</Text> */}
                                                                </View>
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                    :null
                                                }
                                            </ScrollView>
                                        </View>
                                        :
                                        null
                                }
                            </View>
                            <View style={styles.btnContainer}>

                                <TouchableOpacity style={styles.button} onPress={() => { this.searchTechnicians() }}>
                                    <View style={styles.btnTxtContainer}>
                                        {
                                            this.state.loading_getProfessors_by_departmet === true ?
                                                <ActivityIndicator color='white' />
                                                :
                                                <Text style={styles.btnTxt}>Search</Text>
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default SearchTechnician;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: null,
        // height: null,
        //justifyContent: 'center',
        //alignItems: 'center',
        //backgroundColor: 'rgb(66,67,69)'

    },
    TxtInput: {
        width: width(80),
        height: height(8),
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'red',
        fontSize: totalSize(2.5),
        //color: 'rgb(217,217,217)'
        //marginVertical:height(2),
        //borderRadius: 25,
    },
    lowerContainer: {
        flex: 1,
        //width: width(100),
        //height: null,
        //justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'red'
        //backgroundColor: 'rgb(217,217,217)'
        // backgroundColor: 'rgb(0,173,238)'
        //backgroundColor:'rgb(180,210,53)'
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
    schoolInputContainer: {
        flexDirection: 'row',
        width: width(90),
        height: height(8),
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'rgb(180,210,53)',
        //backgroundColor: 'rgb(0,173,238)',
        backgroundColor: 'white',
        //marginBottom: height(1),
        elevation: 10,
        borderRadius: 5
    },
    button: {
        width: width(90),
        height: height(8),
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'rgb(180,210,53)',
        //backgroundColor: 'rgb(0,173,238)',
        backgroundColor: colors.SPA_redColor,
        marginVertical: height(8),
        elevation: 5,
        borderRadius: 5

    },
    buttonSmall: {
        width: width(20),
        height: height(4),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(66,67,69)',
        //marginVertical: height(1),
        borderRadius: 25
    },
    PickerStyle: {
        width: width(75),
        height: height(8),
        //alignItems: 'center',
        //justifyContent: 'center',
        //backgroundColor: 'white',
        //fontSize: totalSize(2.5),
        color: 'rgb(66,67,69)'
        //marginVertical:height(2),
        //borderRadius: 25,
    },
});
