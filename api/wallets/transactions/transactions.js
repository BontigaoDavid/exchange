const walletController = require("../../../controllers/walletController.js");
const transactionController = require("../../../controllers/transactionController");


let transactionFunctions = {
    get: async (req, res) => {
        let limit = 10
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }

        let address = req.params.address;


        let transactions = await walletController.getWalletTransactions(address, limit);
        
        res.json(transactions);
    },
    post: (req, res) => {
        let transactionDetails = req.body
        transactionController.createTransaction( transactionDetails.senderAddress, transactionDetails.recepientAddress, transactionDetails.sendAmount, transactionDetails.privateKeyString).then(id => {
            res.send(id);
        });
    }
}

module.exports = transactionFunctions;