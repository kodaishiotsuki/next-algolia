import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADwkU4pWckCDz3R69rznh_Hawx2hUbv98",
  authDomain: "dev-next-algolia.firebaseapp.com",
  projectId: "dev-next-algolia",
  storageBucket: "dev-next-algolia.appspot.com",
  messagingSenderId: "1003217888075",
  appId: "1:1003217888075:web:4e75f8b04f8d7b95a6fece",
  measurementId: "G-QFC5ZMVKFE",
};

// Initialize Firebase
if(!getApps()?.length){
  initializeApp(firebaseConfig);
}

export const storage = getStorage();
export const auth = getAuth();
export const functions = getFunctions();
export const db = getFirestore();
