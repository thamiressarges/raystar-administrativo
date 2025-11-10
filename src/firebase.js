import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHddTIY1Usn_1cP0SQvOUZ7BNsCyznWp8",
  authDomain: "raystar-4f34f.firebaseapp.com",
  projectId: "raystar-4f34f",
  storageBucket: "raystar-4f34f.firebasestorage.app",
  messagingSenderId: "834034181935",
  appId: "1:834034181935:web:0436db2e602b9a4afda3da",
  measurementId: "G-BWJNZK0M0Y"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
