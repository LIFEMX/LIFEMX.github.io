// archivo: perfil.js
import { auth, db, storage } from './firebaseConfig.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import { arrayUnion } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

let usuarioUid = '';
onAuthStateChanged(auth, user => {
  if (!user) window.location.href = 'index.html';
  else {
    usuarioUid = user.uid;
    cargarPerfil(usuarioUid);
  }
});

function cargarPerfil(uid) {
  getDoc(doc(db, 'usuarios', uid)).then(docSnap => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      document.getElementById('nombreUsuario').innerText = data.nombre || 'Sin Nombre';
      document.getElementById('emailUsuario').innerText = data.email || '';
      document.getElementById('fotoPerfil').src = data.fotoPerfil || 'https://via.placeholder.com/120';
      cargarResenas(data.reseñas || []);
    }
  });
}

export function subirFotoPerfil() {
  const file = document.getElementById('fotoInput').files[0];
  if (!file) return;
  const imgRef = ref(storage, `fotosPerfil/${usuarioUid}`);
  uploadBytes(imgRef, file).then(() => getDownloadURL(imgRef))
    .then(url => updateDoc(doc(db, 'usuarios', usuarioUid), { fotoPerfil: url }))
    .then(() => location.reload());
}

export function enviarResena() {
  const msg = document.getElementById('opinionInput').value;
  if (!msg) return;
  updateDoc(doc(db, 'usuarios', usuarioUid), {
    reseñas: arrayUnion({ autor: usuarioUid, mensaje: msg, fecha: new Date().toISOString() })
  }).then(() => {
    document.getElementById('opinionInput').value = '';
    cargarPerfil(usuarioUid);
  });
}

function cargarResenas(list = []) {
  const container = document.getElementById('resenasContainer');
  container.innerHTML = '';
  list.forEach(r => {
    const d = document.createElement('div');
    d.className = 'reseña';
    d.innerHTML = `<p>${r.mensaje}</p><small>${new Date(r.fecha).toLocaleString()}</small>`;
    container.appendChild(d);
  });
}

export function cerrarSesion() {
  signOut(auth).then(() => window.location.href = 'index.html');
}
