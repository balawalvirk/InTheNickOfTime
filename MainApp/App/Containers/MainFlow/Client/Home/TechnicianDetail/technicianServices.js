import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, Picker, ImageBackground } from 'react-native';
import images from '../../../../../Themes/Images';
import { totalSize, height, width } from 'react-native-dimension';
import { Icon, } from 'react-native-elements'
import StarRating from 'react-native-star-rating';
import colors from '../../../../../Themes/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal'
//import DateTimePicker from "react-native-modal-datetime-picker"
import DateTimePicker from 'react-native-datepicker'
// import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../../../../Styles/technicianDetailStyles'
import SimpleToast from 'react-native-simple-toast';
import { isGenericTypeAnnotation } from '@babel/types';
import firebase from 'firebase';
import moment from "moment";

export default class TechnicianServices extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Services_list: this.props.navigation.getParam('services_details', ''),
            // [
            //     { id: 1, service_name: 'Hand massage', service_code: '025012', service_duration: '30', service_price: 50, description: 'we will provide you the full tension free service...we will provide you the full tension free service..we will provide you the full tension free service' },
            //     { id: 2, service_name: 'Face Cleaning', service_code: '025012', service_duration: '30', service_price: 50, description: 'we will provide you the full tension free service' },
            //     { id: 3, service_name: 'Hair Diy', service_code: '025012', service_duration: '30', service_price: 50, description: 'we will provide you the full tension free service..we will provide you the full tension free service' },
            //     { id: 4, service_name: 'Hand massage', service_code: '025012', service_duration: '30', service_price: 50, description: 'we will provide you the full tension free service.we will provide you the full tension free service.we will provide you the full tension free service' },
            //     { id: 5, service_name: 'Face Cleaning', service_code: '025012', service_duration: '30', service_price: 50, description: 'we will provide you the full tension free service' },
            //     { id: 6, service_name: 'Hair Diy', service_code: '025012', service_duration: '30', service_price: 50, description: 'we will provide you the full tension free service' },
            // ],
            location: null,
            travel_locations: this.props.navigation.getParam('location_details', ''),
            // [
            //     { id: 1, location: 'Sea site, New york, USA', travel_cost: 20 },
            //     { id: 2, location: 'Top Valley, New york, USA', travel_cost: 25 },
            //     { id: 3, location: 'Down Town, New york, USA', travel_cost: 45 },
            //     { id: 4, location: 'Sea site, New york, USA', travel_cost: 30 }
            // ],

            technician: this.props.navigation.getParam('technician', ''),
            travel_cost: 0.00,
            showServicesList: false,
            loadingSelectedService: false,
            selected_Services: [],
            loadingUnSelectedServices: false,
            servicesTotalCost: 0.00,
            totalCost: 0.00,
            date_time: new Date(),
            time_time: new Date().toTimeString(),
            isDateTimePickerVisible: false,
            isModalVisibleMessage: false,
            comment: null,
            address: null,
            day_from: null,
            day_to: null,
            time_from: null,
            time_to: null
        };
    }

    getDayNumber(txt) {
        if (txt == "Sun") { return 0 }
        else if (txt == "Mon") { return 1 }
        else if (txt == "Tue") { return 2 }
        else if (txt == "Wed") { return 3 }
        else if (txt == "Thu") { return 4 }
        else if (txt == "Fri") { return 5 }
        else if (txt == "Sat") { return 6 }
    }
    goToPayment = () => {
        console.log(this.state.servicesTotalCost, " -- ", this.state.locations, " -- ", this.state.date_time);


        this._toggelModalMessage()
        this.props.navigation.navigate('cardData', {
            services: this.state.selected_Services,
            location: this.state.travel_locations,
            travel_cost: this.state.travel_cost,
            date_time: this.state.date_time,
            time_time: this.state.time_time,
            services_cost: this.state.servicesTotalCost,
            technician: this.state.technician,
            comments: this.state.comment,
            address: this.state.address
        })


    }
    _toggleShowServicesList = () => {
        this.setState({ showServicesList: !this.state.showServicesList })
    }

    async componentDidMount() {

        this.props.navigation.addListener("willFocus", async () => {


            await this.getList()


        });
    }




    async getList() {
        let List = [];
        let List2 = [];
        let TechnicianList = await firebase.firestore().collection("Technician").where("UserId", "==", this.state.technician.UserId).get()
        TechnicianList.forEach(element3 => {
            if (element3.data().weekly_availability !== undefined) {
                this.state.technician.weekly_availability = element3.data().weekly_availability;
            }

            if (element3.data().servicesList !== undefined && element3.data().servicesList.length > 0) {
                element3.data().servicesList.forEach(element => {
                    if (element.ServiceId === this.props.navigation.getParam('ServiceId', "Nothing")) {
                        List.push(element);
                    }

                });

            }
            if (element3.data().Subservices !== undefined && element3.data().Subservices.length > 0) {
                element3.data().Subservices.forEach(element => {
                    if (element.ServiceId === this.props.navigation.getParam('ServiceId', "Nothing")) {
                        List.push(element);
                    }

                });

            }
            if (element3.data().locationList !== undefined && element3.data().locationList.length > 0) {
                element3.data().locationList.forEach(element => {
                    element.Name= this.state.travel_locations[0].Name;
                    List2.push(element);
                });

            }
        });
        // this.setState({Services_list: List, travel_locations:element3.data().locationList })
        this.state.Services_list = List;
        this.setState({travel_locations: List2});
    }

    _toggelModalMessage = async () => {

        tmp = this.state.technician.weekly_availability
        // tmp1 = tmp2 = tmp
        // tmp1 = tmp1.slice(0, 3)
        // tmp2 = tmp2.slice(4)

        // alert(this.state.date_time + " : ");
        let day = new Date(this.state.date_time)
        let day2 = day.getDay()
        // console.log(day, "-", this.getDayNumber(tmp1), "-", this.getDayNumber(tmp2));
        // console.log(this.getDayNumber(tmp1) <= this.state.date_time);
        // console.log(this.state.date_time <= this.getDayNumber(tmp2));

        if (tmp !== undefined && tmp[day2].isAvailable) {



            // alert(this.state.date_time);
            final = new Date(this.state.date_time).toDateString();
            // time = timefinal.getHours()
            // console.log(tmp.time_from, '==', tmp.time_to, '==', time);
            if (tmp[day2].time_from !== "" && tmp[day2].time_to !== "" && this.state.time_time !== "") {



                // alert(tmp[day2].time_from+ " : " + this.state.time_time + " : " + tmp[day2].time_to);

                // moment(final+ " "+time, "YYYY-MM-DD hh:mm a").format("YYYY-MM-DDTHH:mm:ss")

                var BookingTime = moment(this.state.time_time, "HH:mm a");    // e.g. 11:00 pm
                var TimeFrom = moment(tmp[day2].time_from, "HH:mm a");
                var TimeTo = moment(tmp[day2].time_to, "HH:mm a");
                // TimeFrom= new Date('2019-01-01T' + tmp[day2].time_from + 'Z').toDateString();
                // BookingTime= new Date('2019-01-01T' + this.state.time_time + 'Z');
                // TimeTo= new Date('2019-01-01T' + tmp[day2].time_to + 'Z');

              //  alert(TimeFrom + " : " + BookingTime + " : " + TimeTo);
                if (TimeFrom <= BookingTime && BookingTime <= TimeTo) {

                    console.log('IF');

                } else {
                    alert("Technician Not Available at specified time.")
                    return
                }
            } else {
                alert("Technician Not Available at specified time.")
                return
            }



        } else {
            alert("Technician Not Available at specified date.")
            return
        }


        this.state.day_from = this.state
        this.setState({ isModalVisibleMessage: !this.state.isModalVisibleMessage })
    }
    selectService = async (id) => {
        this.setState({ loadingSelectedService: true })
        for (let i = 0; i < this.state.Services_list.length; i++) {
            if (id === this.state.Services_list[i].id) {
                //await this.setState({ memberID: this.state.members[i].user_id })
                await this.state.selected_Services.push(this.state.Services_list[i])
                await this.setState({ servicesTotalCost: parseInt(this.state.servicesTotalCost) + parseInt(this.state.Services_list[i].Cost) })
                //await this.state.selected_members_IDs.push(this.state.members[i].user_id)
            }
        }
        console.warn('selected Services==>', this.state.selected_Services)
        //.warn('selected Members ID==>', this.state.selected_members_IDs)
        await this.setState({ loadingSelectedService: false })
        this._toggleShowServicesList()

    }

    UnselectService = async (itemIndex) => {
        this.setState({ loadingUnSelectedServices: true })
        await this.setState({ servicesTotalCost: this.state.servicesTotalCost - this.state.selected_Services[itemIndex].Cost })
        await this.state.selected_Services.splice(itemIndex, 1)
        await this.setState({ loadingUnSelectedServices: false })

    }

    render() {

        return (
            <View style={styles.container}>

                <ScrollView>
                    <View style={styles.lowerContainer}>
                        <View style={{ flex: 1, width: width(95), alignItems: 'center', }}>
                            <View style={[styles.txtContainer]}>
                                <Text style={[styles.txtLarg, { fontSize: totalSize(2) }]}>Select Services</Text>
                            </View>
                            <View style={styles.schoolInputContainer}>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => this._toggleShowServicesList()}>
                                    <Text style={[styles.txtLarg, { color: 'rgb(217,217,217)', fontWeight: 'normal', fontSize: totalSize(3) }]}>Select Service</Text>
                                    <View style={{ marginHorizontal: width(12) }}></View>
                                    <Icon name='md-arrow-dropdown' color={colors.SPA_graycolor} size={totalSize(3)} type='ionicon' />
                                </TouchableOpacity>
                            </View>
                            {
                                this.state.showServicesList ?
                                    <View style={{ width: width(90), backgroundColor: 'white', elevation: 5 }}>
                                        <ScrollView>
                                            {
                                                this.state.Services_list.map((item, key) => {
                                                    return (
                                                        <TouchableOpacity key={key} style={{ marginHorizontal: 5, borderBottomWidth: 0.4, borderColor: 'gray', elevation: 0 }}
                                                            onPress={() => {
                                                                this.selectService(item.id)
                                                            }}
                                                        >
                                                            <View style={{ marginVertical: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <Text style={{ fontSize: totalSize(2), color: 'black', marginVertical: 3, fontWeight: 'bold' }}>{item.Name}</Text>
                                                                <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Price: ${item.Cost}</Text>
                                                                <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Duration: {item.Duration} min</Text>
                                                                <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>Description: {item.Description}</Text>
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
                            {/* <View style={[styles.txtContainer, { alignItems: 'flex-start' }]}>
                                        <Text style={[styles.txtLarg, { fontSize: totalSize(2) }]}>Selected Servies</Text>
                                         <View style={{ borderColor: colors.SPA_redColor, borderWidth: 0.5, borderRadius: 5 }}>
                                            <Text style={[styles.welcome, { fontSize: totalSize(3), fontWeight: 'normal', marginVertical: 5, marginHorizontal: 5 }]}>175</Text>
                                        </View> 
                                    </View> */}
                            {
                                this.state.selected_Services.length !== 0 ?
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {
                                            this.state.selected_Services.map((item, key) => {
                                                return (
                                                    <View key={key} style={{ borderRadius: 25, marginHorizontal: width(1), marginVertical: height(1), backgroundColor: colors.SPA_redColor, elevation: 3, shadowOpacity: 2, shadowColor: 'gray' }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                            <View style={{ marginHorizontal: width(4), marginVertical: height(1), alignItems: 'flex-start', justifyContent: 'center', backgroundColor: 'transparent' }}>
                                                                <Text style={{ fontSize: totalSize(1.5), color: 'white' }}>{item.Name}</Text>
                                                                <Text style={{ fontSize: totalSize(1.5), color: 'white' }}>Price: ${item.Cost}</Text>
                                                            </View>
                                                            <Icon name='ios-close-circle' size={totalSize(4)} type='ionicon' color='white' onPress={() => this.UnselectService(key)} />
                                                            <View style={{ width: 5 }}></View>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                    :
                                    <Text>No Service Selected yet</Text>
                            }
                            <View>
                                <View style={[styles.txtContainer, {}]}>
                                    <Text style={[styles.txtLarg, { fontSize: totalSize(2) }]}>Select Location</Text>
                                </View>
                                <View style={styles.schoolInputContainer}>
                                    {/* <Icon name='location-pin' color={colors.SPA_graycolor} size={totalSize(4)} type='entypo' />
                                            <TextInput
                                                //onFocus={() => this.getProfessors_predictions()}
                                                //onChangeText={(value) => this.getProfessors_predictions()}
                                                placeholder={this.state.professor}
                                                placeholderTextColor='rgb(217,217,217)'
                                                underlineColorAndroid='transparent'
                                                style={styles.TxtInput}
                                            /> */}

                                    <Picker
                                        mode='dropdown'
                                        selectedValue={this.state.travel_cost}
                                        style={styles.PickerStyle}
                                        onValueChange={(itemValue, itemIndex) => {
                                            kk = parseInt(itemValue)
                                            this.setState({ travel_cost: kk })
                                        }

                                        }>
                                        <Picker.Item label="Select Location" value='' />
                                        {
                                            this.state.travel_locations.map((item, key) => {
                                                return (
                                                    <Picker.Item key={key} label={item.Name} value={item.Cost} />
                                                )
                                            })

                                        }
                                    </Picker>
                                </View>
                                <View style={[styles.txtContainer, {}]}>
                                    <Text style={[styles.txtLarg, { fontSize: totalSize(2) }]}>Enter Address</Text>
                                </View>
                                <View style={styles.schoolInputContainer}>
                                    <TextInput
                                        onChangeText={(text) => this.setState({ address: text })}
                                        placeholder={'Enter Full Address'}
                                        placeholderTextColor='rgb(217,217,217)'
                                        underlineColorAndroid='transparent'
                                    // style={styles.TxtInput}
                                    />
                                </View>
                                <View style={[styles.txtContainer, {}]}>
                                    <Text style={[styles.txtLarg, { fontSize: totalSize(2) }]}>Select Date</Text>
                                </View>
                                <TouchableOpacity style={styles.schoolInputContainer}>

                                    <DateTimePicker
                                        style={{ width: width(75) }}
                                        date={this.state.date_time}
                                        mode="date"
                                        // is24Hour={false}
                                        placeholder="Select Date"
                                        showIcon={false}
                                        androidMode='spinner'
                                        placeholderTextColor={'rgb(217,217,217)'}
                                        //   format="MM-DD-YYYY h:mm a"
                                        format="YYYY-MM-DD"
                                        //minDate="2018-05-01"
                                        //maxDate="2020-06-01"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        onDateChange={(date) => { this.setState({ date_time: date }) }}
                                    />
                                    <View style={{ marginHorizontal: 10 }}>
                                        <Icon name='calendar-clock' color='gray' size={totalSize(3)} type='material-community' />
                                    </View>
                                </TouchableOpacity>
                                <View style={[styles.txtContainer, {}]}>
                                    <Text style={[styles.txtLarg, { fontSize: totalSize(2) }]}>Select Time</Text>
                                </View>
                                <TouchableOpacity style={styles.schoolInputContainer}>

                                    <DateTimePicker
                                        style={{ width: width(75) }}
                                        date={this.state.time_time}
                                        mode="time"
                                        // is24Hour={false}
                                        placeholder="Select Time"
                                        showIcon={false}
                                        androidMode='spinner'
                                        placeholderTextColor={'rgb(217,217,217)'}
                                        format="h:mm a"
                                        // format=""
                                        //minDate="2018-05-01"
                                        //maxDate="2020-06-01"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        onDateChange={(time) => { this.setState({ time_time: time }) }}
                                    />
                                    <View style={{ marginHorizontal: 10 }}>
                                        <Icon name='calendar-clock' color='gray' size={totalSize(3)} type='material-community' />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ backgroundColor: 'transparent', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={[styles.welcome, { fontSize: totalSize(2), fontWeight: 'normal' }]}>Technician Availability:   </Text>
                                {this.state.technician.weekly_availability != "" && this.state.technician.weekly_availability != null && typeof this.state.technician.weekly_availability != 'string' ?
                                    this.state.technician.weekly_availability.map(i => {
                                        return <View style={{ width: width(90), flexDirection: 'row' }}><Text style={[styles.welcome, { fontSize: totalSize(2), fontWeight: 'normal', marginVertical: 5, marginHorizontal: 5 }]}>{i.item}</Text>
                                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}><Text style={{ textAlign: 'left' }}>{i.time_from} - {i.time_to}</Text></View>
                                        </View>
                                    })
                                    :
                                    <Text></Text>}
                            </View>
                            <View style={[styles.txtContainer, { flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'flex-start', alignItems: 'center' }]}>
                                <Text style={[styles.welcome, { fontSize: totalSize(2), fontWeight: 'normal' }]}>Travel Fee:   </Text>
                                <Text style={[styles.welcome, { fontSize: totalSize(2), fontWeight: 'normal', marginVertical: 5, marginHorizontal: 5 }]}>${this.state.travel_cost}</Text>
                            </View>
                            <View style={[styles.txtContainer, { flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'flex-start', alignItems: 'center' }]}>
                                <Text style={[styles.welcome, { fontSize: totalSize(3), fontWeight: 'normal', color: colors.SPA_graycolor }]}>Total:  </Text>
                                <View style={{ borderColor: colors.SPA_redColor, borderWidth: 1, borderRadius: 5 }}>
                                    <Text style={[styles.welcome, { fontSize: totalSize(3), fontWeight: 'normal', marginVertical: 5, marginHorizontal: 5 }]}>${this.state.servicesTotalCost + this.state.travel_cost}</Text>
                                </View>
                            </View>

                            <View style={styles.btnContainer}>

                                <TouchableOpacity onPress={() => {
                                    console.log(this.state.locations);

                                    if (this.state.servicesTotalCost == 0 || this.state.travel_cost == null || this.state.date_time == null) {
                                        SimpleToast.show("Some fields are empty", SimpleToast.SHORT)
                                        console.log("in if");

                                        return
                                    }
                                    console.log("all ok");
                                    this._toggelModalMessage()
                                }} style={[styles.schoolInputContainer, { backgroundColor: colors.SPA_redColor, marginVertical: height(5) }]} >
                                    <View style={styles.btnTxtContainer}>
                                        {
                                            this.state.loading_getProfessors_by_departmet === true ?
                                                <ActivityIndicator color='white' />
                                                :
                                                <Text style={styles.btnTxt}>Next</Text>
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Modal
                    isVisible={this.state.isModalVisibleMessage}
                    animationIn='slideInUp'
                    animationOut='slideOutDown'
                    backdropColor='black'
                    animationInTiming={500}
                    animationOutTiming={500}
                    backdropOpacity={0.50}
                    onBackdropPress={this._toggelModalMessage}>

                    <View >
                        {/* <View style={styles.modalHeader}>
                            <Text style={[styles.txtLarg, { fontSize: totalSize(2), color: 'white' }]}>Rate a Technician</Text>
                        </View> */}

                        <View style={[styles.modalBody, { borderRadius: 5 }]}>
                            <View style={[styles.txtContainer, { backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', marginTop: height(5) }]}>
                                <Text style={[styles.txtLarg, { fontSize: totalSize(1.8) }]}>Is there is anything else your technician</Text>
                                <Text style={[styles.txtLarg, { fontSize: totalSize(1.8) }]}>should know?</Text>
                                <Text style={[styles.txtLarg, { fontSize: totalSize(1.8), alignItems: 'center', justifyContent: 'center' }]}>There are no refunds for services that are unable to</Text>
                                <Text style={[styles.txtLarg, { fontSize: totalSize(1.8) }]}>be provided due to lack of disclosure from client.</Text>
                            </View>
                            <View style={[styles.txtContainer, { backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', }]}>
                                <Text style={[styles.txtSmall, { fontSize: totalSize(1.5), color: 'gray' }]}>Please list ALL information that we not be able</Text>
                                <Text style={[styles.txtSmall, { fontSize: totalSize(1.5), color: 'gray' }]}>to ascertain because we are coming to your location</Text>
                                <Text style={[styles.txtSmall, { fontSize: totalSize(1.5), color: 'gray' }]}>sight unseen.</Text>
                            </View>
                            <View style={styles.inputTxtContainer}>
                                <Text style={[styles.txtSmall, { marginVertical: 3, color: colors.SPA_redColor }]}>Message</Text>
                                <View style={[styles.commentInputView, {}]}>
                                    <TextInput
                                        onChangeText={(value) => this.setState({ comment: value })}
                                        placeholder='Type Your Request'
                                        multiline={true}
                                        scrollEnabled={true}
                                        placeholderTextColor='rgb(245,245,238)'
                                        style={[styles.commentInput, {}]}
                                    />
                                </View>
                            </View>
                            <View style={[styles.btnContainer, { marginVertical: height(5) }]}>
                                <Text style={[styles.txtLarg, { fontSize: totalSize(1.8) }]} onPress={() => this.goToPayment()}>NO, THANKS</Text>
                                <View style={{ marginHorizontal: width(20) }}></View>
                                <Text style={[styles.txtLarg, { fontSize: totalSize(1.8) }]} onPress={() => this.goToPayment()} >YES, SURE</Text>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        );
    }
}