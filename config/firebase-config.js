const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyBzlIlXL7xVRbWNyjftSZVESzmhmc41Rtk",
  authDomain: "storage-crowdsourcing.firebaseapp.com",
  projectId: "storage-crowdsourcing",
  storageBucket: "storage-crowdsourcing.firebasestorage.app",
  messagingSenderId: "588895028540",
  appId: "1:588895028540:web:23b2767818dce545d90a39",
  measurementId: "G-5S2HH1TJNH",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = storage;
