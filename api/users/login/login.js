const firebaseController = require("../../../controllers/firebaseController.js");
const encryptor = require("../../../controllers/encryption.js");


let publicKey = encryptor.publicKey;


let loginFunctions = {
    get:  async (req, res) => {
        let email = req.params.email;
        let user = await firebaseController.getDocFromDatabase("users", email);
        response = {
            firstname: user.firstname,
            email: user.email,
            publicKey: publicKey
        }

        res.send(response);
    },
    post: (req, res) => {
        let encryptedCredentials = Buffer.from(req.body.hash);

        console.log(encryptedCredentials);
        console.log(encryptor.privateDecrypt(encryptedCredentials));
        

        res.send("api/users/login post response");
    },
    put: (req, res) => {
        res.send("API/USERS/login put RESPONSE")
    },
    delete: (req, res) => {
        res.send("API/USERS/login delete RESPONSE")
    }
}

module.exports = loginFunctions;