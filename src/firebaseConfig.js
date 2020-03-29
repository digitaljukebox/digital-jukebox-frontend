import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// firebase init goes here
const config = {
  apiKey: 'AIzaSyAu3v71qDLKEEF4QCpOezDfnJlBMXv3Kno',
  authDomain: 'digital-jukebox.firebaseapp.com',
  databaseURL: 'https://digital-jukebox.firebaseio.com',
  projectId: 'digital-jukebox',
  storageBucket: 'digital-jukebox.appspot.com',
  messagingSenderId: '120161791220',
  appId: '1:120161791220:web:741c8add205d08aad302a1',
  measurementId: 'G-RNTY5528DJ'
};
const app = firebase.initializeApp(config);

// firebase utils
const db = app.firestore();
const auth = app.auth();
const currentUser = auth.currentUser;

const fb = { db, auth, currentUser };

export default fb;
