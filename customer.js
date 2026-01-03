import { auth, db } from "./firebase.js";
import {
  collection, query, where, onSnapshot,
  addDoc, updateDoc, doc, arrayUnion
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const DELIVERY_CHARGE = 0; // add later

auth.onAuthStateChanged(user => {

  const pq = query(collection(db, "products"), where("city", "==", "Raipur"));
  onSnapshot(pq, snap => {
    products.innerHTML = "";
    snap.forEach(d => {
      const p = d.data();
      products.innerHTML += `
        <p>${p.name} ₹${p.price}
        <button onclick="order('${d.id}','${p.name}','${p.sellerId}')">COD</button></p>`;
    });
  });

  const oq = query(collection(db, "orders"), where("userId", "==", user.uid));
  onSnapshot(oq, snap => {
    orders.innerHTML = "";
    snap.forEach(d => {
      const o = d.data();
      orders.innerHTML += `
        <p>${o.productName} – ${o.status}
        <button onclick="exchange('${d.id}')">Exchange</button></p>`;
    });
  });
});

window.order = async (pid, name, sellerId) => {
  await addDoc(collection(db, "orders"), {
    productId: pid,
    productName: name,
    sellerId,
    userId: auth.currentUser.uid,
    status: "pending",
    payment: "COD",
    deliveryCharge: DELIVERY_CHARGE,
    exchangeRequested: false
  });
};

window.exchange = async (id) => {
  await updateDoc(doc(db, "orders", id), {
    exchangeRequested: true,
    exchangeStatus: "pending"
  });
};

window.addAddress = async () => {
  await updateDoc(doc(db, "users", auth.currentUser.uid), {
    addresses: arrayUnion({
      address: addr.value,
      city: "Raipur"
    })
  });
};
