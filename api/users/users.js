const admin = require('firebase-admin');

var serviceAccount = require('../../firebase-private-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://project-id.firebaseio.com",
    authDomain: "project-id.firebaseapp.com",
});

let controller = {
    get: (req, res) => {
        res.send("API/USERS/ get RESPONSE")
    },
    post: (req, res) => {
        res.send("API/USERS/ post RESPONSE")
    },
    put: (req, res) => {
        res.send("API/USERS/ put RESPONSE")
    },
    delete: (req, res) => {
        res.send("API/USERS/ delete RESPONSE")
    }
}

module.exports = controller;