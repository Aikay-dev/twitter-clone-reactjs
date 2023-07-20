// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getStorage } from "firebase/storage";
import getJoinedMonthYear from "../utility/dateJoined";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;
const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;
const databaseURL = import.meta.env.VITE_FIREBASE_DATABASE_URL;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
  databaseURL
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const realTimeDatabase = getDatabase(app);

//collection ref
export const colRef = collection(db, "Users Email");

//Google Auth Provider

export const Provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, Provider)
    .then((result) => {
 
      window.location.href = "/Home";
    })
    .catch((error) => {
 
    });
};

export const signUpWithGoogle = () => {
  signInWithPopup(auth, Provider)
    .then((result) => {
 
    })
    .catch((error) => {
 
    });
};

//Write RealtimeDatabase

export const writeUserData = (
  userId,
  name,
  email,
  imageUrl,
  dob,
  displayUserName,
  joinedDate
) => {
  const realTimeDatabase = getDatabase(app);
  set(ref(realTimeDatabase, "users/" + userId), {
    username: name,
    displayName: displayUserName,
    email: email,
    profile_picture: imageUrl,
    dateOfbirth: dob,
    followersNumber: [0],
    followingNumber: [0],
    bioData: "Hi, welcome to my profile",
    userId: userId,
    timeJoined: joinedDate,
    notificationData: [0],
    bookmarkData: [0],
    locatonData: "",
    websiteData: "",
    userTweets: [0],
    likedTweets: [0],
  })
    .then(() => {
 
      window.location.href = "/Home";
    })
    .catch((error) => {
 
    });
};

const currentDate = new Date();
const UserjoinedDate = getJoinedMonthYear(currentDate);
 
export const writeUserDataUserAndPass = (
  userId,
  name,
  email,
  imageUrl,
  dob,
  displayUserName
) => {
  const realTimeDatabase = getDatabase(app);
  set(ref(realTimeDatabase, "users/" + userId), {
    username: name,
    displayName: displayUserName,
    email: email,
    profile_picture: imageUrl,
    dateOfbirth: dob,
    followersNumber: [0],
    followingNumber: [0],
    bioData: "",
    userId: userId,
    timeJoined: UserjoinedDate,
    notificationData: [0],
    bookmarkData: [0],
    locatonData: "",
    websiteData: "",
    userTweets: [0],
    likedTweets: [0],
  })
    .then(() => {
 
    })
    .catch((error) => {
 
    });
};

//Read RealtimeDatabase

export const realtimeData = (data) => {
  const CurrentRTDB = ref(realTimeDatabase, "users/");
  onValue(CurrentRTDB, (snapshot) => {
    data = snapshot.val();
  });
  return data;
};

// Delete auth account cleanup

export const deleteUserWithEmailAndPassword = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User signed in successfully
      userCredential.user
        .delete()
        .then(() => {
          // User deleted successfully
 
        })
        .catch((error) => {
          // An error occurred while deleting the user
          console.error("Error deleting user:", error);
        });
    })
    .catch((error) => {
      // An error occurred while signing in the user
      console.error("Error signing in user:", error);
    });
};

// Get firebase Storage

export const storage = getStorage();