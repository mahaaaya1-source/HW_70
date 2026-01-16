import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCkgxiacRw3tDBb7hKPEYGZGtBvJA-Q9Y",
  authDomain: "static-pages-firebase.firebaseapp.com",
  projectId: "static-pages-firebase",
  storageBucket: "static-pages-firebase.firebasestorage.app",
  messagingSenderId: "148362783826",
  appId: "1:148362783826:web:f3015f9028a0bb91c4438b"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
