import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements'
import colors from '../../../../../Themes/Colors'
import { totalSize, height, width } from 'react-native-dimension'
import images from '../../../../../Themes/Images';
import firebase from 'firebase';

const numColums = 2

const formatData = (data, numColumns) => {

    if (!data)
        data = [];

    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }

    return data;
};


class TechnicianPortfolio extends Component {
    constructor(props) {
        super(props);
        let url = "https://firebasestorage.googleapis.com/v0/b/inthenameoftimespa-f27fa.appspot.com/o/assets%2Fgh6mjc6vdJ5AQOnjMw3P-97351638.png?alt=media&token=26b70620-4833-4044-b105-5e8de3128861"
        this.state = {
            images_list: [

            ]
        };


    }

    componentDidMount() {
        this.props.navigation.addListener("willFocus", () => {
            this.fetchOrder();
        });
    }
    async fetchOrder() {
        await this.setState({ isDataLoded: false });
        let TechnicianList = await firebase.firestore().collection("Technician").where("UserId", "==", this.props.navigation.getParam('technician', '').UserId).get()
        TechnicianList.forEach(element3 => {
            if (element3.data().portfolio !== undefined) {
                this.setState({ portfolio_array: element3.data().portfolio });
                // alert(element3.data().portfolio.length);
            }
        });
        await this.setState({ isDataLoded: true });

    }



    renderItem(item) {
        return (
            <View style={{
                width: width(32),
                height: width(32),
                justifyContent: 'center'
            }}>
                <Image style={{ width: '100%', height: '100%', alignSelf: 'center' }} resizeMode='contain' source={{ uri: item }}></Image>

            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isDataLoded ?

                    this.state.portfolio_array !== undefined && this.state.portfolio_array.length > 0  ?

                        <FlatList
                            numColumns={3}
                            data={this.state.portfolio_array}
                            renderItem={({ item }) => this.renderItem(item)}
                        />

                        :
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
                            <Text style={[styles.shopName, { color: colors.SPA_graycolor, fontSize: totalSize(2), left: width(0), marginTop: "50%" }]}>No Image</Text>

                        </View>

                    :
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
                        <ActivityIndicator style={[styles.shopName, { color: colors.SPA_graycolor, fontSize: totalSize(2), left: width(0), marginTop: "50%" }]} />
                    </View>
                }
            </View>

        );
    }

}

export default TechnicianPortfolio;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: height(1)
    },
    shopName: {

        fontSize: totalSize(2),
        fontWeight: '500',

    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        //backgroundColor: 'red',
        borderColor: 'white',
        height: width(100) / numColums
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemImage: {
        height: height(20),
        width: width(32),
        borderWidth: 1,
        borderColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        backgroundColor: 'red',
        borderColor: 'white',
        //height:width(90)/numColums
    },
    txt: {
        color: 'white',
        //  marginVertical:height(10),
        //  marginHorizontal:width(10)
    }
})