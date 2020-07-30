import React, { Component } from "react";
import {
  View,
  Text,
  Platform,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  Alert,
} from "react-native";
const { width: WIDTH } = Dimensions.get("window");
//import styles from '../../Styles/editeProfileStyles'
// import ImagePicker from 'react-native-image-picker';
import Toast from "react-native-simple-toast";
//import store from '../../../Stores/orderStore';
import { Icon } from "react-native-elements";
//import { observer } from 'mobx-react'
import colors from "../../../../Themes/Colors";
import { totalSize, width, height } from "react-native-dimension";
import images from "../../../../Themes/Images";
import { updateProfile } from "./../../../../backend/firebase/auth_new";
import {
  uploadProfileimage,
  connectFirebase,
  getData,
  saveData,
} from "./../../../../backend/firebase/utility";
import EditProfileConstraints from "./../../../../Validations/EditProfileConstraints";
import validate from "validate.js";
import Loader from "./../../../../Components/Loader";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import RNFetchBlob from "react-native-fetch-blob";
import firebase from "firebase";
// var RNFetchBlob = require('react-native-fetch-blob').default
class EditProfileClient extends Component {
  static navigationOptions = {
    title: "Edit Profile",
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: "",
      email: "",
      photo: null,
      password: "",
      image: null,
      avatarSource: null,
      camera: false,
      isImageUpdate: false,
      id: null,
    };
  }

  loadUser = async () => {
    AsyncStorage.getItem("user", async (error, data) => {
      if (data) {
        user = JSON.parse(data);
        console.log(user);
        let img = null;
        if (user.photo != null) {
          img = user.photo;
        }
        let Obj = await getData("Users", user.id);
        this.setState({
          id: Obj.id,
          name: Obj.name,
          email: Obj.email,
          imageUrl2: Obj.photo,
          loading: false,
        });
        AsyncStorage.setItem("user", JSON.stringify(Obj));
      }
    });
    this.loader.hide();
  };

  async componentDidMount() {
    this.loader.show();
    await connectFirebase();
    this.loadUser();
  }

  saveLogin = (obj) => {
    //user = JSON.parse(obj)
    //console.log(user);

    AsyncStorage.setItem("user", JSON.stringify(obj.data));
    AsyncStorage.setItem("user_detail", JSON.stringify(obj));
  };

  editeProfile = async () => {
    try {
      jsonObect = {
        id: this.state.id,
        name: this.state.name,
        userType: "client",
        avatarSource: this.state.avatarSource,
      };

      let err = validate(jsonObect, EditProfileConstraints, { format: "flat" });
      if (err) {
        this.loader.hide();
        Alert.alert("Error!", err.join("\n"), [
          { text: "OK", onPress: () => {} },
        ]);
      } else {
        this.loader.show();
        // let url = await uploadImage(this.state.avatarSource.uri)
        // .then(url => this.setState({ image: url }))
        // .catch(error => console.log(error))
        // jsonObect['photo'] = url;
        // let success = await updateProfile(jsonObect);
        // if (success != false) {
        // await uploadProfileimage (this.state.avatarSource, { collection: 'Users', uid: this.state.id },jsonObect ).then(()=>{
        //     this.loader.hide();
        //     // this.saveLogin(success);
        //     this.props.navigation.goBack();
        // })
        // if (this.state.avatarSource) {
        //     this.uploadImage1();
        // } else {
        if (this.state.isImageUpdate) {
          this.uploadImage2();
        } else {
          let success = await updateProfile(jsonObect);
          this.loader.hide();
          //     // this.saveLogin(success);
          this.props.navigation.goBack();
        }
        // }

        // }
      }
    } catch (e) {
      console.log(e);
      this.loader.hide();
      Alert.alert(
        "Failure",
        "Profile could not be updated. Please try again.",
        [{ text: "OK", onPress: () => {} }]
      );
    } finally {
      this.loader.hide();
    }
  };

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
    //   this.uploadImage2();
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
        // this.loader.show();
        this.onChange2(response, "image");
        const source2 = { uri: response.uri };
        this.setState({
          isImageUpdate: true,
          UpdateImage: response.uri,
          indicator: true,
        });
      }
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
    const imageRef = firebase.storage().ref("images/");

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
          let TempList = this.state.avatarSource2;
          // const userToken = await AsyncStorage.getItem("Token");
          await saveData("Users", this.state.id, { photo: downloadURL }).then(
            (obj) => {
              console.log(obj);
            }
          );
          jsonObect = {
            id: this.state.id,
            name: this.state.name,
            userType: "client",
            avatarSource: this.state.avatarSource,
          };
          let success = await updateProfile(jsonObect);
          this.loader.hide();
          //     // this.saveLogin(success);
          this.props.navigation.goBack();
        //   this.componentDidMount();
        });
      }
    );
  }

  render() {
    //console.warn('image===>',store.USER_LOGIN.profile_pic);
    return (
      <View style={styles.Container}>
        <Loader ref={(r) => (this.loader = r)} />

        <View style={[styles.pfContainer, { marginVertical: height(5) }]}>
          <Image
            source={
              this.state.imageUrl2 !== null
                ? { uri: this.state.isImageUpdate? this.state.UpdateImage: this.state.imageUrl2 }
                : images.profilePic
            }
            style={styles.profileImage}
          />
          <TouchableOpacity onPress={this.image_picker2}>
            <Icon
              name="camera"
              type="entypo"
              color="gray"
              size={totalSize(4)}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.topContainer}>
                    <View style={styles.pfContainer}>
                        <Image source={images.profilePic} style={styles.profileImage} />
                        <TouchableOpacity onPress={this.image_picker}>
                            <Icon name='camera' type='entypo' color='gray' size={totalSize(4)} />
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text style={styles.formTxt}>Your Name</Text>
                        <TextInput
                            value={this.state.name}
                            placeholderTextColor='rgb(183,179,179)'
                            style={styles.inputName}
                        />
                    </View>
                </View> */}
        <View style={styles.txtContainer}>
          <Text style={styles.formTxt}>Your Name</Text>
          <TextInput
            value={this.state.name}
            placeholderTextColor="rgb(183,179,179)"
            style={styles.input}
            onChangeText={(text) => this.setState({ name: text })}
          />
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.formTxt}>Email Address</Text>
          <TextInput
            value={this.state.email}
            placeholder="example@example.com"
            placeholderTextColor="rgb(183,179,179)"
            style={styles.input}
            editable={false}
          />
        </View>
        {/* <View style={styles.txtContainer}>
                    <Text style={[styles.formTxt, { color: 'rgb(218,21,30)', fontWeight: 'normal' }]}>*If you want to change the password then enter a new password below</Text>
                    <Text style={styles.formTxt}>New Password</Text>
                    <TextInput
                        editable={true}
                        placeholder='*******'
                        placeholderTextColor='rgb(183,179,179)'
                        style={styles.input}
                    />
                </View> */}

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={this.editeProfile}>
            {this.state.loading === true ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.btnTxt}>Update Profile</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default EditProfileClient;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    //alignSelf:'center',
    //backgroundColor:colors.SPA_LightRed
    //height:null,
    //width:WIDTH +50
  },
  pfContainer: {
    width: totalSize(15),
    height: totalSize(15),
    alignItems: "center",
    justifyContent: "center",
    marginRight: width(2),
    borderRadius: 100,
  },
  profileImage: {
    width: totalSize(15),
    height: totalSize(15),
    position: "absolute",
    borderRadius: 100,
  },
  cameraIcon: {
    width: width(8),
    height: height(5),
  },

  topContainer: {
    width: width(80),
    alignItems: "center",
    flexDirection: "row",
    marginTop: height(5),
    backgroundColor: "red",
  },
  txtContainer: {
    width: width(80),
    //alignItems: 'flex-start',
    marginTop: height(3),
  },
  btnContainer: {
    //width: width(80),
    alignItems: "center",
    marginVertical: height(10),
    justifyContent: "center",
    //backgroundColor:'green'
  },
  btnTxt: {
    fontSize: totalSize(1.6),
    fontWeight: "100",
    color: "white",
  },
  btn: {
    width: width(80),
    height: height(6),
    backgroundColor: colors.SPA_redColor,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
  },
  formTxt: {
    fontSize: totalSize(1.6),
    fontWeight: "bold",
    marginBottom: height(0.5),
    alignSelf: "flex-start",
  },
  formTxt2: {
    fontSize: totalSize(1.6),
    color: "rgb(207,207,207)",
    //marginTop:height(1)
  },
  inputName: {
    width: width(48),
    height: height(6),
    //borderWidth: 0.5,
    //borderColor: colors.SPA_redColor,
    paddingLeft: 10,
    fontSize: totalSize(1.5),
    borderRadius: 5,
    backgroundColor: "white",
    elevation: 5,
  },
  input: {
    width: width(80),
    height: height(6),
    //borderWidth: 0.5,
    //borderColor: colors.SPA_redColor,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: totalSize(1.5),
    backgroundColor: "white",
    elevation: 5,
  },
});
