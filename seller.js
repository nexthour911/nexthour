import { auth, db } from "./firebase.js";
import {
  collection, addDoc, query, where,
  onSnapshot, updateDoc, doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

auth.onAuthStateChanged(user => {
  const oq = query(collection(db, "orders"), where("sellerId", "==", user.uid));

  onSnapshot(oq, snap => {
    orders.innerHTML = "";
    snap.forEach(d => {
      const o = d.data();
      orders.innerHTML += `
        <p>
          ${o.productName} – ${o.status}
          <button onclick="update('${d.id}','accepted')">Accept</button>
          <button onclick="update('${d.id}','rejected')">Reject</button>
          ${o.exchangeRequested ? "<b>Exchange Requested</b>" : ""}
        </p>`;
    });
  });
});

window.addProduct = async () => {
  await addDoc(collection(db, "products"), {
    name: pname.value,
    price: price.value,
    category: category.value,
    city: "Raipur",
    sellerId: auth.currentUser.uid
  });
};

window.update = async (id, status) => {
  await updateDoc(doc(db, "orders", id), {
    status,
    message: status === "rejected"
      ? "Sorry, the product is out of stock"
      : ""
  });
};
