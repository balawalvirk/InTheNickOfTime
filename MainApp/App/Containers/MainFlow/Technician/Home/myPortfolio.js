import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements'
import colors from '../../../../Themes/Colors'
import { totalSize, height, width } from 'react-native-dimension'
import images from '../../../../Themes/Images';

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
class MyPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images_list: [
        { id: 1, image: require('../../../../Images/DarkBgPortrait.jpg') },
        { id: 2, image: require('../../../../Images/BG01.jpg') },
        { id: 3, image: require('../../../../Images/DarkBgPortrait.jpg') },
        { id: 4, image: require('../../../../Images/BG01.jpg') },
        { id: 5, image: require('../../../../Images/DarkBgPortrait.jpg') },
        { id: 6, image: require('../../../../Images/BG01.jpg') },
        { id: 7, image: require('../../../../Images/DarkBgPortrait.jpg') },
        { id: 8, image: require('../../../../Images/BG01.jpg') },
        { id: 9, image: require('../../../../Images/DarkBgPortrait.jpg') },
      ]
    };


  }
  static navigationOptions = {
    title: 'My Portfolio',
    headerRight: (
      <TouchableOpacity style={{ backgroundColor: colors.SPA_redColor, borderRadius: 5, marginHorizontal: 5 }} >
        <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name='add' color='white' size={totalSize(3)} />
          <View style={{ width: width(1) }}></View>
          <Text style={{ fontSize: totalSize(2), color: 'white' }}>Add</Text>
        </View>
      </TouchableOpacity>
    )
  };

  
  renderItem = ({ item, key }) => {
    if (item.empty === true) {
      return <View style={[styles.itemContainer, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity  style={styles.itemContainer}>
        <Image  source={item.image} style={styles.itemImage} />
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <FlatList
        data={formatData(this.state.images_list,numColums)}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColums}
      />
    );
  }
}

export default MyPortfolio;
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
       height:height(20),
       width:width(32),
       borderWidth:1,
       borderColor:'white'
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