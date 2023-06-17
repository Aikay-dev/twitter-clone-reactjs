// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect } from "firebase/auth";
import {getFirestore, collection, } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA3yyc5qbksW5oLXZ8y0jciO_bVqfcg1kA",
  authDomain: "tweeter-74fca.firebaseapp.com",
  projectId: "tweeter-74fca",
  storageBucket: "tweeter-74fca.appspot.com",
  messagingSenderId: "231809244528",
  appId: "1:231809244528:web:0cba97c0d91e37ebd943b5",
  measurementId: "G-4RF83VGLCV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore()

//collection ref
export const colRef = collection(db, "Users Email")

//Google Provider

const Provider = new GoogleAuthProvider()
Provider.setCustomParameters({ prompt: "select_account" });


export const signInWithGoogle = () => {
  signInWithPopup(auth, Provider)
  .then((result) => {
    console.log(result)
    window.location.href ="/Home"
  })
  .catch((error) => {
    console.log(error)
  })
}

export const signInWithGoogleOnMobile = () => {
  signInWithRedirect(auth, Provider)
  .then((result) => {
    console.log(result, "is the result")
    window.location.href ="/Home"
  })
  .catch((error) => {
    console.log(error.message)
  })
}

