const admin = require("firebase-admin");
const serviceAccount = require("./storage-crowdsourcing-firebase-adminsdk-scnap-89dfeba7c9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://storage-crowdsourcing.firebasestorage.app" 
});

const bucket = admin.storage().bucket();

module.exports = bucket;
