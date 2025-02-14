// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2OjfFS1MaXAgeoO6sqllmh77KPuNDlG4",
  authDomain: "chobegraphy-b562d.firebaseapp.com",
  projectId: "chobegraphy-b562d",
  storageBucket: "chobegraphy-b562d.firebasestorage.app",
  messagingSenderId: "528914167358",
  appId: "1:528914167358:web:b98d55601529d34d50036f",
  measurementId: "G-BTT5JE3E5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app