import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDINRZPmpIFrYqwLjMcYxvvXqOX_4KaROw",
    authDomain: "shearow-second-proyect.firebaseapp.com",
    projectId: "shearow-second-proyect",
    storageBucket: "shearow-second-proyect.appspot.com",
    messagingSenderId: "715072784429",
    appId: "1:715072784429:web:acfdc7ba226f178cb1d0a4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const storage = getStorage(app);