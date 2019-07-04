import firebase from 'firebase';
import firestore from 'firebase/firestore';
import { Alert, Platform } from 'react-native';
import { saveData } from './utility';
import RNFetchBlob from 'react-native-fetch-blob';


export async function signUp(user_profile) {
	return new Promise((resolve, reject) => {
		firebase.auth().createUserWithEmailAndPassword(user_profile.email, user_profile.password).then(async () => {
			let user = await firebase.auth().currentUser;
			let profile = {
			  displayName: user_profile.name,
			  phoneNumber: user_profile.phoneNumber,
			  photoURL: user_profile.photo,
			};
			user_profile['UserId'] = user.uid;
			delete user_profile.password;
			delete user_profile.confirmPassword;

			Promise.all([
				user.sendEmailVerification(),
				user.updateProfile(profile),
				saveData('Users', user.uid, user_profile)
			]).then(async function() {
				console.log(firebase.auth().currentUser);
				Alert.alert('Success', 'Email Verification Sent.', [{ text: 'OK', onPress: () => {} }]);
				let profile = await getCurrentUserProfile();
				resolve(profile);
			}).catch(function(error) {
			  console.log('user.updateProfile');
			  console.log(error);
			  resolve(false);
			});

		}).catch(function(error) {
			let errorCode = error.code;
			let errorMessage = error.message;
			if (errorCode == 'auth/weak-password') {
			  alert('The password is too weak.');
			} else {
			  alert(errorMessage);
			}
			console.log(error);
			resolve(false);
		});
	});
}

export async function signIn(email, password) {
	return new Promise(async (resolve, reject) => {
		try {
			
			await firebase.auth().signInWithEmailAndPassword(email, password);
			let profile = await getCurrentUserProfile();
			if (profile.emailVerified) {
				await firebase.auth().signOut();
				Alert.alert('Failure', 'Please verify your email.', [{ text: 'OK', onPress: () => {} }]);
				resolve(false);
			}
			console.log('profile');
			console.log(profile);

			resolve(profile);

		} catch (error) {

			let errorCode = error.code;
			let errorMessage = error.message;
			if (error.code === 'auth/user-not-found') { 
				Alert.alert('Failure', 'Invalid user.', [{ text: 'OK', onPress: () => {} }]);
			} else if (error.code === 'auth/wrong-password') { 
				Alert.alert('Failure', 'Invalid password.', [{ text: 'OK', onPress: () => {} }]);
			} else { 
				Alert.alert('Failure', errorMessage, [{ text: 'OK', onPress: () => {} }]);
			}
			console.log(error);
			resolve(false);
		}
	});
}

export async function signOut() {
	firebase.auth().signOut().then(function() {
	  Alert.alert('Success', 'Logged out.', [{ text: 'OK', onPress: () => {} }]);
	}).catch(function(error) {
	  // An error happened.
	});
}

/* */
export async function reAuthenticate() {
	let user = firebase.auth().currentUser;
	let credential;

	// Prompt the user to re-provide their sign-in credentials

	user.reauthenticateWithCredential(credential).then(function() {
	  // User re-authenticated.
	}).catch(function(error) {
	  // An error happened.
	});
}



function toggleSignIn(email, password) {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {

    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      document.getElementById('quickstart-sign-in').disabled = false;
      // [END_EXCLUDE]
    });
    // [END authwithemail]
  }
  document.getElementById('quickstart-sign-in').disabled = true;
}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Sign in with email and pass.
  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END createwithemail]
}

/**
 * Sends an email verification to the user.
 */
export async function sendEmailVerification() {
  firebase.auth().currentUser.sendEmailVerification().then(function() {
    Alert.alert('Success', 'Email Verification Sent.', [{ text: 'OK', onPress: () => {} }]);
  });
}

export async function sendPasswordReset(email) {
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    Alert.alert('Success', 'Password Reset Email Sent.', [{ text: 'OK', onPress: () => {} }]);
  }).catch(function(error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
    	Alert.alert('Failure', errorMessage, [{ text: 'OK', onPress: () => {} }]);
    } else if (errorCode == 'auth/user-not-found') {
    	Alert.alert('Failure', errorMessage, [{ text: 'OK', onPress: () => {} }]);
    } else {
    	Alert.alert('Failure', errorMessage, [{ text: 'OK', onPress: () => {} }]);
    }
    console.log(error);
  });
}

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
export function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
      // User is signed in.
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;

      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      document.getElementById('quickstart-sign-in').textContent = 'Sign out';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      if (!emailVerified) {
        document.getElementById('quickstart-verify-email').disabled = false;
      }
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      // document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      // document.getElementById('quickstart-sign-in').textContent = 'Sign in';
      // document.getElementById('quickstart-account-details').textContent = 'null';
      // [END_EXCLUDE]
    }

    // [START_EXCLUDE silent]
    document.getElementById('quickstart-sign-in').disabled = false;
    // [END_EXCLUDE]

  });
  // [END authstatelistener]
}

// window.onload = function() {
//   initApp();
// };

async function getCurrentUserId() {
  let user = firebase.auth().currentUser;
  if (user != null) {
    return user.uid;
  }
  return null;
}

async function getCurrentUserProfile() {
	let user = await firebase.auth().currentUser;
	if (user != null) {
		let profile = {
			user_id: user.uid,
			name: user.displayName,
			email: user.email,
			emailVerified: user.emailVerified,
			photo: user.photoURL,
			isAnonymous: user.isAnonymous,
			providerData: user.providerData,
		}
		return profile;
	}
	return null;
}

/* https://github.com/CodeLinkIO/Firebase-Image-Upload-React-Native/blob/master/demo.js */
export const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {

  	const storage = firebase.storage();

  	// Prepare Blob support
	const Blob = RNFetchBlob.polyfill.Blob
	const fs = RNFetchBlob.fs
	window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
	window.Blob = Blob

    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = storage.ref('images').child(`${sessionId}`)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}