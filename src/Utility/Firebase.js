// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore";
import "firebase/compat/auth";



// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyC72aUMWju1PcrUjbONRYgeTPdIXzNtzXw",
  authDomain: "e-clone-10893.firebaseapp.com",
  projectId: "e-clone-10893",
  storageBucket: "e-clone-10893.firebasestorage.app",
  messagingSenderId: "697198688592",
  appId: "1:697198688592:web:f20b96ce89f24264d71455",
  measurementId: "G-P01SRQQZZR"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth=getAuth(app) ;
export const db=app.firestore();