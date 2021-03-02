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
  }
}

module.exports = firebaseController;