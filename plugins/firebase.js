import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyAHZToS4Q2YPiuTr7chi3saW-GfTkr2wB4",
    authDomain: "emprendimiento-01.firebaseapp.com",
    projectId: "emprendimiento-01",
    storageBucket: "emprendimiento-01.appspot.com",
    messagingSenderId: "1024815169089",
    appId: "1:1024815169089:web:6e38e596c40c69e0f310c0",
    measurementId: "G-8HW8PCKKV6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
}
const db = firebase.firestore()
export { db, firebase }