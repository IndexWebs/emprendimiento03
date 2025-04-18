import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyDLQV1hup5UJw7pYbqFu6eVUQxs6wHn0w8",
    authDomain: "emprendimiento-03-52bab.firebaseapp.com",
    projectId: "emprendimiento-03-52bab",
    storageBucket: "emprendimiento-03-52bab.firebasestorage.app",
    messagingSenderId: "183837083318",
    appId: "1:183837083318:web:e75800407f74a5305c8817",
    measurementId: "G-VCWSH1VYZT"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
}
const db = firebase.firestore()
export { db, firebase }