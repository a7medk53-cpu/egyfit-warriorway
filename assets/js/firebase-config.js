/**
 * EgyFit Warrior Way - Firebase Configuration
 * ⚠️ استبدل القيم التالية بإعدادات مشروعك الحقيقي من Firebase Console
 */
const firebaseConfig = {
  apiKey: "AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "egyfit-warriorway.firebaseapp.com",
  projectId: "egyfit-warriorway",
  storageBucket: "egyfit-warriorway.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-XXXXXXXXXX"
};
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
const db = firebase.firestore();
const auth = firebase.auth();
db.enablePersistence().catch((err) => {
  if (err.code === 'failed-precondition') console.log('Persistence failed: Multiple tabs open');
  else if (err.code === 'unimplemented') console.log('Persistence not supported');
});
window.firebase = firebase; window.db = db; window.auth = auth;
console.log('✅ Firebase initialized for EgyFit Warrior Way');
