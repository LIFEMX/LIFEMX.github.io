console.log("¡Bienvenido a LIFE MX!");

const firebaseConfig = {
  apiKey: "AIzaSyDnq4w726_lTd9DLP7A6Wgw0yoJVkK__Pc",
  authDomain: "life-mx.firebaseapp.com",
  projectId: "life-mx",
  storageBucket: "life-mx.appspot.com",
  messagingSenderId: "1094128453155",
  appId: "1:1094128453155:web:504ba9088d963691b09396"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function registrarse() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      document.getElementById("mensaje").innerText = "¡Registro exitoso!";
      return db.collection("usuarios").doc(userCredential.user.uid).set({
        email: email,
        puntos: 0
      });
    })
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      document.getElementById("mensaje").innerText = "Error: " + error.message;
    });
}

function iniciarSesion() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      document.getElementById("mensaje").innerText = "Error: " + error.message;
    });
}
