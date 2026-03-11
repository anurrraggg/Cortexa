const express = require("express");
const fs = require("fs");

const decrypt = require("../utils/decrypt");

const router = express.Router();

router.post("/fetch", (req, res) => {

    try {

        const { hash } = req.body;

        const file = fs.readFileSync(`data/${hash}.json`);

        const record = JSON.parse(file);

        const decrypted = decrypt(record.data, record.iv);

        res.send(decrypted);

    } catch (err) {

        res.status(404).json({
            error: "Data not found"
        });

    }

});

module.exports = router;