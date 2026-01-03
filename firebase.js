import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNR5Td6W_7TAjfRhoJzYrGJMgy3Ff_E1Q",
      authDomain: "nexthour-3248f.firebaseapp.com",
      projectId: "nexthour-3248f",
      appId: "1:83247480758:web:27f8f8507273d54ee44b17"
    };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
