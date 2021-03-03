let express = require("express");
let router = express.Router();
let loginRoutes = require("./login.js")

router.get("/:email", loginRoutes.get);
router.post("/", loginRoutes.post);
router.put("/", loginRoutes.put);
router.delete("/", loginRoutes.delete);

module.exports = router;