const admin = require('firebase-admin');

const serviceAccount = require('../../firebase-private-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

let controller = {
    get: async (req, res) => {
        let email = req.params.email;

        let user = (await db.collection("users").doc(email).get()).data();
        
        res.send(user.firstname);
    },
    post: async (req, res) => {
        let user = req.body;

        await db.collection("users").doc(user.email).set(user);
        res.send("user created \n" + JSON.stringify(user));
    },
    put: (req, res) => {
        res.send("API/USERS/ put RESPONSE")
    },
    delete: (req, res) => {
        res.send("API/USERS/ delete RESPONSE")
    }
}

module.exports = controller;