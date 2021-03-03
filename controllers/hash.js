const bcrypt = require("bcrypt");
let saltRounds = 10;

module.exports = {
    hash: async (text) => {
        let hashedData = "";
        await bcrypt.hash(text, saltRounds, function(err, hash) {
            hashedData = hash;
            console.log("1"+hashedData);
            return hashedData;
        })
    },
    compare: async (password, hash) => {
        let match = await bcrypt.compare(password, user.hash);
        return match;
    } 
}