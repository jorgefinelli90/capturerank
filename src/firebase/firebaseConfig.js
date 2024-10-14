// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLP97dNccPS_2KzYuUKSOHunouXGDzGwA",
  authDomain: "capturerank.firebaseapp.com",
  projectId: "capturerank",
  storageBucket: "capturerank.appspot.com",
  messagingSenderId: "358012194714",
  appId: "1:358012194714:web:06cca2d81d014273c7f423",
  measurementId: "G-H1C06HMSC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);