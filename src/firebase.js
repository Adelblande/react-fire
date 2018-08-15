import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = {
  apiKey: "AIzaSyBko3o3XPN9sDa0cx11Uhy9IolQnCPNUzM",
  authDomain: "react-f88be.firebaseapp.com",
  databaseURL: "https://react-f88be.firebaseio.com",
  projectId: "react-f88be",
  storageBucket: "react-f88be.appspot.com",
  messagingSenderId: "213271732398"
};
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp