import React, { Component } from 'react';
import { View, Text, StyleSheet,Image, ScrollView, Easing, TouchableOpacity } from 'react-native';
import { totalSize, width,height } from 'react-native-dimension';
import colors from '../../Themes/Colors';
import images from "../../Themes/Images";
import ZoomImage from 'react-native-zoom-image';
class Story extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    static navigationOptions = {
        header: null
    }
    async MoveNext() {
        this.props.selectedData();
        // this.props.selectedData();
    }
    render() {
        return (
            <View style={styles.contanier}>
                <ScrollView 
                showsVerticalScrollIndicator={false}
                >
                    <View style={styles.headindContainer}>
                        <Text style={styles.heading}> My Story </Text>
                    </View>
                    <View style={styles.bodyContainer}>
                        <View style={styles.txtContainer}>
                            <Text style={[styles.body,{textAlign: "justify", marginHorizontal: 15}]}>
                                “When I was 18 I was diagnosed with a severe form of Multiple
                                Sclerosis that the doctors treated with 6 months of
                                chemotherapy. Being young, I was very sad that I was not able
                                to do the things others my age were able to do, I was unable
                                to easily leave my home and losing my hair wasn’t that great
                                either. One time when I came home from the hospital… my
                                parents surprised me and had nail technicians come to our home
                                and give me a full manicure and pedicure spa treatment! It may
                                seem small, but it meant the world of difference to me at 18.
                                I wanted to share this with others that would like to feel and
                                look great but for whatever reason have limitations (time,
                                availability, disability etc.) may not be able to conform to
                                the regular spa environment. These services are very close to
                                my heart since I have received them. I personally understand
                                the impact feeling and looking great has on a person’s life,
                                and that sometimes they can be received just In the Nick of
                                Time.”
                </Text>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={[styles.infoContainer, { alignItems: "flex-end" }]}>
                            <Text style={styles.heading}> Ashley Ivey Askew </Text>
                            <Text style={styles.body}> Founder/CEO </Text>
                            <Text style={[styles.body, { textAlign: "left", flexWrap: "wrap",  }]}>
                                In the Nick of Time: 
                                
                            </Text>
                            <Text style={[styles.body, { textAlign: "left", flexWrap: "wrap" }]}>
                                
                                The Elite Mobile Salon & Spa
                            </Text>
                            <Text style={styles.body}>Established 2014</Text>
                        </View>
                        <View style={styles.picContainer}>
                            <ZoomImage
                                source={images.story_pic2}
                                imgStyle={styles.pic2}
                                duration={200}
                                easingFunc={Easing.ease}
                            />
                            <ZoomImage
                                source={images.story_pic}
                                imgStyle={styles.pic}
                                duration={200}
                                easingFunc={Easing.ease}
                            />
                        </View>
                    </View>


                    <View style={[styles.btnContainer, { flex: 1 }]}>
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
                </ScrollView>
            </View>
        );
    }
}
export default Story;
const styles = StyleSheet.create({
    contanier: {
        flex: 1
    },
    headindContainer: {
        flex: 0.5,
        //backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
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
    heading: {
        fontSize: totalSize(2),
        fontWeight: 'bold',
        
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
    bodyContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'green',
    },
    body: {
        fontSize: totalSize(2),
        fontWeight: 'normal',
        color: colors.SPA_graycolor
    },
    Infobody: {
        fontSize: totalSize(1.3),
        fontWeight: 'normal',
        color: colors.SPA_graycolor
    },
    txtContainer:{
        width:width(95)
    },
    bottomContainer:{
        flex:1,
        //alignItems: 'center',
        //justifyContent: 'center',
      // backgroundColor: 'yellow',
       flexDirection: 'row',
    },
    infoContainer: {
        flex:0.5,
        alignItems: 'center',
        justifyContent: 'center',
       //backgroundColor: 'red',
    },
    picContainer:{
        flex:0.5,
        alignItems: 'center',
        justifyContent: 'center',
      // backgroundColor: 'black',
    },
    pic:{
        height:height(25),
        width:width(30)
    },
    pic2:{
        height:height(15),
        width:width(20),
        marginVertical: 10
    }
})