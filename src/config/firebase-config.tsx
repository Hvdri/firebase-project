import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDwi6O9V5qh1hsSvSzOcQYsq8h6mebcekY",
  authDomain: "fir-project-2e120.firebaseapp.com",
  projectId: "fir-project-2e120",
  storageBucket: "fir-project-2e120.appspot.com",
  messagingSenderId: "315531174020",
  appId: "1:315531174020:web:a4572ec9c17745bd1f62d1",
  measurementId: "G-K04SLG9HWK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);