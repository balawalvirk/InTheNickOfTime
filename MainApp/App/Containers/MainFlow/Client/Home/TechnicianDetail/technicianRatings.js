import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, Picker, ImageBackground } from 'react-native';
import images from '../../../../../Themes/Images';
import { totalSize, height, width } from 'react-native-dimension';
import { Icon, } from 'react-native-elements'
import StarRating from 'react-native-star-rating';
import colors from '../../../../../Themes/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal'
import styles from '../../../../Styles/technicianDetailStyles'
import firebase from 'firebase'
export class TechnicianRatings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            starCount: 0,
            comment: '',
            TechnicianRatings: [],
            overallRatings: 0
            // [
            //     { id: 1, name: 'Max Tim', comment: 'He is very good in convieing this moral of lecture. He is very good in convieing this moral of lecture', date: '25-08-2018', rating: 4 },
            // { id: 2, name: 'Leo Lenardo', comment: 'He is very good in convieing this moral of lecture', date: '25-08-2018', rating: 2 },
            // { id: 3, name: 'Arnold Tim', comment: 'He is very good in convieing this moral of lecture. He is very good in convieing this moral of lecture. He is very good in convieing this moral of lecture', date: '25-08-2018', rating: 3 },
            // { id: 4, name: 'Jacob Black', comment: 'He is very good in convieing this moral of lecture', date: '25-08-2018', rating: 5 },
            // { id: 5, name: 'Sam Andrson', comment: 'He is very good in convieing this moral of lecture', date: '25-08-2018', rating: 3 }
            // ]
        };
    }

    getNameAndPic = async () => {
        techRatings = JSON.parse(this.props.navigation.getParam("technician").ratings)
        totalRatings = 0
        for (i = 0; i < techRatings.length; i++) {
            totalRatings += techRatings[i].rating

            let qSnapshot = await firebase.firestore().collection('Users').where('UserId', '==', techRatings[i].id).get()
            qSnapshot.forEach((doc) => {
                if (doc.exists) {
                    console.log("Doc", doc.data());
                    techRatings[i].name = doc.data().name
                    techRatings[i].photo = doc.data().photo
                }
            })
        }
        totalRatings = totalRatings / techRatings.length
        this.setState({ overallRatings: totalRatings })
        return techRatings
    }
    async componentDidMount() {
        ratings = await this.getNameAndPic()
        this.setState({ TechnicianRatings: ratings })
    }
    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
        //console.warn('Rating===>', rating)
    }

    async RattingSubmit() {

    }


    render() {
        console.log("tech ratings", this.state.TechnicianRatings);

        return (
            <View style={styles.container}>
                <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                    <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={[styles.txtLarg, { fontSize: totalSize(2) }]}>  Overall Rating   </Text>
                        <Text style={[styles.txtLarg, { fontSize: totalSize(3), color: colors.SPA_redColor }]}>{this.state.overallRatings}</Text>
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-end' }}>
                        {/* <TouchableOpacity onPress={() => this._toggleModal()} style={[styles.button, { borderRadius: 5, backgroundColor: colors.SPA_redColor, marginRight: 10 }]}>
                            <Text style={styles.buttonTxt}>Rate it</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
                <View style={{ flex: 4, alignItems: 'center', backgroundColor: 'transparent' }}>
                    <ScrollView
                        style={{ marginBottom: 10 }}
                        ref={ref => this.scrollView = ref}
                        onContentSizeChange={(contentWidth, contentHeight) => {
                            if (this.state.postCom) {
                                this.scrollView.scrollToEnd({ animated: true });
                            }
                        }}
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            this.state.TechnicianRatings.map((item, key) => {
                                let img = null;
                                console.log("phot",item.photo);
                                
                                if (item.photo != null) {
                                    img = { uri: item.photo }
                                } else {
                                    img = images.profilePic
                                }
                                console.log("photooio",img);
                                return (
                                    <View key={key} style={styles.detailContainer} >
                                        {/* <View style={styles.iconContainerSmall}>
                                        <Icon name='person' color='rgb(180,210,53)' size={totalSize(4)} />
                                    </View> */}
                                        <Image source={img} style={[styles.profilePicReivew]} />
                                        <View style={{ alignItems: 'flex-start', justifyContent: 'center', width: width(60), backgroundColor: 'transparent', marginVertical: height(3) }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={[styles.txtLarg, { fontSize: totalSize(2) }]}>{item.name}</Text>
                                                <View style={{ width: width(2) }}></View>
                                                <StarRating
                                                    disabled={false}
                                                    emptyStar={'ios-star-outline'}
                                                    fullStar={'ios-star'}
                                                    halfStar={'ios-star-half'}
                                                    iconSet={'Ionicons'}
                                                    maxStars={5}
                                                    starSize={totalSize(1.5)}
                                                    rating={item.rating}
                                                    //selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                    fullStarColor={colors.SPA_redColor}
                                                />
                                            </View>
                                            <Text style={[styles.txtSmall, { fontSize: totalSize(1.25) }]}>{item.comment}</Text>
                                        </View>
                                        <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', width: width(15), backgroundColor: 'transparent' }}>
                                            <Text style={[styles.txtSmall, { fontSize: totalSize(1.25) }]}>{item.date}</Text>
                                        </View>
                                        <View style={{ width: width(5) }}></View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <Modal
                    isVisible={this.state.isModalVisible}
                    animationIn='slideInUp'
                    animationOut='slideOutDown'
                    backdropColor='black'
                    animationInTiming={500}
                    animationOutTiming={500}
                    backdropOpacity={0.50}
                    onBackdropPress={this._toggleModal}>

                    <View>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.txtLarg, { fontSize: totalSize(2), color: 'white' }]}>Rate a Technician</Text>
                        </View>
                        <View style={styles.modalBody}>
                            <View style={styles.starTxtContainer}>
                                <Text style={styles.txtSmall}>
                                    Tap to Rate:
                                </Text>
                                <View style={{ width: width(5) }}></View>
                                <StarRating
                                    disabled={false}
                                    emptyStar={'ios-star-outline'}
                                    fullStar={'ios-star'}
                                    halfStar={'ios-star-half'}
                                    iconSet={'Ionicons'}
                                    maxStars={5}
                                    starSize={totalSize(3)}
                                    rating={this.state.starCount}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    fullStarColor={colors.SPA_redColor}
                                />
                            </View>
                            <View style={styles.inputTxtContainer}>
                                <Text style={[styles.txtSmall, { marginVertical: 3, color: colors.SPA_redColor }]}>Comment</Text>
                                <View style={styles.commentInputView}>
                                    <TextInput
                                        onChangeText={(value) => this.setState({ comment: value })}
                                        placeholder='ENTER COMMENT HERE'
                                        placeholderTextColor='rgb(245,245,238)'
                                        style={styles.commentInput}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => this.RattingSubmit()} style={styles.buttonModal}>
                                {
                                    this.state.loadind_rate === true ?
                                        <ActivityIndicator color='white' size={'small'} />
                                        :
                                        <Text style={{ fontSize: totalSize(1.5), color: 'white' }}>Submit</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}