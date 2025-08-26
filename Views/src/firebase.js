// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD95dOFZE3Ge0Nk4BQwh79yHngtfDrdPnA",
    authDomain: "muneros-b25cb.firebaseapp.com",
    projectId: "muneros-b25cb",
    storageBucket: "muneros-b25cb.firebasestorage.app",
    messagingSenderId: "340196854244",
    appId: "1:340196854244:web:5be14abdc6709c52781ff1",
    measurementId: "G-4YHG239K1R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);