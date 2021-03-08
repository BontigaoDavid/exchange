const walletController = require("../../../controllers/walletController.js");


let transactionFunctions = {
    get: async (req, res) => {
        let limit = 10
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }

        let address = req.params.address;

        

        let transactions = await walletController.getWalletTransactions(address, limit);

        console.log(typeof transactions);
        res.json(transactions);
    }
}

module.exports = transactionFunctions