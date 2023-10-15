// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBULZSnZUtD8ByiBcDhy_WXAoZcbZwh5N4",
  authDomain: "trustbook-12d42.firebaseapp.com",
  projectId: "trustbook-12d42",
  storageBucket: "trustbook-12d42.appspot.com",
  messagingSenderId: "784466792469",
  appId: "1:784466792469:web:8546c29591c2f8f0447e1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default app