// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3yyc5qbksW5oLXZ8y0jciO_bVqfcg1kA",
  authDomain: "tweeter-clone.firebaseapp.com",
  projectId: "tweeter-74fca",
  storageBucket: "tweeter-74fca.appspot.com",
  messagingSenderId: "231809244528",
  appId: "1:231809244528:web:0cba97c0d91e37ebd943b5",
  measurementId: "G-4RF83VGLCV",
  databaseURL: "https://tweeter-74fca-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
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
      console.log(result);
      window.location.href = "/Home";
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signUpWithGoogle = () => {
  signInWithPopup(auth, Provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
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
      console.log("Data written successfully");
      window.location.href = "/Home";
    })
    .catch((error) => {
      console.log("Error writing data:", error);
    });
};

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
    timeJoined: {datejoined},
    notificationData: [0],
    bookmarkData: [0],
    locatonData: "",
    websiteData: "",
    userTweets: [0],
    likedTweets: [0],
  })
    .then(() => {
      console.log("Data written successfully");
      
    })
    .catch((error) => {
      console.log("Error writing data:", error);
    });
};

//Read RealtimeDatabase

export const realtimeData = (data) => {
  const CurrentRTDB = ref(realTimeDatabase, "users/");
  onValue(CurrentRTDB, (snapshot) => {
    data = snapshot.val();
  });
  return data;
}

// Delete auth account cleanup

export const deleteUserWithEmailAndPassword = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User signed in successfully
      userCredential.user.delete()
        .then(() => {
          // User deleted successfully
          console.log('User deleted successfully');
        })
        .catch((error) => {
          // An error occurred while deleting the user
          console.error('Error deleting user:', error);
        });
    })
    .catch((error) => {
      // An error occurred while signing in the user
      console.error('Error signing in user:', error);
    });
};

// Get firebase Storage

export const storage = getStorage()