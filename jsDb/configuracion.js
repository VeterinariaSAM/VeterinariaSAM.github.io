// configuracion.js

// Inicializa Firebase con la configuración
firebase.initializeApp({
  apiKey: "AIzaSyAPJglEXod86d1WnNDOH4NUgJxcePFnRrQ",
  authDomain: "veterinaria-8174c.firebaseapp.com",
  projectId: "veterinaria-8174c",
  storageBucket: "veterinaria-8174c.appspot.com",
  messagingSenderId: "395802423629",
  appId: "1:395802423629:web:37bb2c198682c8fd5e4704"
});

// Exporta el objeto de configuración (opcional)
window.firebaseConfig = firebase.app().options;

// Inicializa Firestore y Auth (opcional, si los usas)
var db = firebase.firestore();
var auth = firebase.auth();
