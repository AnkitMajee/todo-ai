import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDq73EBpXYJxS4V3eDgeh5-27xFs74Pl0I",
  authDomain: "ai-todo-97e36.firebaseapp.com",
  projectId: "ai-todo-97e36",
  storageBucket: "ai-todo-97e36.appspot.com",
  messagingSenderId: "476875158590",
  appId: "1:476875158590:web:702099360e1da9c58f0d6f",
  measurementId: "G-BTCDGK8W92"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getFirestore(app);