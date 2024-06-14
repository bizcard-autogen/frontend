import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBOtesR0g6AKVKB8DQqjJLUtjvux8gtA-0',
  authDomain: 'garnet3106-bizcard.firebaseapp.com',
  projectId: 'garnet3106-bizcard',
  storageBucket: 'garnet3106-bizcard.appspot.com',
  messagingSenderId: '62558667128',
  appId: '1:62558667128:web:ac3ac7a6c58e20fdf9488d',
  measurementId: 'G-0912989BSB'
};

export const firebaseApp = initializeApp(config);
export const db = getFirestore(firebaseApp);
