let express = require("express");
let router = express.Router();
let controller = require("./users.js")

router.get("/:email", controller.get);
router.post("/", controller.post);
router.put("/", controller.put);
router.delete("/", controller.delete);

module.exports = router;