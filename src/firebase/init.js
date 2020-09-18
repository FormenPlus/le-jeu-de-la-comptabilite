import * as firebase from "firebase/app";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

/* PRODUCTION */
const firebaseConfig = {
  apiKey: "AIzaSyC0-j3hX9gWTXAV7jFp-r8f6fslEpQhiM4",
  authDomain: "jeu-de-la-comtabilite.firebaseapp.com",
  databaseURL: "https://jeu-de-la-comtabilite.firebaseio.com",
  projectId: "jeu-de-la-comtabilite",
  storageBucket: "jeu-de-la-comtabilite.appspot.com",
  messagingSenderId: "971006124849",
  appId: "1:971006124849:web:c0e20e52d69691bf888610",
  measurementId: "G-YN9FLKN5SW"
};

/* DEVELOPMENT */
const firebaseConfigDev = {
  apiKey: "AIzaSyD3EHXA5rcnQFNNu8ZoKFELGfIY6O96euM",
  authDomain: "jeu-de-la-comptabilite-dev.firebaseapp.com",
  databaseURL: "https://jeu-de-la-comptabilite-dev.firebaseio.com",
  projectId: "jeu-de-la-comptabilite-dev",
  storageBucket: "jeu-de-la-comptabilite-dev.appspot.com",
  messagingSenderId: "284068590297",
  appId: "1:284068590297:web:ccde8feaf2bb836597c4c8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();