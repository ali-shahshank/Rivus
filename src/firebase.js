import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// variables
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// User Sign-Up
const handleSignUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await addDoc(collection(db, "users"), {
      uid: res.user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    const cleanError = error.code.replace("auth/", "").replace(/-/g, " ");
    console.error("SignUp Error:", cleanError);
    window.alert(cleanError);
  }
};

// User Sign-In
const handleLogIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const cleanError = error.code.replace("auth/", "").replace(/-/g, " ");
    console.error("LoginUp Error:", cleanError);
  }
};

// User Sign-Out
const handleSignOut = () => {
  signOut(auth);
};

// Analytics
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { auth, db, analytics, handleSignUp, handleLogIn, handleSignOut };
