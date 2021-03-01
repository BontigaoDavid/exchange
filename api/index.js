let express = require("express");
let router = express.Router();
let userRoutes = require("./users");

router.get("/", function (req, res) {
    res.send("API RESPONSE");
});

router.use("/users", userRoutes);

module.exports = router;