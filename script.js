// Firebase config
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

// Protege el dashboard
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html"; // cambia si tu login tiene otro nombre
  } else {
    cargarPublicaciones();
  }
});

// Menú hamburguesa
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("active");
});

// Cerrar sesión
function cerrarSesion() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}

// Cargar publicaciones falsas por ahora (puedes luego conectarlo a Firestore)
function cargarPublicaciones() {
  const posts = [
    {
      titulo: "Playera vintage",
      descripcion: "Talla M, estilo noventero, 100% algodón.",
      imagen: "https://source.unsplash.com/random/300x200?shirt"
    },
    {
      titulo: "Libro de filosofía",
      descripcion: "Usado pero en buen estado.",
      imagen: "https://source.unsplash.com/random/300x200?book"
    },
    {
      titulo: "Patineta clásica",
      descripcion: "Ideal para coleccionistas.",
      imagen: "https://source.unsplash.com/random/300x200?skateboard"
    }
  ];

  const contenedor = document.getElementById("posts");
  posts.forEach(post => {
    contenedor.innerHTML += `
      <div class="post">
        <img src="${post.imagen}" alt="${post.titulo}">
        <h3>${post.titulo}</h3>
        <p>${post.descripcion}</p>
      </div>
    `;
  });
}
