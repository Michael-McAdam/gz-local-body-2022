// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDskSa_On794JU73Z7RVii6iw4ps4HHQnU",
  authDomain: "local-body-2022.firebaseapp.com",
  projectId: "local-body-2022",
  storageBucket: "local-body-2022.appspot.com",
  messagingSenderId: "700640751250",
  appId: "1:700640751250:web:995203bd19a3d3b533404b",
  measurementId: "G-4QRWV4XJSB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

export default app;
