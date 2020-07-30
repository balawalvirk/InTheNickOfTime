import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
const { width: WIDTH } = Dimensions.get("window");
//import styles from '../../Styles/editeProfileStyles'
import ImagePicker from "react-native-image-picker";
import Toast from "react-native-simple-toast";
//import store from '../../../Stores/orderStore';
import { Icon } from "react-native-elements";
//import { observer } from 'mobx-react'
import colors from "../../../../Themes/Colors";
import { totalSize, width, height } from "react-native-dimension";
import images from "../../../../Themes/Images";
import AsyncStorage from "@react-native-community/async-storage";
import {
  uploadAsFile,
  editProfilePic,
} from "../../../../backend/firebase/auth_new";
import { updateDocument, saveData } from "../../../../backend/firebase/utility";
import Loader from "../../../../Components/Loader";
import ImageResizer from "react-native-image-resizer";
import RNFetchBlob from "react-native-fetch-blob";
import firebase from "firebase";
class EditProfileTechnician extends Component {
  static navigationOptions = {
    title: "Edit Profile",
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: "Alina Shaw",
      Password: "",
      image: null,
      avatarSource: null,
      camera: false,
      isImageUpdate: false,
      user: {},
    };
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
      // this.uploadImage2();
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
    const imageRef = firebase.storage().ref("images/" + this.state.imageName2);

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
          await saveData("Technician", this.state.user.UserId, {
            photo: downloadURL,
          });

          let User = this.state.user;
          User.photo = downloadURL;
          //  console.log(User)
          let OldUser = this.state.OldUser;
          OldUser.data = User;
          let tmpState = JSON.stringify(OldUser);
          await AsyncStorage.setItem("user", tmpState);
          //Update Document
          updateDocument("Technician", this.state.user.UserId, this.state.user);
          // let OldUser = this.state.OldUser;
          // OldUser.data = this.state.user;
          // let tmpState = JSON.stringify(OldUser);
          // await AsyncStorage.setItem("user", tmpState);
          this.loader.hide();

          // this.loader.hide();
          this.setState({ user: User });
        });
      }
    );
  }

  async componentDidMount() {
    this.loader.show();
    usr = await AsyncStorage.getItem("user");
    usr = JSON.parse(usr);
    this.setState({ user: usr.data, OldUser: usr });
    this.loader.hide();
  }

  editeProfile = async () => {
    this.loader.show();
    // if (this.state.avatarSource != null) {
    //   await editProfilePic(this.state.avatarSource, {
    //     collection: "Technician",
    //     uid: this.state.user.UserId,
    //   }).then((res) => {
    //     console.log(res);
    //     this.state.user.photo = res;
    //     this.setState({ avatarSource: null });
    //   });
    // }

    if (this.state.isImageUpdate) {
      this.uploadImage2();
    } else {
      updateDocument("Technician", this.state.user.UserId, this.state.user);
      let OldUser = this.state.OldUser;
      OldUser.data = this.state.user;
      let tmpState = JSON.stringify(OldUser);
      await AsyncStorage.setItem("user", tmpState);
      this.loader.hide();
    }
  };
  render() {
    //console.warn('image===>',store.USER_LOGIN.profile_pic);
    return (
      <View style={styles.Container}>
        <Loader ref={(r) => (this.loader = r)} />
        <View style={[styles.pfContainer, { marginVertical: height(5) }]}>
          <Image
            source={
              this.state.user.photo
                ? { uri: this.state.isImageUpdate? this.state.UpdateImage: this.state.user.photo }
                : images.profilePic
            }
            style={styles.profileImage}
          />
          <TouchableOpacity onPress={() => this.image_picker2()}>
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
            value={this.state.user.name}
            placeholderTextColor="rgb(183,179,179)"
            style={styles.input}
            onChangeText={(value) => {
              this.state.user.name = value;
              this.setState(this.state);
            }}
          />
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.formTxt}>Email Address</Text>
          <TextInput
            editable={false}
            placeholder={this.state.user.email}
            placeholderTextColor="rgb(183,179,179)"
            style={styles.input}
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
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.editeProfile();
            }}
          >
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

export default EditProfileTechnician;

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
