<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
  import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBd_AOHNKC4hCN8mZMySklgty2qIVhoRNo",
    authDomain: "ilcorvoreal.firebaseapp.com",
    projectId: "ilcorvoreal",
    storageBucket: "ilcorvoreal.appspot.com",
    messagingSenderId: "199930908947",
    appId: "1:199930908947:web:ff3e9b2c688abb9cd03da1",
    measurementId: "G-43Q7DRYD9F"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("Usuario logueado:", user.uid);

      const userRef = doc(db, "usuarios", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const datos = userSnap.data();
        console.log("Datos del usuario:", datos);

        document.getElementById("nombre").textContent = datos.nombre || "Sin nombre";
        document.getElementById("correo").textContent = datos.correo || user.email || "Sin correo";
        document.getElementById("telefono").textContent = datos.telefono || "Sin teléfono";
        document.getElementById("carrera").textContent = datos.carrera || "Sin carrera";
        document.getElementById("universidad").textContent = datos.universidad || "Sin universidad";
      } else {
        console.error("No se encontró el documento del usuario en Firestore");
      }
    } else {
      console.warn("No hay usuario logueado");
      window.location.href = "login.html"; // Redirige si no hay usuario logueado
    }
  });
</script>
