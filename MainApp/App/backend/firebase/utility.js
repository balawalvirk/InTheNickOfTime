import firebase from 'firebase';
import firestore from 'firebase/firestore';
import { _storeData } from '../../backend/AsyncFuncs';
import GlobalConst from '../../config/GlobalConst';
import { Platform, AsyncStorage } from 'react-native';
import uuid from 'uuid';
import MyPortfolio from '../../Containers/MainFlow/Technician/Home/myPortfolio';


export function connectFirebase() {
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyAFKti4If-PVBNUmYHu78wTySElOZQ3by0",
    authDomain: "inthenameoftimespa-f27fa.firebaseapp.com",
    databaseURL: "https://inthenameoftimespa-f27fa.firebaseio.com",
    projectId: "inthenameoftimespa-f27fa",
    storageBucket: "inthenameoftimespa-f27fa.appspot.com",
    messagingSenderId: "154243893765",
    appId: "1:154243893765:web:cc82e42099f50c8a"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  // Your web app's Firebase configuration
  // var firebaseConfig = {
  //   apiKey: "AIzaSyDCIxKAqUFfwdKvBfqDe2fREpJ80zoyfuE",
  //   authDomain: "inthenickoftimespa-66dcc.firebaseapp.com",
  //   databaseURL: "https://inthenickoftimespa-66dcc.firebaseio.com",
  //   projectId: "inthenickoftimespa-66dcc",
  //   storageBucket: "inthenickoftimespa-66dcc.appspot.com",
  //   messagingSenderId: "952301872063",
  //   appId: "1:952301872063:web:d6733ce986f657f2"
  // };
  // // Initialize Firebase
  // if (!firebase.apps.length) {
  //   firebase.initializeApp(firebaseConfig);
  // }
}




// export async function getAllOfCollection(collection) {
//   let data = [];
//   let querySnapshot = await firebase.firestore().collection(collection).get().then((res) => {
//     res.forEach((arr) => {
//       data.push({ id: arr.id, ...arr.data() });
//     })
//   });

export async function getAllOfCollection(collection) {
  let data = [];
  let querySnapshot = await firebase.firestore().collection(collection).get();
  //console.log(res);

  // res.forEach((arr) => {
  //   data.push({ id: arr.id, ...arr.data() });
  // })
  // return data

  console.log("QSS" + querySnapshot);

  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      //console.log(doc.data());
      data.push({ id: doc.id, ...doc.data() });
    } else {
      console.log('No document found!');
    }
  });
  return data;
}

export function getData(collection, doc, objectKey) {
  // check if data exists on the given path
  if (objectKey === undefined) {
    return firebase.firestore().collection(collection).doc(doc).get().then(function (doc) {
      if (doc.exists) {
        return doc.data();
      } else {
        return false;
      }
    })
  }
  else {
    return firebase.firestore().collection(collection).doc(doc).get().then(function (doc) {
      if (doc.exists && (doc.data()[objectKey] != undefined)) {
        return (doc.data()[objectKey]);
      } else {
        return false;
      }
    })
  }
}

export async function getDocRefByKeyValue(collection, key, value) {
  return firebase.firestore().collection(collection)
    .where(key, '==', value).get().then(function (querySnapshot) {
      return querySnapshot.docs[0];
    });
}

export async function getDocByKeyValue(collection, key, value) {
  let data = [];
  let querySnapshot = await firebase.firestore().collection(collection).where(key, "==", value).get();
  await querySnapshot.forEach(function (doc) {
    data.push(doc.data());
  });
  return data;
}

export async function getDocWithinRange(collection, doc, strSearch) {
  let strlength = strSearch.length;
  let strFrontCode = strSearch.slice(0, strlength - 1);
  let strEndCode = strSearch.slice(strlength - 1, strSearch.length);

  let startcode = strSearch;
  let endcode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

  return firebase.firestore().collection(collection)
    .where(doc, '>=', startcode)
    .where(doc, '<', endcode).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.data());
      });
    });
}


