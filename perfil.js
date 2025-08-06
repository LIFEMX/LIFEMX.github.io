import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, addDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnq4w726_lTd9DLP7A6Wgw0yoJVkK__Pc",
  authDomain: "life-mx.firebaseapp.com",
  projectId: "life-mx",
  storageBucket: "life-mx.appspot.com",
  messagingSenderId: "1094128453155",
  appId: "1:1094128453155:web:504ba9088d963691b09396"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let currentUser;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    document.getElementById("nombreUsuario").innerText = user.displayName || "Sin nombre";
    document.getElementById("emailUsuario").innerText = user.email;
    mostrarFoto(user.uid);
    mostrarResenas(user.uid);
  } else {
    window.location.href = "index.html";
  }
});

window.cerrarSesion = () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};

window.subirFotoPerfil = async () => {
  const archivo = document.getElementById("fotoInput").files[0];
  if (!archivo || !currentUser) return;

  const storageRef = ref(storage, `fotos_perfil/${currentUser.uid}`);
  await uploadBytes(storageRef, archivo);
  const url = await getDownloadURL(storageRef);

  await setDoc(doc(db, "usuarios", currentUser.uid), { fotoURL: url }, { merge: true });
  document.getElementById("fotoPerfil").src = url;
};

async function mostrarFoto(uid) {
  const docSnap = await getDoc(doc(db, "usuarios", uid));
  if (docSnap.exists() && docSnap.data().fotoURL) {
    document.getElementById("fotoPerfil").src = docSnap.data().fotoURL;
  }
}

window.enviarResena = async () => {
  const texto = document.getElementById("opinionInput").value;
  if (!texto || !currentUser) return;

  await addDoc(collection(db, "resenas"), {
    uid: currentUser.uid,
    texto: texto,
    fecha: new Date()
  });

  document.getElementById("opinionInput").value = "";
  mostrarResenas(currentUser.uid);
};

async function mostrarResenas(uid) {
  const contenedor = document.getElementById("resenasContainer");
  contenedor.innerHTML = "";

  const q = query(collection(db, "resenas"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(doc => {
    const div = document.createElement("div");
    div.classList.add("resena");
    div.innerText = doc.data().texto;
    contenedor.appendChild(div);
  });
}
