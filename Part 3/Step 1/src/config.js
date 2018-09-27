import * as firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAu6lSy3c4vLeqb-dhVIC0Zl5K_czrvLxE",
  authDomain: "todoappp-1f803.firebaseapp.com",
  databaseURL: "https://todoappp-1f803.firebaseio.com",
  projectId: "todoappp-1f803",
  storageBucket: "todoappp-1f803.appspot.com",
  messagingSenderId: "587043537304"
};
firebase.initializeApp(config);
export const firestore = firebase.firestore();
