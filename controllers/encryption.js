const RSA = require("node-rsa");

let nodeRSA = new RSA().generateKeyPair();

let publicKey = nodeRSA.exportKey("public");
let privateKey = nodeRSA.exportKey("private");

let publicRSAKey = new RSA();
let privateRSAKey = new RSA();

publicRSAKey.importKey(publicKey, "public");
privateRSAKey.importKey(privateKey, "private");

module.exports = {
    publicKey: publicKey,
    privateDecrypt: (encryptedData) => {    
        let decryptedData = privateRSAKey.decrypt(encryptedData, "utf8");
        
        return (decryptedData)
    }
}


////////////////////////    Encryption and Decryption
// console.log(publicKey); 
// console.log(privateKey); 

// let data = "Hello World!"
// console.log("Data: " + data);

// let encryptedData = publicRSAKey.encrypt(data, "base64");
// console.log("Encrypted Data: " + encryptedData);

// let decryptedData = privateRSAKey.decrypt(encryptedData, "utf8");
// console.log("Decrypted Data: " + decryptedData);