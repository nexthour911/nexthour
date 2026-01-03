import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.signup = async () => {
  if (city.value.toLowerCase() !== "raipur") {
    document.body.innerHTML = `
      <h2>Sorry 😔</h2>
      <p>We are not available in your location yet.</p>
      <p>We will be soon 🚀</p>`;
    return;
  }

  const cred = await createUserWithEmailAndPassword(auth, email.value, password.value);
  await setDoc(doc(db, "users", cred.user.uid), {
    role: role.value,
    city: "Raipur",
    addresses: []
  });

  redirect(role.value);
};

window.login = async () => {
  const cred = await signInWithEmailAndPassword(auth, email.value, password.value);
  const snap = await getDoc(doc(db, "users", cred.user.uid));

  if (snap.data().city !== "Raipur") {
    document.body.innerHTML = `
      <h2>Sorry 😔</h2>
      <p>We are not available in your location yet.</p>`;
    return;
  }

  redirect(snap.data().role);
};

function redirect(role) {
  location.href = role === "seller" ? "seller.html" : "customer.html";
}
