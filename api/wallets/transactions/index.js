let express = require("express");
let router = express.Router();
let transactionRoutes = require("./transactions.js")

router.get("/:address", transactionRoutes.get);
router.post("/", transactionRoutes.post);
// router.put("/", transactionRoutes.put);
// router.delete("/", transactionRoutes.delete);

module.exports = router;