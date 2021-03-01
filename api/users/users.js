
let controller = {
    get: (req, res) => {
        res.send("API/USERS/ get RESPONSE")
    },
    post: (req, res) => {
        let user = req.body;
        console.log(user);
        res.send("api/users post response");
    },
    put: (req, res) => {
        res.send("API/USERS/ put RESPONSE")
    },
    delete: (req, res) => {
        res.send("API/USERS/ delete RESPONSE")
    }
}

module.exports = controller;