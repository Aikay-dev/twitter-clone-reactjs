// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect } from "firebase/auth";
import {getFirestore, collection, } from 'firebase/firestore'
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA3yyc5qbksW5oLXZ8y0jciO_bVqfcg1kA",
  authDomain: "tweeter-clone.firebaseapp.com",
  projectId: "tweeter-74fca",
  storageBucket: "tweeter-74fca.appspot.com",
  messagingSenderId: "231809244528",
  appId: "1:231809244528:web:0cba97c0d91e37ebd943b5",
  measurementId: "G-4RF83VGLCV",
  databaseURL: "https://tweeter-74fca-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore()
export const realTimeDatabase = getDatabase(app);

//collection ref
export const colRef = collection(db, "Users Email")

//Google Auth Provider

const Provider = new GoogleAuthProvider()

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

//Read RealtimeDatabase

export const writeUserData = (userId, name, email, imageUrl, dob) => {
  const realTimeDatabase = getDatabase(app);
  set(ref(realTimeDatabase, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl,
    dateOfbirth: dob
  });
}
