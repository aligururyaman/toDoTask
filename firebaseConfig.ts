import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBurMdjdvfKePft52ffw49X_OPsleb2h5I",
  authDomain: "habithub-424008.firebaseapp.com",
  projectId: "habithub-424008",
  storageBucket: "habithub-424008.appspot.com",
  messagingSenderId: "320309414774",
  appId: "1:320309414774:web:9fa8e54bf3ca654359c857",
  measurementId: "G-6XX0NTZ8X8",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

export const addToUserCollection = async (userId: string, item: any) => {
  try {
    const userCollectionRef = collection(
      FIRESTORE_DB,
      "users",
      userId,
      "userData"
    );
    await addDoc(userCollectionRef, item);
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};
