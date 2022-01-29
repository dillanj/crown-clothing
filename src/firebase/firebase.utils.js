// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, doc, setDoc, getDoc  } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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
// Initialize Firebase FireStore and Authentication
export const firestore = getFirestore(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => signInWithPopup(auth, provider);



/* METHODS */

/* createUserProfileDocument creates our user account in our database */ 
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  const userDocRef = doc(firestore, 'users', userAuth.uid);
  const userDoc = await getDoc( userDocRef );
  if (!userDoc.exists()){
    const { displayName, email, uid } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName: displayName,
        id: uid,
        email: email,
        createdAt: createdAt,
      })
    } catch(error){
      console.log("error creating user: ", error.message);
    }
  }
  return userDocRef;
};
