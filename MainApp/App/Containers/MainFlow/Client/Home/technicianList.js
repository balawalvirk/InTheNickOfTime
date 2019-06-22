import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import images from '../../../../Themes/Images';
import { width, height, totalSize } from 'react-native-dimension'
import { Icon } from 'react-native-elements'
import colors from '../../../../Themes/Colors';
class TechniciansList extends Component {
    constructor(props) {
        super(props);
        this.state = {

            Booking_list: [
                { id: 1, client_name: 'Lina', client_profile_pic: images.profilePic, service_name: 'Hand massage', service_code: '025012', Address: '18002 Sea Island olace, New York, USA', service_price: '50', dateTime: '8:00AM 06-15-19',Categories:['Care','NailCare','Facials','Hair'] },
                { id: 2, client_name: 'Salish', client_profile_pic: images.profilePic, service_name: 'Face Cleaning & Facial', Address: '18002 Sea Island olace, New York, USA', service_duration: '30', service_price: '50', dateTime: '8:00AM 06-15-19',Categories:['Care','NailCare','Facials','Hair'] },
                { id: 3, client_name: 'Hanana', client_profile_pic: images.profilePic, service_name: 'Hair Diy', Address: '18002 Sea Island olace, New York, USA', service_duration: '30', service_price: '50', dateTime: '8:00AM 06-15-19',Categories:['Care','NailCare','Facials','Hair'] },
                { id: 4, client_name: 'Hanana', client_profile_pic: images.profilePic, service_name: 'Hair Diy', Address: '18002 Sea Island olace, New York, USA', service_duration: '30', service_price: '50', dateTime: '8:00AM 06-15-19',Categories:['Care','NailCare','Facials','Hair']},
                { id: 5, client_name: 'Hanana', client_profile_pic: images.profilePic, service_name: 'Hair Diy', Address: '18002 Sea Island olace, New York, USA', service_duration: '30', service_price: '50', dateTime: '8:00AM 06-15-19',Categories:['Care','NailCare','Facials','Hair']},
            ]
        };
    }

    static navigationOptions = {
        title: 'Search Results',
    }
    render() {
        return (
            <View style={styles.Container}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.5, alignItems: 'flex-start', justifyContent: 'flex-end', }}>
                        <Text style={[styles.shopName, { color: colors.SPA_graycolor, fontSize: totalSize(3), left:width(5) }]}>Technicians</Text>
                    </View>

                    <View style={{ flex: 4, alignItems: 'center' }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}>
                            {
                               
                                    this.state.Booking_list.map((items, key) => {
                                        return (
                                            <TouchableOpacity key={key} style={styles.shopContainer} onPress={() => this.props.navigation.navigate('technicianDetailTab')}>
                                                <View style={styles.shopImageContainer}>
                                                    <Image source={items.client_profile_pic} style={styles.shopImage} />
                                                </View>
                                                <View style={styles.shopTxtContainer}>
                                                    <Text style={styles.shopName}>{items.client_name}</Text>
                                                    {/* <Text style={styles.shopDetail}>At {items.dateTime}</Text> */}
                                                    {/* <Text style={styles.shopDetail}>{items.Address}</Text> */}
                                                    <View style={{flexDirection:'row'}}>
                                                    {
                                                        items.Categories.map((item,key)=>{
                                                            return(
                                                                <Text key={key} style={styles.shopDetail}>{item}, </Text>
                                                            )
                                                        })
                                                    }

                                                    </View>
                                                </View>
                                                <View style={[styles.shopIconContainer, { backgroundColor: 'transparent', flexDirection: 'row' }]}>
                                                    {/* <TouchableOpacity style={[styles.iconContainer, { backgroundColor: colors.SPA_graycolor }]} >
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 4, marginHorizontal: 7, }}>
                                                            <Icon name="star" size={totalSize(2)} color="white" type='antdesign' />
                                                            <Text style={[styles.shopName, { color: 'white', fontSize: totalSize(3) }]}>4.9</Text>
                                                        </View>
                                                    </TouchableOpacity> */}
                                                    <Icon name="star" size={totalSize(3)} color={colors.SPA_redColor} type='antdesign' />
                                                    <Text style={[styles.shopName, { color: colors.SPA_redColor, fontSize: totalSize(4) }]}>4.9</Text>
                                                </View>
                                            </TouchableOpacity>
                                        );

                                    })
                            }
                        </ScrollView>
                    </View>
                </View>

