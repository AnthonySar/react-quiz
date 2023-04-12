import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBE5_qo8oBvaXHcnLQFD3IT6egRbXAKsU4",
  authDomain: "react-fun-85e1f.firebaseapp.com",
  projectId: "react-fun-85e1f",
  storageBucket: "react-fun-85e1f.appspot.com",
  messagingSenderId: "161111490973",
  appId: "1:161111490973:web:28faf7388b5cdc8a2daf74"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore();
export const user = (uid) => doc(firestore, `users/${uid}`);
