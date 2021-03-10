const walletController = require("../../controllers/walletController.js");

let walletFunctions = {
    get: async (req, res) => {

        let address = req.params.address;
        
        let balance = await walletController.getWalletBalance(address);
        res.json(balance);
    }
}

module.exports = walletFunctions