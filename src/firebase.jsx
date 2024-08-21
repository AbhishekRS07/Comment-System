import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCWjoKakyissL8B0CuR3RZm4eQGG6j-2GI",
  authDomain: "alter-b12c1.firebaseapp.com",
  projectId: "alter-b12c1",
  storageBucket: "alter-b12c1.appspot.com",
  messagingSenderId: "800785222727",
  appId: "1:800785222727:web:532f1ff4bc7e41c4eb3562",
  measurementId: "G-MWNC5HSG3N"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const googleAuthProvider = new GoogleAuthProvider();