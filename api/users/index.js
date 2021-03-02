let express = require("express");
let router = express.Router();
let userRoutes = require("./users.js");
let loginRoutes = require("./login");

router.get("/:email", userRoutes.get);
router.post("/", userRoutes.post);
router.put("/", userRoutes.put);
router.delete("/", userRoutes.delete);

router.use("/login", loginRoutes)

module.exports = router;