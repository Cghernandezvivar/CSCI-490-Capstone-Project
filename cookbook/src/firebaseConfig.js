// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCgBu1-io5u9To-pUDUsIcqnq5qAK9qw1c",
	authDomain: "capstoneproject-817ae.firebaseapp.com",
	projectId: "capstoneproject-817ae",
	storageBucket: "capstoneproject-817ae.firebasestorage.app",
	messagingSenderId: "1050450687748",
	appId: "1:1050450687748:web:2e8beda494252650328251",
	measurementId: "G-KVG8SK564S"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
console.log("Firebase Auth Instance:", auth);

export default app;
