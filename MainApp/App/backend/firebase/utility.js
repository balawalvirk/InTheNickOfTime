import firebase from 'firebase';
import firestore from 'firebase/firestore';
import {_storeData} from '../../backend/AsyncFuncs';
import GlobalConst from '../../config/GlobalConst';
import RNFetchBlob from 'react-native-fetch-blob';
import {Platform} from 'react-native';
import uuid from 'uuid';


export function connectFirebase(){
 // Initialize Firebase
  const config = {
  apiKey: "AIzaSyAFKti4If-PVBNUmYHu78wTySElOZQ3by0",
  authDomain: "inthenameoftimespa-f27fa.firebaseapp.com",
  databaseURL: "https://inthenameoftimespa-f27fa.firebaseio.com",
  projectId: "inthenameoftimespa-f27fa",
  storageBucket: "",
  messagingSenderId: "154243893765",
  appId: "1:154243893765:web:cc82e42099f50c8a"
};
 if (!firebase.apps.length) {
   firebase.initializeApp(config);
 }
}


export async function getAllOfCollection(collection){
  let data = [];
  let querySnapshot = await firebase.firestore().collection(collection).get();
  querySnapshot.forEach(function(doc) {
    if (doc.exists) {
      //console.log(doc.data());
      data.push({id: doc.id, ...doc.data()});
    } else {
      console.log('No document found!');
    }
  });
  return data;
}

export function getData(collection, doc, objectKey){
  // check if data exists on the given path
  if(objectKey === undefined){
    return firebase.firestore().collection(collection).doc(doc).get().then(function(doc) {
      if (doc.exists) {
        return doc.data();
      } else{
        return false;
      }
    })
  }
  else{
    return firebase.firestore().collection(collection).doc(doc).get().then(function(doc) {
      if (doc.exists && (doc.data()[objectKey] != undefined) ) {
        return ( doc.data()[objectKey] );
      } else{
        return false;
      }
    })
  }
}

export async function getDocRefByKeyValue(collection, key, value){
  return firebase.firestore().collection(collection)
    .where(key, '==', value).get().then(function(querySnapshot) {
      return querySnapshot.docs[0];
    });
}

export async function getDocByKeyValue(collection, key, value){
  let data = [];
  let querySnapshot = await firebase.firestore().collection(collection).where(key, "==", value).get();
  await querySnapshot.forEach(function (doc) {
    data.push(doc.data());
  });
  return data;
}

export async function getDocWithinRange(collection, doc, strSearch){
  let strlength = strSearch.length;
  let strFrontCode = strSearch.slice(0, strlength-1);
  let strEndCode = strSearch.slice(strlength-1, strSearch.length);

  let startcode = strSearch;
  let endcode= strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

  return firebase.firestore().collection(collection)
    .where(doc, '>=', startcode)
    .where(doc, '<', endcode).get().then(function(querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.data());
      });
    });
}


export async function saveData(collection, doc, jsonObject){
  await firebase.firestore().collection(collection).doc(doc).set(jsonObject, { merge: true });
  console.log("Document successfully written!");
  // .catch(function(error) {
  //     console.error("Error writing document: ", error);
  // });
}

export async function updateData(collection, jsonObject) {
  return new Promise((resolve, reject) => {
    let docRef = firebase.firestore().collection(collection).doc(jsonObject.id);
    delete jsonObject.id
    delete jsonObject.mode
    docRef.get().then(function(Doc) {

        if (Doc.exists) {
            jsonObject.updated_at = Date.now();
            docRef.update(jsonObject);
        } 

        // else {
        //     // new record
        //     jsonObject.created_at = Date.now();
        //     docRef.set(jsonObject);
        // }

        resolve(docRef);
    }).catch(function(error) {
        console.log(error.message);
        reject(error);
    });
  }); 
}

export async function saveDataWithoutDocId(collection, jsonObject){
  let docRef = await firebase.firestore().collection(collection).doc();
  docRef.set(jsonObject);
  return docRef;
}

export async function addToArray(collection, doc, array, value){
  firebase.firestore().collection(collection).doc(doc).update({
    [array]: firebase.firestore.FieldValue.arrayUnion(value)
  });
}


export async function uploadImage(imgUri, mime = 'image/jpeg', imagePath, name, databaseCollection, docRef) {
  //blob
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
  const imageRef = firebase.storage().ref(imagePath + '/' + name);

  let readingFile = await fs.readFile(uploadUri, 'base64');
  let blob = await Blob.build(readingFile, { type: `${mime};BASE64` });

  let uploadTask = imageRef.put(blob, { contentType: mime, name: name });

  let progress = 0;
  //Listen for state changes, errors, and completion of the upload.
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    function(snapshot) {
      // console.log('Bytes transferred ' + snapshot.bytesTransferred);
      // console.log('Total bytes ' + snapshot.totalBytes);
      // var progress = ( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
      if(progress < 30)
        progress += 10;
      else if(progress >= 30)
        progress += 5;
      else if(progress >= 85)
        progress += 1;
      else if(progress >= 95)
        progress += 0.1;

      _storeData(GlobalConst.STORAGE_KEYS.imageUploadProgress, progress.toString());
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running');
          break;
      }
    },
    function(error) {
      console.log(error);
      _storeData(GlobalConst.STORAGE_KEYS.imageUploadProgress, '-1');
    },
    function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        saveData(databaseCollection, docRef.id, {imageUrl: downloadURL}).then(() => {
          _storeData(GlobalConst.STORAGE_KEYS.imageUploadProgress, '100');
        });

    });
  });

}


export async function uploadPhotoPromise(imgUri, mime = 'image/jpeg', imagePath, name, databaseCollection, docRef) {
  return new Promise(async (reject, resolve) => {
    try {
      //blob
      const Blob = RNFetchBlob.polyfill.Blob;
      const fs = RNFetchBlob.fs;
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
      window.Blob = Blob;

      const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
      const imageRef = firebase.storage().ref(imagePath + '/' + name);

      let readingFile = await fs.readFile(uploadUri, 'base64');
      let blob = await Blob.build(readingFile, { type: `${mime};BASE64` });

      let uploadTask = imageRef.put(blob, { contentType: mime, name: name });


      let progress = 0;
      //Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function(snapshot) {
          // console.log('Bytes transferred ' + snapshot.bytesTransferred);
          // console.log('Total bytes ' + snapshot.totalBytes);
          // var progress = ( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
          if(progress < 30)
            progress += 10;
          else if(progress >= 30)
            progress += 5;
          else if(progress >= 85)
            progress += 1;
          else if(progress >= 95)
            progress += 0.1;

          _storeData(GlobalConst.STORAGE_KEYS.imageUploadProgress, progress.toString());
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING:
              console.log('Upload is running');
              break;
          }
        },
        function(error) {
          console.log(error);
          _storeData(GlobalConst.STORAGE_KEYS.imageUploadProgress, '-1');
          reject(error);
        },
        function() {
          console.log(upload_task.snapshot.downloadURL)
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            resolve(downloadURL);
          });
        });
    } catch (e) {
      console.log('exception: ', e);
      reject(e);
    }
  });
  
}

export async function uploadImageAsync(uri, path='') {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
  path = (path != '') ? path + '/' + uuid.v4() : uuid.v4();
  const ref = firebase
    .storage()
    .ref()
    // .child(uuid.v4());
    .child(path);
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

export async function downloadImage(folder, imageName){
  var storageRef = firebase.storage().ref();
  var pathRef = storageRef.child(folder + '/' + imageName);

  let url = await pathRef.getDownloadURL()
  return url;
}
