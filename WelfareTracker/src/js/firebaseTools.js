import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const { apiKey } = require('../config.json');

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "welfaretracker-df7ad.firebaseapp.com",
  projectId: "welfaretracker-df7ad",
  storageBucket: "welfaretracker-df7ad.appspot.com",
  messagingSenderId: "613338580022",
  appId: "1:613338580022:web:037af07757ff4c5ca70497"
};

const app = initializeApp(firebaseConfig);

export async function authWithEmailAndPassword(login, password) {
  try {
    const auth = getAuth(app);
    await signInWithEmailAndPassword(auth, login, password);
    const uid = auth.currentUser.uid;
    const email = auth.currentUser.email;
    localStorage.setItem('userID', uid);
    localStorage.setItem('userEmail', email);
    const list = new Array();
    localStorage.setItem(`transactions-${uid}`, JSON.stringify(list));
    localStorage.setItem('userBalance', 0);
    return uid;
  }
  catch (message) {
    alert(message);
  }
}

export async function regWithEmailAndPassword(login, password) {
  try {
    const auth = getAuth(app);
    await createUserWithEmailAndPassword(auth, login, password);
    return await authWithEmailAndPassword(login, password);
  }
  catch (message) {
    alert(message);
  }
}