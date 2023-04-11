// Import the functions you need from the SDKs you need
// Add SDKs for Firebase products that you want to use:
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  query,
} from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXhQ3IlbeYTrIRk00iC8G7iLbnuH1hnaU",
  authDomain: "react-commerce-51a5e.firebaseapp.com",
  projectId: "react-commerce-51a5e",
  storageBucket: "react-commerce-51a5e.appspot.com",
  messagingSenderId: "919577709111",
  appId: "1:919577709111:web:13413591325d9201970db2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Google Auth
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Communicate with Firebase
export const auth = getAuth(firebaseApp);

// Sign in with popup using Google
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// Sign in with Google redirect
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// Create DB
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const queryCollection = query(collectionRef);

  const querySnapshot = await getDocs(queryCollection);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback);
