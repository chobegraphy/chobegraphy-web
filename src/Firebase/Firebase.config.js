// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.Next_apiKey,
  authDomain: process.env.Next_authDomain,
  projectId: process.env.Next_projectId,
  storageBucket: process.env.Next_storageBucket,
  messagingSenderId: process.env.Next_messagingSenderId,
  appId: process.env.Next_appId,
  measurementId: process.env.Next_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
