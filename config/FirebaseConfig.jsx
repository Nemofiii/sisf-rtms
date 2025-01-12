// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6ix41GD6JLKO86e1KHFy0L9LB2NLn54w",
  authDomain: "sisf-rtms-new.firebaseapp.com",
  projectId: "sisf-rtms-new",
  storageBucket: "sisf-rtms-new.firebasestorage.app",
  messagingSenderId: "359258317350",
  appId: "1:359258317350:web:d9ca73b331cb27255bfce7",
  measurementId: "G-11C5RHWD75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});