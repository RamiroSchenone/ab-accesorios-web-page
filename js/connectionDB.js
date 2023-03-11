import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js';
import {
     getFirestore,
     getDocs,
     collection
} from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js';

const firebaseConfig = {
     apiKey: 'AIzaSyDadgtAcB2f-FABKkPYYEU-WknOAC6fftk',
     authDomain: 'ab-accesorios.firebaseapp.com',
     projectId: 'ab-accesorios',
     storageBucket: 'ab-accesorios.appspot.com',
     messagingSenderId: '412395209948',
     appId: '1:412395209948:web:4f75be722c1d8600f5e019',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const onGetProducts = () => getDocs(collection(db, 'products'));
