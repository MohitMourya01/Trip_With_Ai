// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3nmlRt3l4D-TToXRihTn8Irg89tU0FR4",
  authDomain: "ai-trip-planner-ca897.firebaseapp.com",
  projectId: "ai-trip-planner-ca897",
  storageBucket: "ai-trip-planner-ca897.appspot.com",
  messagingSenderId: "129842299989",
  appId: "1:129842299989:web:4a56dc8a806a40844600dc",
  measurementId: "G-Z7305H5P4B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
//const analytics = getAnalytics(app);