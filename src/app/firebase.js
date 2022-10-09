// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCipOD2s-nfe66VbUtDAc_zMaWxb0wA7MA",
  authDomain: "blobber-810ac.firebaseapp.com",
  projectId: "blobber-810ac",
  storageBucket: "blobber-810ac.appspot.com",
  messagingSenderId: "844584253028",
  appId: "1:844584253028:web:3bf7ec975594946e349171"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);