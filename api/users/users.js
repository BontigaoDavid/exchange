const firebaseController = require("../../controllers/firebaseController.js");
const encryptor = require("../../controllers/encryption.js");
const bcrypt = require("bcrypt");

let userFunctions = {
    get: async (req, res) => {
        res.send("api/users get request")
    },
    post: async (req, res) => {
        let encryptedUserObj = req.body.hash;

        let user = JSON.parse(encryptor.privateDecrypt(encryptedUserObj));

        let userPassword = user.password;
        delete user.password

        bcrypt.hash(userPassword, 10, (err, hash) => {
            console.log(hash)
            user.hash = hash;
            firebaseController.createDocument("users", user.email, user).then(() => {
                res.send(true);
            });
        });
    },
    put: (req, res) => {
        res.send("API/USERS/ put RESPONSE")
    },
    delete: (req, res) => {
        res.send("API/USERS/ delete RESPONSE")
    }
}

module.exports = userFunctions;