export async function saveData(collection, doc, jsonObject) {
  console.log(jsonObject);

  await firebase.firestore().collection(collection).doc(doc).set(jsonObject, { merge: true }).then(() => {
    console.log("Document successfully written!");
  }).catch((error) => {
    console.log("Error", error);

  })

  // .catch(function(error) {
  //     console.error("Error writing document: ", error);
  // });
}

export async function insertDocument(collection, jsonObject) {
  return new Promise((resolve, reject) => {
    firebase.firestore().collection(collection).add(jsonObject)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        resolve(docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
        reject(error);
      });
  });
}

export async function updateDocument(collection, uid, jsonObject) {
  return new Promise((resolve, reject) => {
    let docRef = firebase.firestore().collection(collection).doc(uid);
    docRef.get().then(function (Doc) {

      if (Doc.exists) {
        jsonObject.updated_at = Date.now();
        docRef.update(jsonObject);
      } else {
        // new record
        jsonObject.created_at = Date.now();
        docRef.set(jsonObject);
      }

      console.log('docRef.id: ', docRef.id);
      resolve(docRef.id);
    }).catch(function (error) {
      console.log(error.message);
      reject(error);
    });
  });
}

export async function getDocument(collection, uid) {
  return new Promise((resolve, reject) => {
    let docRef = firebase.firestore().collection(collection).doc(uid);
    docRef.get().then(function (Doc) {

      if (Doc.exists) {
        console.log('Doc.data(): ', Doc.data());
        resolve(Doc.data());
      } else {
        resolve(null);
      }
    }).catch(function (error) {
      console.log(error.message);
      reject(error);
    });
  });
}

export async function getDocuments(collection, where) {
  return new Promise((resolve, reject) => {
    let docRef = firebase.firestore().collection(collection).where(where.key, '==', where.value);
    docRef.get().then(function (querySnapshot) {
      let data = [];
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        data.push({ id: doc.id, ...doc.data() });
      });

      resolve(data);
    }).catch(function (error) {
      console.log(error.message);
      reject(error);
    });
  });
}



export async function createData(collection, data) {

  saveData(collection, data.id, data );

}

export async function updateData(collection, jsonObject) {
  return new Promise((resolve, reject) => {
    let docRef = firebase.firestore().collection(collection).doc(jsonObject.id);
    delete jsonObject.id
    delete jsonObject.mode
    docRef.get().then(function (Doc) {

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
    }).catch(function (error) {
      console.log(error.message);
      reject(error);
    });
  });
}

export async function saveDataWithoutDocId(collection, jsonObject) {
  let docRef = await firebase.firestore().collection(collection).doc();
  docRef.set(jsonObject);
  return docRef;
}

