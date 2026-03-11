const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = crypto.createHash("sha256").update("super_secret_key").digest();

function decrypt(encryptedData, iv) {

    const decipher = crypto.createDecipheriv(
        algorithm,
        key,
        Buffer.from(iv, "hex")
    );

    let decrypted = decipher.update(Buffer.from(encryptedData, "hex"));
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted;
}

module.exports = decrypt;