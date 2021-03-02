const admin = require('firebase-admin');

const serviceAccount = require('../firebase-private-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

let firebaseController = {
  getDocFromDatabase: async (database, docID) => {
    let document = await db.collection(database).doc(docID).get();

    return document.data();
  },
  createDocument: async (database, document, data) => {
    let res = await db.collection(database).doc(document).set(data);

    return res;
  }
}

module.exports = firebaseController;