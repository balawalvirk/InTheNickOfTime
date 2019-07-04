import firebase from 'firebase';
import firestore from 'firebase/firestore';
import { saveData } from './utility';
import { Alert } from 'react-native'


export async function signUp(email, password, firstName, lastName, phoneNum, userType = 'client',location) {
  await firebase.auth().createUserWithEmailAndPassword(email, password).
    then(function (user) {
      console.log("Here",userType);
      
      if(userType == "client"){
        saveData('Users', user.user.uid, {
          UserId: user.user.uid, 
          firstName: firstName,
          lastName: lastName, 
          phoneNum: phoneNum, 
          email: email, 
          imageUrl: ''
        });
      }
      else if (userType == "technician"){
        saveData('Technician', user.user.uid, {
          UserId: user.user.uid, 
          firstName: firstName,
          lastName: lastName, 
          phoneNum: phoneNum, 
          email: email,
          daily_availibility: "",
          weekly_availibilty: "",
          services: [""],
          travel_locations: [""], 
          imageUrl: '',
          location: location
        });
      }
      


    }).catch(function (error) {
      //alert(error.code + ': ' + error.message);
    });
  return
}

export function signIn(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    console.log(error);
    if (error.code === 'auth/user-not-found') { return false }
    else if (error.code === 'auth/wrong-password') { return false }
    else { return true }
  })

}

export async function getCurrentUserId() {
  var user = firebase.auth().currentUser;
  if (user != null) {
    return user.uid;

  }
}
