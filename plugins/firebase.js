import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyC327fqx-syHTWkh1sJFB5_mbXANjlHW_Y",
    authDomain: "emprendimiento-02-b9df4.firebaseapp.com",
    projectId: "emprendimiento-02-b9df4",
    storageBucket: "emprendimiento-02-b9df4.appspot.com",
    messagingSenderId: "713735354902",
    appId: "1:713735354902:web:242187f8014ec73160d337",
    measurementId: "G-2LQ7QFDP5V"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
}
const db = firebase.firestore()
export { db, firebase }