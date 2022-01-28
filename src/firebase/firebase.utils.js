// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {  } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRxSAf7vJmrP7uT7zUN0QzoKBTS9Y8qog",
  authDomain: "crown-clothing-5aade.firebaseapp.com",
  projectId: "crown-clothing-5aade",
  storageBucket: "crown-clothing-5aade.appspot.com",
  messagingSenderId: "384013851337",
  appId: "1:384013851337:web:424848f978b43765580b18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);




export const firestore = getFirestore(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => signInWithPopup(auth, provider);