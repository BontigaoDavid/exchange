const bitcoin = require("bitcoinjs-lib");
const axios = require("axios");
const Insight = require('bitcore-explorers').Insight;
const walletController = require("./walletController.js");

let transactionFunctions = {
    createTransaction: async (senderAddress, recepientAddress, sendAmount, privateKeyString) => {
        let tx = new bitcoin.TransactionBuilder()
        
        let unspentAmount = 0;
        let transactionListIndex = 0;
        let unspentTransactions = [];
        let transactionSize = ( 34 * 2 ) + 1;
        let minerFee = 0;
        
        
        while (unspentAmount < (sendAmount + minerFee)) {
            console.log("unspentAmount: " + unspentAmount + "sendAmount: " + sendAmount + "minerFee: " + minerFee)
            let transactionArray = await walletController.getWalletTransactions(senderAddress,(transactionListIndex + 1));
            let outputIndex = 0;
            

            let transaction = transactionArray[transactionListIndex];
            
            console.log(transaction);

            if (transaction.result) {
                //find outArrayIndex
                let outArray = transaction.out;
                let outArrayIndex = 0

                for (let i in outArray) {
                    if (outArray[i] === senderAddress) {
                        outArrayIndex = i;
                    }
                }

                //unspentTransactionObject
                let unspentTransactionObject = {
                    id: transaction.hash,
                    n: outArrayIndex
                }; 
                unspentTransactions.push(unspentTransactionObject);

                //add result to unspentAmount
                unspentAmount = unspentAmount + transaction.result;

                // increase transaction size by one input (180bytes)
                transactionSize = transactionSize + 180;
            }

           

            //if result is positive then 
            // find outArray index 
            // add unspent transaction object
            // add result to unspend amount 
            // increase transaction size by one input (180bytes)
            
            // if result is not then skip transaction

            //increment transactionlistindex


            // console.log(transaction.out);
            
            transactionListIndex++;
        }

        //calculate mining fee
        minerFee = Math.trunc(sendAmount / transactionSize) + 1;
        
        
        
        //need sender address
        //need previous transaction ID
        //sender address transaction outArray index
        for (let i in unspentTransactions) {   
            tx.addInput( unspentTransactions[i].id, unspentTransactions[i].n )
        }
        
        tx.addOutput( recepientAddress , sendAmount);
        tx.addOutput( senderAddress, unspentAmount - sendAmount - minerFee);
        
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