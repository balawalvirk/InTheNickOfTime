import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements'
import colors from '../../../../Themes/Colors'
import { totalSize, height, width } from 'react-native-dimension'
import images from '../../../../Themes/Images';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { uploadPortfolio } from '../../../../backend/firebase/utility';
import Loader from "../../../../Components/Loader"


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
      portfolio_array:[],
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
      ],
      avatarSource: '',
      camera:''
    };


    
  }

  async componentDidMount(){
    
    data = await AsyncStorage.getItem('user')
    data = JSON.parse(data)
    imgs = data.portfolio
    //imgs = JSON.parse(imgs)
    console.log(imgs);
    this.setState({portfolio_array:imgs})
    
    
  }
  static navigationOptions = {
    title: 'My Portfolio',
    
    headerRight: (
      <TouchableOpacity onPress={() => {
        const options = {
          title: 'Add to Portfolio',
          // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, async (response) => {
          console.log('Response = ', response);
          if (response.didCancel) {
            //   console.log('User cancelled image picker');
          } else if (response.error) {
            //   console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            //   console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.uri };
            console.log(response);
            
            // await this.setState({ image: source })
            // You can also display the image using data:
            //const image = { uri: response.uri, width: response.width, height: response.height }
            //const avatar = { uri: response.uri, type: response.type, name: response.fileName }
            //this.state.Images.push(image);
            //this.state.simpleImages.push(avatar);
            
            
              avatarSource=  { uri: response.uri, type: response.type, name: response.fileName }
              id = await AsyncStorage.getItem('user')
              
              id = JSON.parse(id)
              console.log(id.id);
              
              
             
            
            uploadPortfolio(avatarSource,{collection:'Technician',uid:id.id})
            

          }
        });
      }} style={{ backgroundColor: colors.SPA_redColor, borderRadius: 5, marginHorizontal: 5 }} >
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
      <TouchableOpacity style={styles.itemContainer}>
        <Image source={{uri:item}} style={styles.itemImage} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <FlatList
        data={formatData(this.state.portfolio_array, numColums)}
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