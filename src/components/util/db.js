import * as firebase from 'firebase';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAneBh2iwpeHoAJ4_cGoEbqK8z4h2TMssI",
    authDomain: "milanlaser-fcb24.firebaseapp.com",
    databaseURL: "https://milanlaser-fcb24.firebaseio.com",
    projectId: "milanlaser-fcb24",
    storageBucket: "milanlaser-fcb24.appspot.com",
    messagingSenderId: "652981090258",
    appId: "1:652981090258:web:692ed02b9e7490c694ba0b",
    measurementId: "G-8YMSQLT4NH"
  }
//import console = require('console');
//console.log(firebaseConfig);
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

