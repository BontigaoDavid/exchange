

var serviceAccount = require('../../firebase-private-key.json');


let controller = {
    get: (req, res) => {
        res.send("API/USERS/ get RESPONSE")
    },
    post: (req, res) => {
        let user = req.body;
        console.log(user);
    },
    put: (req, res) => {
        res.send("API/USERS/ put RESPONSE")
    },
    delete: (req, res) => {
        res.send("API/USERS/ delete RESPONSE")
    }
}

module.exports = controller;