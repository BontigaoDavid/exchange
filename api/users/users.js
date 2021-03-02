const firebaseController = require("../../controllers/firebaseController.js");

let userFunctions = {
    get: async (req, res) => {
        res.send("api/users et request")
    },
    post: async (req, res) => {
        let user = req.body;
        console.log(req.body);
        await firebaseController.createDocument("users", user.email, user).then(() => {
            res.send(true);
        });
    },
    put: (req, res) => {
        res.send("API/USERS/ put RESPONSE")
    },
    delete: (req, res) => {
        res.send("API/USERS/ delete RESPONSE")
    }
}

module.exports = userFunctions;