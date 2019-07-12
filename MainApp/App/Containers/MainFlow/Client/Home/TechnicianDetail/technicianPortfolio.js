import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements'
import colors from '../../../../../Themes/Colors'
import { totalSize, height, width } from 'react-native-dimension'
import images from '../../../../../Themes/Images';

const portfolio_images_list = [
    { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }
];

const numColums = 3

const formatData = (data, numColumns) => {
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
                { id: 1, image: url },
                { id: 2, image: url },
                { id: 3, image: url },
                { id: 4, image: url },
                { id: 5, image: url },
                { id: 6, image: url },
                { id: 7, image: url },
                { id: 8, image: url },
                { id: 9, image: url },
            ]
        };


    }
    renderItem = ({ item, key }) => {
        if (item.empty === true) {
            return <View style={[styles.itemContainer, styles.itemInvisible]} />;
        }
        return (
            <TouchableOpacity style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <FlatList
                data={formatData(this.state.images_list, numColums)}
                style={styles.container}
                renderItem={this.renderItem}
                numColumns={numColums}
            />
        );
    }
}

export default TechnicianPortfolio;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: height(1)
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
        borderColor: 'white'
        //flex: 1,
        //alignItems:'center',
        //justifyContent:'center',
        //borderWidth: 1,
        //backgroundColor:'red',
        //borderColor: 'white',
        //height:width(90)/numColums
    },
    txt: {
        color: 'white',
        //  marginVertical:height(10),
        //  marginHorizontal:width(10)
    }
})