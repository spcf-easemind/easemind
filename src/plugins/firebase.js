// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjhBAGy-yvHT0rnYC1iGkfvfPXKNMesOw",
  authDomain: "easemind-71adb.firebaseapp.com",
  databaseURL:
    "https://easemind-71adb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "easemind-71adb",
  storageBucket: "easemind-71adb.appspot.com",
  messagingSenderId: "1007866876151",
  appId: "1:1007866876151:web:2fdfa3a7bfcf69d6be43f2",
  measurementId: "G-FX9DKRQYC0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
