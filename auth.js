alert("auth.js loaded");
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNR5Td6W_7TAjfRhoJzYrGJMgy3Ff_E1Q",
  authDomain: "nexthour-3248f.firebaseapp.com",
  projectId: "nexthour-3248f",
  storageBucket: "nexthour-3248f.firebasestorage.app",
  messagingSenderId: "83247480758",
  appId: "1:83247480758:web:27f8f8507273d54ee44b17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
[1:31 PM, 1/2/2026] tushar: import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// HELPERS
function show(id) {
  document.getElementById(id).classList.remove("hidden");
}
function hide(id) {
  document.getElementById(id).classList.add("hidden");
}

// SIGNUP
window.signup = async function () {
  const email = email.value;
  const password = password.value;
  const role = document.getElementById("role").value;

  const result = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", result.user.uid), {
    email,
    role
  });

  alert("Signup successful");
};

// LOGIN
window.login = async function () {
  await signInWithEmailAndPassword(auth, email.value, password.value);
};

// GOOGLE LOGIN
window.googleLogin = async function () {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  await setDoc(doc(db, "users", result.user.uid), {
    email: result.user.email,
    role: "customer"
  }, { merge: true });
};

// LOGOUT
window.logout = async function () {
  await signOut(auth);
};

// AUTH STATE
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    show("authSection");
    hide("customerDashboard");
    hide("sellerDashboard");
    return;
  }

  hide("authSection");

  const snap = await getDoc(doc(db, "users", user.uid));
  const role = snap.data().role;

  if (role === "seller") {
    show("sellerDashboard");
    hide("customerDashboard");
  } else {
    show("customerDashboard");
    hide("sellerDashboard");
  }
});
