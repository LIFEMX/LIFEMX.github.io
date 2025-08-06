// archivo: dashboard.js
import { auth, db } from './firebaseConfig.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

onAuthStateChanged(auth, user => {
  if (!user) window.location.href = 'index.html';
});

document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('menu').classList.toggle('active');
});

export function cerrarSesion() {
  signOut(auth).then(() => window.location.href = 'index.html');
}

const postsDiv = document.getElementById('posts');
const q = query(collection(db, 'intercambios'), orderBy('fecha', 'desc'));
onSnapshot(q, snapshot => {
  postsDiv.innerHTML = '';
  snapshot.forEach(doc => {
    const data = doc.data();
    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `
      <h3>${data.usuario || 'Anónimo'}</h3>
      <p>${data.descripcion}</p>
      ${data.fotos && data.fotos.map(u => `<img src="${u}" alt="">`).join('')}
    `;
    postsDiv.appendChild(post);
  });
});
