// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS3s-YgIFSO_ksx-X4Sq6MyzWMSyeXotA",
  authDomain: "uxify-ad031.firebaseapp.com",
  projectId: "uxify-ad031",
  storageBucket: "uxify-ad031.appspot.com",
  messagingSenderId: "804929894268", 
  appId: "1:804929894268:web:3be129b7174ed2c3c6d6f9",
  measurementId: "G-5EFQY5MTK5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
// const analytics = getAnalytics(app);