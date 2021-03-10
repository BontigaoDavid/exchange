const encryptor = require("./encryption.js");
const firebaseController = require("./firebaseController.js");

let serverDetails = {
    BTCWalletHash: "",
    RSAECHash: "",
}

let serverFunctions = {
    getDetails: (req, res) => {
        serverDetails.isRSACertified = encryptor.isRSACertified();
        res.json(serverDetails);
    },
    setRSAKeys: (req, res) => {
        let publicKey = req.body.publicKey;
        let privateKey = req.body.privateKey;
        encryptor.setKeyPair(publicKey, privateKey);
        let credentials = {
            publicKey: publicKey,
            privateKey: privateKey
        }
        let RSACredentialsHash = encryptor.privateEncrypt(JSON.stringify(credentials));
        serverDetails.RSAECHash = RSACredentialsHash;

        firebaseController.createDocument("server", "rsa-ec-hash", { hash: RSACredentialsHash })
        res.send(true);       
    },
    setServerWallet: () => {

    }
}

module.exports = serverFunctions;