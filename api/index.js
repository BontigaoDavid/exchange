let express = require("express");
let router = express.Router();
let userRoutes = require("./users");
let walletRoutes = require("./wallets");
const encryptor = require("../controllers/encryption.js");

let publicKey = encryptor.publicKey;

router.get("/", function (req, res) {
    res.send(publicKey);
});

router.use("/users", userRoutes);
router.use("/wallets", walletRoutes);

module.exports = router;