            </View>
        );
    }
}

export default TechniciansList;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        //backgroundColor: colors.SPA_LightRed
        // backgroundColor: colors.silver,
        //alignItems: 'center',

    },
    btnAddSservice: {
        backgroundColor: 'rgb(0,41,132)',
        height: height(4),
        width: width(15),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: width(5),
        borderRadius: 3,
        elevation: 2,
        flexDirection: 'row'
    },
    btnAddServiceTxt: {
        color: 'white',
        fontSize: totalSize(1)
    },
    searchInputContainer: {
        width: width(80),
        height: height(6),
        backgroundColor: 'rgb(255,255,255)',
        elevation: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: height(1),

    },
    searchInput: {
        width: width(70),
        height: height(4),
        fontSize: totalSize(0.8)

    },
    btnSearch: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchIcon: {
        width: totalSize(1.5),
        height: totalSize(1.5)
    },
    shopContainer: {
        width: width(90),
        height: height(10),
        borderRadius: 4,
        //elevation: 5,
        //backgroundColor: 'white',
        marginVertical: height(0.5),
        marginHorizontal: width(2),
        flexDirection: 'row',
        //alignItems: 'center',

    },
    shopImageContainer: {
        flex: 1,
        //backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    shopImage: {

        height: totalSize(6),
        width: totalSize(6),
        borderRadius: 100

    },
    shopTxtContainer: {
        flex: 3,
        //alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'red'
    },
    shopIconContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        //flexDirection: 'row',
        //backgroundColor: 'green'
    },
    iconContainer: {
        //alignItems: 'center',
        //justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'rgb(0,41,132)'
    },

    shopName: {

        fontSize: totalSize(2),
        fontWeight: '500',

    },
    shopDetail: {
        fontSize: totalSize(1.3),
        color: 'gray',

    },

    inputTxtContainer: {
        width: width(80),
        marginVertical: height(1),
        //backgroundColor:'blue'
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width(80),
        height: height(6),
        elevation: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: height(1),
        shadowColor: 'gray',
        shadowOpacity: 0.4
    },
    pickerStyle: {
        color: 'rgb(217,217,217)',
        height: height(6),
        width: width(78),
        alignSelf: 'center'
    },
    popUpText: {
        fontSize: totalSize(1.3),
        color: colors.SPA_redColor,
        fontWeight: '200',
        left: width(2)
    },
    popUpInput: {
        width: width(80),
        height: height(6),
        fontSize: totalSize(1.2),
        elevation: 5,
        borderRadius: 5,
        paddingLeft: 10,
        backgroundColor: 'white',
        marginTop: height(1),
        shadowColor: 'gray',
        shadowOpacity: 0.4
    },
    uploadContainer: {
        flexDirection: 'row',
        width: width(80),
        marginTop: height(2),
        alignItems: 'center'
    },
    btnUpload: {
        height: height(3),
        width: width(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'rgb(0,41,132)',
        marginRight: width(2)
    },
    btnUploadTxt: {
        color: 'white',
        fontSize: totalSize(1.2)
    },
    filesTxt: {
        color: 'gray',
        fontSize: totalSize(1.2)
    },

    btnFinish: {
        width: width(80),
        height: height(6),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.SPA_redColor,
        borderRadius: 5,
        marginVertical: height(3)
    },
    btnFinishTxt: {
        color: 'white',
        fontSize: totalSize(1.8)
    }

})