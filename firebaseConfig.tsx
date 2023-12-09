import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCz47hK5kWxCDW211TAi4y7jKCxLwHlubA",
  authDomain: "wfym-c5a5e.firebaseapp.com",
  projectId: "wfym-c5a5e",
  storageBucket: "wfym-c5a5e.appspot.com",
  messagingSenderId: "186297085154",
  appId: "1:186297085154:web:1c93a130681977ae04c2bb",
};

// initialize firebase

firebase.initializeApp(firebaseConfig);
// export const auth = getAuth();
export const firestore = firebase.firestore();
