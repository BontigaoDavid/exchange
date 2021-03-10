const RSA = require("node-rsa");

let privateRSAKey = new RSA();
let publicKey = "";
let isRSACertified = false;

let encryptor = {
    isRSACertified: () => {
        return isRSACertified;
    },
    publicKey: () => {
        return publicKey;
    },
    setKeyPair: (pubKey, privKey) => {
        publicKey = pubKey;
        console.log("Public Key: " + pubKey)
        privateRSAKey.importKey(privKey, "private");
        isRSACertified = true;
    },
    privateDecrypt: (encryptedData) => {    
        let decryptedData = privateRSAKey.decrypt(encryptedData, "utf8");
        
        return decryptedData
    },
    privateEncrypt: (data) => {
        let encryptedData = privateRSAKey.encrypt(data, "base64");

        return encryptedData
    }
}

module.exports = encryptor;

