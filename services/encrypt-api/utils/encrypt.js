const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = crypto.createHash("sha256").update("super_secret_key").digest();

function encrypt(data) {

    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return {
        iv: iv.toString("hex"),
        data: encrypted.toString("hex")
    };
}

module.exports = encrypt;