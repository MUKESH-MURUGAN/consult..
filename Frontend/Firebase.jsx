// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// (Optional) Only if you want analytics
import { getAnalytics } from "firebase/analytics";
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBVk6WjxJY-mQjEBZG3wYfAZ1x0gO4AfaA",
  authDomain: "black-peoko.firebaseapp.com",
  projectId: "black-peoko",
  storageBucket: "black-peoko.firebasestorage.app",
  messagingSenderId: "984473539773",
  appId: "1:984473539773:web:87a24e59759e35d65ed3d4",
  measurementId: "G-3SKWR0W1CG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app); // optional
const db = getFirestore(app);


export {auth,db, doc, setDoc, getDoc, updateDoc };
// export { db};
