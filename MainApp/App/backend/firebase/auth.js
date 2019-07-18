import firebase from 'firebase';
import firestore from 'firebase/firestore';
import { saveData } from './utility';
import { Alert } from 'react-native'


export async function signUp(email, password, firstName, lastName, phoneNum, userType = 'client', location) {
  await firebase.auth().createUserWithEmailAndPassword(email, password).
    then(function (user) {
      console.log("Here", userType);

      if (userType == "client") {
        saveData('Users', user.user.uid, {
          UserId: user.user.uid,
          firstName: firstName,
          lastName: lastName,
          phoneNum: phoneNum,
          email: email,
          imageUrl: ''
        });
      }
      else if (userType == "technician") {
        saveData('Technician', user.user.uid, {
          UserId: user.user.uid,
          firstName: firstName,
          lastName: lastName,
          phoneNum: phoneNum,
          email: email,
          daily_availability: "4 PM - 8 PM",
          weekly_availability: "Mon - Fri",
          services: ['Hair'],
          travel_locations: ['MaryLand'],
          imageUrl: null,
          location: location,
          description: "This is Demo Description from firebase",
          locations_details: '[{"id":1,"location":"Sea site, New york, USA","travel_cost":20}]',
          ratings: '[{"name":"user 1","rating":5,"date":"7/8/2019","comment":"this is some demo comment"},{"name":"user 2","rating":4,"date":"7/8/2019","comment":"this is some demo comment 2"}]',
          service_details: '[{"id":1,"service_name":"Test 1","service_code":"025012","service_duration":"30","service_price":50,"description":"Test Description"}]',
          photo: null

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