export async function addToArray(collection, doc, array, value) {
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
    function (snapshot) {
      // console.log('Bytes transferred ' + snapshot.bytesTransferred);
      // console.log('Total bytes ' + snapshot.totalBytes);
      // var progress = ( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
      if (progress < 30)
        progress += 10;
      else if (progress >= 30)
        progress += 5;
      else if (progress >= 85)
        progress += 1;
      else if (progress >= 95)
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
    function (error) {
      console.log(error);
      _storeData(GlobalConst.STORAGE_KEYS.imageUploadProgress, '-1');
    },
    function () {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
        saveData(databaseCollection, docRef.id, { imageUrl: downloadURL }).then(() => {
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
        function (snapshot) {
          // console.log('Bytes transferred ' + snapshot.bytesTransferred);
          // console.log('Total bytes ' + snapshot.totalBytes);
          // var progress = ( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
          if (progress < 30)
            progress += 10;
          else if (progress >= 30)
            progress += 5;
          else if (progress >= 85)
            progress += 1;
          else if (progress >= 95)
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
        function (error) {
          console.log(error);
          _storeData(GlobalConst.STORAGE_KEYS.imageUploadProgress, '-1');
          reject(error);
        },
        function () {
          console.log(upload_task.snapshot.downloadURL)
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
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

export async function uploadImageAsync(uri, path = '') {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
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

export async function downloadImage(folder, imageName) {
  var storageRef = firebase.storage().ref();
  var pathRef = storageRef.child(folder + '/' + imageName);

  let url = await pathRef.getDownloadURL()
  return url;
}

async function getUser() {
  k = await AsyncStorage.getItem('user')
  user = JSON.parse(k)
  console.log(user);
  
  return user;
}

export async function getUserId() {
  k = await AsyncStorage.getItem('user')
  user = JSON.parse(k)
  console.log(user);
  
  return user;
}

setNameAndPic = async (dd) => {
  i = 0
  for (d of dd) {
    console.log("DAA", d);
    let qSnapshot = await firebase.firestore().collection('Technician').where('UserId', '==', d.technicianId).get()
    qSnapshot.forEach((doc) => {
      if (doc.exists) {
        d.technicianName = doc.data().UserId
      }
    })
  }
}

export async function getUserBookings(collection) {
  let data = [];
  user = await getUser()
  console.log(user);
  

  let querySnapshot = await firebase.firestore().collection(collection).where("userId", "==", user.UserId).get()
  //console.log(res);

  // res.forEach((arr) => {
  //   data.push({ id: arr.id, ...arr.data() });
  // })
  // return data
  console.log("QSS", querySnapshot.docs);

  querySnapshot.forEach((doc) => {
    if (doc.exists) {
      data.push({ id: doc.id, ...doc.data() });
    } else {
      console.log('No document found!');
    }
  });
  //data = await setNameAndPic(data)
  return data;
}

export async function getTechnicianBookings(collection) {
  let data = []
  user = await getUser()

  let querySnapshot = await firebase.firestore().collection(collection).where("technicianId", "==", user.UserId).get()

  querySnapshot.forEach((doc) => {
    if (doc.exists) {
      data.push({ id: doc.id, ...doc.data() });
    } else {
      console.log('No document found!');
    }
  });
  //data = await setNameAndPic(data)
  console.log("Tech Bookings", data);

  return data;
}

export async function uploadPortfolio(image, collectionInfo, progressCallback) {

  console.log("uploadAsFile", image)
  const response = await fetch(image.uri);
  const blob = await response.blob();

  var metadata = {
    contentType: image.type,
  };

  // let name = new Date().getTime() + "-" + image.fileName;
  let name = collectionInfo.uid + "-" + image.name;
  const ref = firebase
    .storage()
    .ref()
    .child('assets/' + name)

  const task = ref.put(blob, metadata);

  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      (snapshot) => {
        // progressCallback && progressCallback(snapshot.bytesTransferred / snapshot.totalBytes)

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => reject(error), /* this is where you would put an error callback! */
      async () => {
        // let downloadURL = task.snapshot.downloadURL;

        let downloadURL = await ref.getDownloadURL();
        console.log("_uploadAsByteArray ", downloadURL);
        user = await AsyncStorage.getItem('user')
        user = JSON.parse(user)
        portfolio = user.portfolio
        try {
          portfolio.push(downloadURL)
        } catch (err) {
          console.log(err);
          portfolio = []
          portfolio.push(downloadURL)
        }
        user.portfolio = portfolio
        tmp_usr = JSON.stringify(user)
        AsyncStorage.setItem('user', tmp_usr)
        console.log('Technicain',user.id,user)
        updateDocument('Technician',user.id,user).then((res)=>{
          console.log("res",res);
          
        },(err)=>{
          console.log(err);
          
        })
        success = 0

        // save a reference to the image for listing purposes
        // let refAssets = firebase.database().ref('assets');
        // refAssets.push({
        //   'URL': downloadURL,
        //   //'thumb': _imageData['thumb'],
        //   'name': name,
        //   //'coords': _imageData['coords'],
        //   'owner': firebase.auth().currentUser && firebase.auth().currentUser.uid,
        //   'when': new Date().getTime()
        // }).then(r => resolve(r), e => reject(e))
      }
    );
  });
}