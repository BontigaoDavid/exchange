let controller = {
    get: async (req, res) => {
        let email = req.params.email;

        res.send("api/users et request")
    },
    post: async (req, res) => {
        let user = req.body;

        // await db.collection("users").doc(user.email).set(user);
        res.send("user created \n" + JSON.stringify(user));
    },
    put: (req, res) => {
        res.send("API/USERS/ put RESPONSE")
    },
    delete: (req, res) => {
        res.send("API/USERS/ delete RESPONSE")
    }
}

module.exports = controller;