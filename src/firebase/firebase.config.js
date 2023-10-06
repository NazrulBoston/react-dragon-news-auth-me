// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbGkYcD8c0hDggxYQmNp5DIUt5z6-2XMw",
  authDomain: "react-dragon-news-auth-me.firebaseapp.com",
  projectId: "react-dragon-news-auth-me",
  storageBucket: "react-dragon-news-auth-me.appspot.com",
  messagingSenderId: "1047543934289",
  appId: "1:1047543934289:web:27409ec9b0c68af7a13770"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;