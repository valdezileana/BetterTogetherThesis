import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDIa6--Bt0NCJV6JoF_AhWEUH--olJ4JQo",
    authDomain: "bettertogether-297911.firebaseapp.com",
    projectId: "bettertogether-297911",
    storageBucket: "bettertogether-297911.appspot.com",
    messagingSenderId: "1062980169347",
    appId: "1:1062980169347:web:8aa32a70c0db4c718db5b6",
    measurementId: "G-YWP0PHWR1Q"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;