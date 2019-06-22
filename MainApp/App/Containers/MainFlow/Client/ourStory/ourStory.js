import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { totalSize, width,height } from 'react-native-dimension';
import colors from '../../../../Themes/Colors';
import images from '../../../../Themes/Images';

class OurStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.contanier}>
                <View style={styles.headindContainer}>
                    <Text style={styles.heading}> My Story </Text>
                </View>
                <View style={styles.bodyContainer}>
                   <View style={styles.txtContainer}>
                   <Text style={styles.body}>
                    “When I was 18 I was diagnosed with a severe form of
             Multiple Sclerosis
             that the doctors treated with 6 months of chemotherapy.
             Being young, I was very sad that I was not able to do the
             things others my age were able to do, I was unable to easily
             leave my home and losing my hair wasn’t that great either.
             
             One time when I came home from the hospital…
             my parents surprised me and had nail technicians come to
             our home and give me a full manicure and pedicure spa
             treatment! It may seem small, but it meant the world of
             difference to me at 18.
             
             I wanted to share this with others that would like to feel and
             look great but for whatever reason have limitations (time,
             availability, disability etc.) may not be able to conform to the
             regular spa environment. These services are very close to my
             heart since I have received them. I personally understand the
             impact feeling and looking great has on a person’s life, and
             that sometimes they can be received just In the Nick of Time.”
 </Text>
                   </View>

                </View>
                <View style={styles.bottomContainer}>
                   <View style={[styles.infoContainer,{alignItems:'flex-end'}]}>
                   <Text style={styles.heading}> Ashley Ivey Askew </Text>
                    <Text style={styles.body}> Founder/CEO </Text>
                    <Text style={[styles.body,{textAlign:'right'}]}> In the Nick of Time: The Elite Mobile Salon & Spa </Text>
                    <Text style={styles.body}>Established 2014</Text>
                   </View>
                   <View style={styles.picContainer}>
             <Image source={images.story_pic} style={styles.pic}/>
                   </View>
                </View>
            </View>
        );
    }
}

export default OurStory;
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
    heading: {
        fontSize: totalSize(2),
        fontWeight: 'bold',
        color: colors.SPA_redColor
    },
    bodyContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'green',
    },
    body: {
        fontSize: totalSize(1.8),
        fontWeight: 'normal',
        color: colors.SPA_graycolor
    },
    Infobody: {
        fontSize: totalSize(1.5),
        fontWeight: 'normal',
        color: colors.SPA_graycolor
    },
    txtContainer:{
        width:width(95)
    },
    bottomContainer:{
        flex:2,
        //alignItems: 'center',
        //justifyContent: 'center',
      // backgroundColor: 'yellow',
       flexDirection: 'row',
    },
    infoContainer: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
       //backgroundColor: 'red',
    },
    picContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
      // backgroundColor: 'black',
    },
    pic:{
        height:height(30),
        width:width(40)
    }
})