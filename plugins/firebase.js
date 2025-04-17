import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyCZ_9a_7P2Nvb1O5rPqJ9KvI9kW_el4mA0",
    authDomain: "emprendimiento-03.firebaseapp.com",
    projectId: "emprendimiento-03",
    storageBucket: "emprendimiento-03.firebasestorage.app",
    messagingSenderId: "327161056167",
    appId: "1:327161056167:web:fdb89586fb7af5f15b0482",
    measurementId: "G-QGCHGQSM35"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
}
const db = firebase.firestore()
export { db, firebase }