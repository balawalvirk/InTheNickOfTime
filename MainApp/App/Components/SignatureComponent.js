import React from 'react';
import { Alert, Button, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
// import RNFS from 'react-native-fs';
import { uploadAsFile2,} from "../backend/firebase/auth_new";
import { updateDocument,} from "../backend/firebase/utility";
import firebase from 'firebase';
import GlobalConst from "../config/GlobalConst";
export default class SignatureComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      loader: false,
    });
    this.upload = this.upload.bind(this);
  }

  upload = (path) => {
    this.setState({loader:true});
    // RNFS.readFile(path, 'base64')
    // .then(base64String =>{
    //     this.uploadImage("Agrement", GlobalConst.UserId, base64String);
    // });
  }
  async uploadImage(folder, imageName, imageBase64) {
    var isImageUploaded = false ;
    var storageRef = firebase.storage().ref();
    var pathRef = storageRef.child(folder + "/" + imageName);
    var metadata = {
      contentType: "image/jpeg"
    };
  
    let uploadTask = pathRef.putString(imageBase64, "base64", metadata);
  
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress = (
          (snapshot.bytesTransferred / snapshot.totalBytes) *
          100
        ).toFixed(2);
        GlobalConst.progress="Upload is " + progress + "% done";
        console.log("Upload is " + progress + "% done");
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
        console.log(error);
      },
      async() => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then( async(downloadURL) => {
          console.log("File available at", downloadURL);
          GlobalConst.Signatue= downloadURL;
          let success = await updateDocument("", GlobalConst.UserId, { agerement: downloadURL })
         
        });
      }
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <RNSketchCanvas
            containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
            canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
            defaultStrokeIndex={0}
            defaultStrokeWidth={5}

           
            clearComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Clear</Text></View>}
            saveComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Save</Text></View>}
            savePreference={() => {
              return {
                folder: 'RNSketchCanvas',
                filename: String(Math.ceil(Math.random() * 100000000)),
                transparent: false,
                imageType: 'png'
              }
            }}
            onSketchSaved={(success, path) => {
              this.upload(path);
            }}
          />
        </View>
      </View>
    );
  }

  // render() {
  //   return (
  //     <View style={styles.container}>
  //       {this.state.loader ? <ActivityIndicator size="large" color="#0000ff" /> : null}
  //       <RNSketchCanvas
  //         ref={ref => this.canvas = ref}
  //         containerStyle={{ backgroundColor: 'transparent', flex: 1 , height: 200, width: 200 }}
  //         canvasStyle={{ backgroundColor: 'transparent', flex: 1, height: 200, width: 200 }}

  //         defaultStrokeIndex={0}
  //         defaultStrokeWidth={5}
  //         saveComponent={<View style={styles.buttonContainer}><Text>SAVE</Text></View>}
  //         savePreference={() => {
  //           return {
  //             folder: 'RNSketchCanvas',
  //             filename: 'test',
  //             transparent: false,
  //             imageType: 'jpg'
  //           }
  //         }}
  //         onSketchSaved={(success, path) => {
  //            this.upload(path);
  //         }}
  //       />
  //     </View>
  //   );
  // }
}


const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',
  },
  strokeColorButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A'
  },
  functionButton: {
    marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60,
    backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
  }
});
