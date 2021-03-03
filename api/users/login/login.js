const firebaseController = require("../../../controllers/firebaseController.js");
const encryptor = require("../../../controllers/encryption.js");
const bcrypt = require("bcrypt");


let publicKey = encryptor.publicKey;


let loginFunctions = {
    get:  async (req, res) => {
        let email = req.params.email;
        let user = await firebaseController.getDocFromDatabase("users", email);
        if (user) {
            response = {
                firstname: user.firstname,
                email: user.email,
                publicKey: publicKey
            }
    
            res.send(response);
        }

        else {
            res.send(false);
        }
    },
    post: (req, res) => {
        let encryptedCredentials = req.body.hash;
        let credentials = JSON.parse(encryptor.privateDecrypt(encryptedCredentials));
        
        firebaseController.getDocFromDatabase("users", credentials.email).then((document) => {
            bcrypt.compare(credentials.password, document.hash, (err, result) => {
                if (result) {
                    res.send(document.hash);
                }
                
                else {
                    res.send(false)
                }
            });
        });
    },
    put: (req, res) => {
        res.send("API/USERS/login put RESPONSE")
    },
    delete: (req, res) => {
        res.send("API/USERS/login delete RESPONSE")
    }
}

module.exports = loginFunctions;