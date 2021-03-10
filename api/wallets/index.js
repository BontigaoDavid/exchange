let express = require("express");
let router = express.Router();
let walletRoutes = require("./wallets.js");
let transactionRoutes = require("./transactions");

router.get("/:address", walletRoutes.get);

router.use("/transactions", transactionRoutes)

module.exports = router;