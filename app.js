// ✅ Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD1hOr3ucQr2kRmcxjbt3KL-3r7cQm80oE",
  authDomain: "lingualink-d1d55.firebaseapp.com",
  databaseURL: "https://lingualink-d1d55-default-rtdb.firebaseio.com",
  projectId: "lingualink-d1d55",
  storageBucket: "lingualink-d1d55.firebasestorage.app",
  messagingSenderId: "938324626969",
  appId: "1:938324626969:web:29243bdcac60a2017ba488",
  measurementId: "G-ZM52VP79GN"
};

// Initialize Firebase App
firebase.initializeApp(firebaseConfig);

// ✅ Firebase Authentication
const auth = firebase.auth();

// Handle Sign Up
function signUp() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Account created successfully!");
      window.location.href = "main.html";
    })
    .catch((error) => {
      alert("Firebase Error: " + error.message);
    });
}

// Handle Login
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Welcome back!");
      window.location.href = "main.html";
    })
    .catch((error) => {
      alert("Firebase Error: " + error.message);
    });
}

// Handle Logout
function logout() {
  auth.signOut().then(() => {
    alert("Logged out successfully!");
    window.location.href = "index.html";
  });
}
