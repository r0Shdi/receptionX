// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps, deleteApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your new web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ4Rv7_xQf7QZjJPAapEnrDDjC-4jcIRw",
  authDomain: "receptionx-14acb.firebaseapp.com",
  databaseURL: "https://receptionx-14acb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "receptionx-14acb",
  storageBucket: "receptionx-14acb.firebasestorage.app",
  messagingSenderId: "509769906390",
  appId: "1:509769906390:web:1d4fd2c8504a96ca88b177",
  measurementId: "G-3VD645YZ5Z"
};


// Initialize or reinitialize Firebase app
let firebaseApp;
if (getApps().length > 0) {
  try {
    deleteApp(getApp()); // Delete the existing app if any
    
  } catch (error) {
    console.error("Error removing app:", error);
  }
}
firebaseApp = initializeApp(firebaseConfig); // Initialize Firebase

// Export Firebase services
export const app = firebaseApp;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDB = getDatabase(app);
