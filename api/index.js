let express = require("express");
let router = express.Router();
let userRoutes = require("./users");
const encryptor = require("../controllers/encryption.js");

let publicKey = encryptor.publicKey;

router.get("/", function (req, res) {
    res.send(publicKey);
});

router.use("/users", userRoutes);

module.exports = router;