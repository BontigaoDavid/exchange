import RSA from "node-rsa";

let publicRSAKey = new RSA();



export default {
    publicEncrypt: (key, data) => {
        publicRSAKey.importKey(key, "public");
        let encryptedData = publicRSAKey.encrypt(data, "base64");
        return (encryptedData);
    }
}