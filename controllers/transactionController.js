const bitcoin = require("bitcoinjs-lib");
const axios = require("axios");
const Insight = require('bitcore-explorers').Insight;
const walletController = require("walletController.js");

let transactionFunctions = {
    createTransaction: async (senderAddress, recepientAddress, sendAmount, privateKeyString) => {
        let tx = new bitcoin.TransactionBuilder()
        
        let unspentAmount = 0;
        let transactionListIndex = 0;
        let unspentTransactions = [];
        let transactionSize = ( 34 * 2 ) + 1;
        let minerFee = 0;

        while (unspentAmount < (sendAmount + minerFee)) {
            let transaction = await axios.get("/api/wallets/transactions/" + senderAddress + "?limit=" + (transactionListIndex + 1))[transactionListIndex];
            let outputIndex = 0
            
            while (transaction.out[outputIndex] !== senderAddress) {
                outputIndex++;
            }

            if (!transaction.out[outputIndex].spent) {
                let outArrayIndex = transaction.out[outputIndex].n;
                let unspentTransactionObject = {
                    id: transaction.hash,
                    n: outArrayIndex
                };
                unspentTransactions.push(unspentTransactionObject)
            }

            transactionSize = transactionSize + 180;
            transactionListIndex++;
            minerFee = Math.trunc(sendAmount / transactionSize) + 1;
        }


        
        //need sender address
        //need previous transaction ID
        //sender address transaction outArray index
        for (let i in unspentTransactions) {   
            tx.addInput( unspentTransactions[i].id, unspentTransactions[i].n )
        }

        tx.addOutput( recepientAddress , sendAmount);
        tx.addOutput( senderAddress, balance - sendAmount - minerFee);

        let keyPair = bitcoin.ECPair.fromWIF(privateKeyString);
        tx.sign(0, keyPair);
        tx.build.toHex();

        

        let insight = new Insight();

        insight.broadcast(tx, function(err, returnedTxId) {
            if (err) {
                return false;

            } else {
                return returnedTxId;
            }
        });
    }
}

module.exports = transactionFunctions;