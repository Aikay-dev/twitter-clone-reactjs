// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore, collection, getDocs} from 'firebase/firestore'

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
export const auth = getAuth()
export const db = getFirestore()

//collection ref
export const colRef = collection(db, "Users Email")