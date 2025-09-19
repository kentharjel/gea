// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg5gd54VMLpv6YIkTw4uHimID-7V_dfhQ",
  authDomain: "schoolsched-d1d37.firebaseapp.com",
  projectId: "schoolsched-d1d37",
  storageBucket: "schoolsched-d1d37.firebasestorage.app",
  messagingSenderId: "954380090140",
  appId: "1:954380090140:web:a5bcf677474dd1c02398d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)