import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDmKHLl1Nwirqt6BIIRb6vpFSjULgDk1WI",
    authDomain: "starterpack-485fa.firebaseapp.com",
    projectId: "starterpack-485fa",
    storageBucket: "starterpack-485fa.appspot.com",
    messagingSenderId: "142172852516",
    appId: "1:142172852516:web:519a79d8d9fa9251a423b1",
    measurementId: "G-YBQKP3FS3B"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;