// archivo: firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnq4w726_lTd9DLP7A6Wgw0yoJVkK__Pc",
  authDomain: "life-mx.firebaseapp.com",
  projectId: "life-mx",
  storageBucket: "life-mx.appspot.com",
  messagingSenderId: "1094128453155",
  appId: "1:1094128453155:web:504ba9088d963691b09396"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

