import * as firebase from "firebase/app";
import "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyC2PpmuL5suRZcQs3QiGc9vcgX2QjZEiN8",
    authDomain: "soiree-parrainage-2019.firebaseapp.com",
    databaseURL: "https://soiree-parrainage-2019.firebaseio.com",
    projectId: "soiree-parrainage-2019",
    storageBucket: "",
    messagingSenderId: "569432316859",
    appId: "1:569432316859:web:fe792447bea2b127"
  };
  
  // Get a reference to the database service
  export const db = firebase.initializeApp(firebaseConfig).database();