const express = require("express");
const multer = require("multer");
const fs = require("fs");

const encrypt = require("../utils/encrypt");
const generateHash = require("../utils/hash");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
    "/upload",
    upload.fields([
        { name: "csv" },
        { name: "pdf" },
        { name: "image" }
    ]),
    (req, res) => {

        try {

            const label = req.body.label || "";

            const files = req.files;

            const combinedBuffer = Buffer.concat([
                files.csv?.[0]?.buffer || Buffer.alloc(0),
                files.pdf?.[0]?.buffer || Buffer.alloc(0),
                files.image?.[0]?.buffer || Buffer.alloc(0),
                Buffer.from(label)
            ]);

            const hash = generateHash(combinedBuffer);

            const encrypted = encrypt(combinedBuffer);

            const record = {
                hash,
                iv: encrypted.iv,
                data: encrypted.data
            };

            fs.writeFileSync(
                `data/${hash}.json`,
                JSON.stringify(record, null, 2)
            );

            res.json({
                message: "Stored successfully",
                hash
            });

        } catch (err) {

            res.status(500).json({ error: err.message });

        }

    }
);

module.exports = router;