import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBnWwGpLFNaFI9DiI3TaNrTlKrPgUY2Nps",
    authDomain: "wfym-75b0a.firebaseapp.com",
    projectId: "wfym-75b0a",
    storageBucket: "wfym-75b0a.appspot.com",
    messagingSenderId: "170119075298",
    appId: "1:170119075298:web:b5a39e9cd2761db69515bb",
};
// initialize firebase
firebase.initializeApp(firebaseConfig);
// export const auth = getAuth();
export const firestore = firebase.firestore();
