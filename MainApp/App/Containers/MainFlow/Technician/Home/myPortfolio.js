import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import colors from "../../../../Themes/Colors";
import { totalSize, height, width } from "react-native-dimension";
import images from "../../../../Themes/Images";
import ImagePicker from "react-native-image-picker";
import AsyncStorage from "@react-native-community/async-storage";
import {
  uploadPortfolio,
  getData,
  saveData,
} from "../../../../backend/firebase/utility";
// import Loader from "../../../../Components/Loader";
// import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import RNFetchBlob from "react-native-fetch-blob";
import firebase from "firebase";
import Loader from "./../../../../Components/Loader";
const portfolio_images_list = [
  { key: "A" },
  { key: "B" },
  { key: "C" },
  { key: "D" },
  { key: "E" },
  { key: "F" },
  { key: "G" },
  { key: "H" },
];

const numColums = 3;

const formatData = (data, numColumns) => {
  if (!data) data = [];

  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};
class MyPortfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio_array: [],
      images_list: [
        { id: 1, image: require("../../../../Images/DarkBgPortrait.jpg") },
        { id: 2, image: require("../../../../Images/BG01.jpg") },
        { id: 3, image: require("../../../../Images/DarkBgPortrait.jpg") },
        { id: 4, image: require("../../../../Images/BG01.jpg") },
        { id: 5, image: require("../../../../Images/DarkBgPortrait.jpg") },
        { id: 6, image: require("../../../../Images/BG01.jpg") },
        { id: 7, image: require("../../../../Images/DarkBgPortrait.jpg") },
        { id: 8, image: require("../../../../Images/BG01.jpg") },
        { id: 9, image: require("../../../../Images/DarkBgPortrait.jpg") },
      ],
      avatarSource: "",
      camera: "",
    };
  }

  async componentDidMount() {
    this.props.navigation.addListener("willFocus", async () => {
      data = await AsyncStorage.getItem("user");
      data = JSON.parse(data);
      imgs = data.data.portfolio;
      await this.fetchImages();
      //imgs = JSON.parse(imgs)
      console.log(imgs);
      this.setState({ user: data });
    });
  }

  async fetchImages() {
    await this.setState({ isDataLoded: false });
    data = await AsyncStorage.getItem("user");
    data = JSON.parse(data);
    let TempUser = await getData("Technician", data.data.UserId);
    if (TempUser.portfolio !== undefined) {
      this.setState({ portfolio_array: TempUser.portfolio });
    }
    await this.setState({ isDataLoded: true });
    // alert(TempUser.portfolio.length);
  }

  static navigationOptions = {
    title: "My Portfolio",

    // headerRight: (
    //   <TouchableOpacity onPress={() => {
    //     const options = {
    //       title: 'Add to Portfolio',
    //       // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    //       storageOptions: {
    //         skipBackup: true,
    //         path: 'images',
    //       },
    //     };
    //     ImagePicker.showImagePicker(options, async (response) => {
    //       console.log('Response = ', response);
    //       if (response.didCancel) {
    //         //   console.log('User cancelled image picker');
    //       } else if (response.error) {
    //         //   console.log('ImagePicker Error: ', response.error);
    //       } else if (response.customButton) {
    //         //   console.log('User tapped custom button: ', response.customButton);
    //       } else {
    //         const source = { uri: response.uri };
    //         console.log(response);

    //         // await this.setState({ image: source })
    //         // You can also display the image using data:
    //         //const image = { uri: response.uri, width: response.width, height: response.height }
    //         //const avatar = { uri: response.uri, type: response.type, name: response.fileName }
    //         //this.state.Images.push(image);
    //         //this.state.simpleImages.push(avatar);

    //         avatarSource = { uri: response.uri, type: response.type, name: response.fileName }
    //         id = await AsyncStorage.getItem('user')

    //         id = JSON.parse(id)
    //         console.log(id.id);

    //         await uploadPortfolio(avatarSource, { collection: 'Technician', uid: id.id })
    //         await this.fetchImages();

    //       }
    //     });
    //   }} style={{ backgroundColor: colors.SPA_redColor, borderRadius: 5, marginHorizontal: 5 }} >
    //     <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center' }}>
    //       <Icon name='add' color='white' size={totalSize(3)} />
    //       <View style={{ width: width(1) }}></View>
    //       <Text style={{ fontSize: totalSize(2), color: 'white' }}>Add</Text>
    //     </View>
    //   </TouchableOpacity>
    // )
  };

  // renderItem = ({ item, key }) => {
  //   if (item.empty === true) {
  //     return <View style={[styles.itemContainer, styles.itemInvisible]} />;
  //   }
  //   return (
  //     <TouchableOpacity style={styles.itemContainer}>
  //       <Image source={{ uri: item }} style={styles.itemImage} />
  //     </TouchableOpacity>
  //   )
  // }

  renderItem(item) {
    return (
      <View
        style={{
          width: width(32),
          height: width(32),
          justifyContent: "center",
        }}
      >
        <Image
          style={{ width: "70%", height: "70%", alignSelf: "center" }}
          resizeMode="contain"
          source={{ uri: item }}
        ></Image>
      </View>
    );
  }

  //*********************** Image Picker **********************//
  //***********************************************************//
  async onChange2(text, identifier) {
    if (identifier == "image") {
      this.setState({
        imageB64String2: text.data,
        imageName2: text.fileName,
        imageUrl2: Platform.OS === "ios" ? text.uri : text.path,
        imageType2: text.type,
      });
      let resizedImage = await ImageResizer.createResizedImage(
        this.state.imageUrl2,
        Dimensions.get("window").width / 1,
        Dimensions.get("window").height / 1,
        "JPEG",
        70
      );
      await this.setState({
        imageName2: resizedImage.name,
        imageUrl2: resizedImage.uri.replace("file:", ""),
      });
      // let userId = await AsyncStorage.getItem(GlobalConst.STORAGE_KEYS.userId);
      // let docRef = await firebase.firestore().collection('Restaurant').doc(userId);
      // await uploadImage(Platform.OS === 'ios' ? text.uri : text.path, text.type, 'images/' + text.fileName,
      // text.fileName, 'images', docRef, false, 'not given', 'Restaurant', 'ImageURL')
      this.uploadImage2();
      console.log(this.state.imageUrl2);
      // this.loader.hide()
    } else
      text.then((text) => {
        this.setState({ [identifier]: text });
      });
  }

  image_picker2 = () => {
    // this.setState({ Edit2: true });
    const options = {
      title: "Select Avatar",
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        //   console.log('User cancelled image picker');
      } else if (response.error) {
        //   console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        //   console.log('User tapped custom button: ', response.customButton);
      } else {
        this.onChange2(response, "image");
        const source2 = { uri: response.uri };
        this.setState({ indicator: true });
      }
      // this.loader.show();
    });
  };

  async uploadImage2() {
    console.log("in upload image......................");
    //blob
    await this.setState({ indicator: true });
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    const mime = "image/jpeg";
    //keep reference to original value
    const originalXMLHttpRequest = window.XMLHttpRequest;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    const uploadUri = this.state.imageUrl2;
    const imageRef = firebase.storage().ref("images/"+this.state.imageName2);

    let readingFile = await fs.readFile(uploadUri, "base64");
    let blob = await Blob.build(readingFile, { type: `${mime};BASE64` });

    let uploadTask = imageRef.put(blob, {
      contentType: mime,
      name: this.state.imageName2,
    });

    let progress = 0;
    //Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        console.log("Bytes transferred " + snapshot.bytesTransferred);
        console.log("Total bytes " + snapshot.totalBytes);
        // var progress = ( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
        if (progress < 30) progress += 10;
        else if (progress >= 30) progress += 5;
        else if (progress >= 85) progress += 1;
        else if (progress >= 95) progress += 0.1;

        // _storeData(GlobalConst.STORAGE_KEYS.imageUploadProgress, progress.toString());
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log("Uploading error : ", error);
        // _storeData(GlobalConst.STORAGE_KEYS.imageUploadProgress, '-1').then(() => { return 0 });
      },
      () => {
        window.XMLHttpRequest = originalXMLHttpRequest;
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          user = await AsyncStorage.getItem("user");
          console.log("UserInfo: ", user)
          user = JSON.parse(user);
          portfolio = this.state.portfolio_array;
          try {
            portfolio.push(downloadURL);
          } catch (err) {
            console.log(err);
            portfolio = [];
            portfolio.push(downloadURL);
          }
          user.portfolio = portfolio;
          tmp_usr = JSON.stringify(user);
          AsyncStorage.setItem("user", tmp_usr);
          console.log(user.data.UserId);
          await saveData("Technician", user.data.UserId, {portfolio: portfolio});
          await this.fetchImages();
    //       let TempUser = await getData("Technician", data.data.UserId);
    // if (TempUser.portfolio !== undefined) {
    //   this.setState({ portfolio_array: TempUser.portfolio });
    // }
          // const userToken = await AsyncStorage.getItem("Token");
        });
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isDataLoded ? (
          this.state.portfolio_array.length > 0 ? (
            <FlatList
              numColumns={3}
              data={this.state.portfolio_array}
              renderItem={({ item }) => this.renderItem(item)}
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  styles.shopName,
                  {
                    color: colors.SPA_graycolor,
                    fontSize: totalSize(2),
                    left: width(0),
                    marginTop: "50%",
                  },
                ]}
              >
                No Image
              </Text>
            </View>
          )
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator
              style={[
                styles.shopName,
                {
                  color: colors.SPA_graycolor,
                  fontSize: totalSize(2),
                  left: width(0),
                  marginTop: "50%",
                },
              ]}
            />
          </View>
        )}
        <View style={{ width: "100%", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              this.image_picker2();
            }}
            style={styles.btnRed}
          >
            <Text style={styles.btnTxt}>+Add New image</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default MyPortfolio;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: height(1),
  },
  btnTxt: {
    color: "white",
    fontSize: totalSize(2),
    fontWeight: "300",
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    //backgroundColor: 'red',
    borderColor: "white",
    height: width(100) / numColums,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  btnRed: {
    shadowColor: "gray",
    shadowOpacity: 0.3,
    width: width(40),
    height: height(6),
    backgroundColor: "rgb(218,21,30)",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    borderRadius: 3,
    marginRight: width(2),
    marginBottom: 15,
  },
  itemImage: {
    height: height(20),
    width: width(32),
    borderWidth: 1,
    borderColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "red",
    borderColor: "white",
    //height:width(90)/numColums
  },
  txt: {
    color: "white",
    //  marginVertical:height(10),
    //  marginHorizontal:width(10)
  },
});
