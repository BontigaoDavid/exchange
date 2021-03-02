import crypto from "crypto";

export default {
    publicEncrypt: (key, data) => {
        let encryptedData = crypto.publicEncrypt(
            {
                key: key,
                padding: crypto.constants.RSA_NO_PADDING,
                oaepHash: "sha256",
            }, Buffer.from(data)).toString("base64");

        
        return (encryptedData);
    }
}