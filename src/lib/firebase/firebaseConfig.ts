// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseUrl: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
} */

const firebaseConfig = {
  apiKey: 'AIzaSyDs5UjfLKDgX46hkOvrDAov_Jk8YyqAz8A',
  authDomain: 'utak-react-test-app.firebaseapp.com',
  databaseURL:
    'https://utak-react-test-app-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'utak-react-test-app',
  storageBucket: 'utak-react-test-app.appspot.com',
  messagingSenderId: '408486339177',
  appId: '1:408486339177:web:c01fbebd68da84f703b8f8',
  measurementId: 'G-8FKXH71YEF',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }

export default app
