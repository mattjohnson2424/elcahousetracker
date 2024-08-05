import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getFunctions } from "@firebase/functions"
import { getAuth, GoogleAuthProvider } from "@firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCtwIBIC4tf2k_nTqVxG0IG46-qU99jL7U",
    authDomain: "elcahousetracker.firebaseapp.com",
    projectId: "elcahousetracker",
    storageBucket: "elcahousetracker.appspot.com",
    messagingSenderId: "376421980717",
    appId: "1:376421980717:web:22b9a5334960e6ced7f6a4",
    measurementId: "G-2TVZ6X60N2"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)
export const functions = getFunctions(app)

export const provider = new GoogleAuthProvider()