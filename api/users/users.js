const firebaseController = require("../../controllers/firebaseController.js");
const encryptor = require("../../controllers/encryption.js");
const bcrypt = require("bcrypt");
const walletController = require("../../controllers/walletController.js")

let userFunctions = {
    get: async (req, res) => {
        let userAccessToken = req.header("Authorization");
        let userEmail = req.params.email;

        firebaseController.getDocFromDatabase("users", userEmail).then(document => {
            let userData = document;
            console.log(userAccessToken);
            if(userAccessToken === userData.hash) {
                let userBTCWalletHash = userData.BTCWalletHash;
                let BTCWalletCredentialsString = encryptor.privateDecrypt(userBTCWalletHash);
                let BTCWalletCredentials = JSON.parse(BTCWalletCredentialsString);
                delete BTCWalletCredentials.privateKey;
                userData.BTCWalletCredentials = BTCWalletCredentials; 
                delete userData.BTCWalletHash;
                res.json(userData);
            }

            else {
                res.json(false)
            }
        })
    },
    post: async (req, res) => {
        let encryptedUserObj = req.body.hash;

        let user = JSON.parse(encryptor.privateDecrypt(encryptedUserObj));

        let userPassword = user.password;
        delete user.password

        bcrypt.hash(userPassword, 10, (err, hash) => {
            user.hash = hash;

            let walletDetails = walletController.generateBTCWallet();
            
            let BTCWalletHash = encryptor.privateEncrypt(JSON.stringify(walletDetails)); 

            user.BTCWalletHash = BTCWalletHash;

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