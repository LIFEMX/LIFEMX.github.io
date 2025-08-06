// archivo: auth.js
import { auth } from './firebaseConfig.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = 'dashboard.html';
  }
});

export function registrarse() {
  const email = document.getElementById('emailRegister').value;
  const password = document.getElementById('passwordRegister').value;
  createUserWithEmailAndPassword(auth, email, password)
    .catch(e => document.getElementById('mensaje').innerText = e.message);
}

export function iniciarSesion() {
  const email = document.getElementById('emailLogin').value;
  const password = document.getElementById('passwordLogin').value;
  signInWithEmailAndPassword(auth, email, password)
    .catch(e => document.getElementById('mensaje').innerText = e.message);
}
