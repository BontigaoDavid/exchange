const axios = require("axios");
const bitcoin = require("bitcoinjs-lib");
const firebaseController = require("../controllers/firebaseController.js");
const encryptor = require("../controllers/encryption.js");

let testnet = bitcoin.networks.testnet;
let mainNet = bitcoin.networks.bitcoin;


module.exports = {
    generateBTCWallet: () => {
        let keypair = bitcoin.ECPair.makeRandom()
        let privateKey = keypair.toWIF();
        let publicKey = keypair.publicKey;
        let { address } = bitcoin.payments.p2pkh({ pubkey: publicKey });
        let walletDetails = {
            address: address,
            privateKey: privateKey,
            publicKey: publicKey.toString("base64")
        };

        return walletDetails
    },
    getWalletBalance: async address => {
        // bech32 wallets do not work
        let response = false;
        response = await axios.get("https://blockchain.info/rawaddr/" + address + "?limit=0").catch(err => response = false);

        if (response) {
            let balance = response.data.final_balance;
            return balance;
        }

        else {
            return false;
        }
    },
    getWalletTransactions: async (address, limit) => {
        let response = {};
        response = await axios.get("https://blockchain.info/rawaddr/" + address + "?limit=" + limit).catch(err => response = false);
        let blockCountResponse = await axios.get("https://blockchain.info/q/getblockcount");
        let currentBlockCount = blockCountResponse.data;

        if (response) {

            let transactions = response.data.txs;
            
            for (let i in transactions) {
                let { block_height, result, time } = transactions[i];
                let transaction = {
                    amount: result,
                    time: time
                }
                
                let isTransactionConfirmed = Boolean(currentBlockCount - block_height);
                transaction.confirmed = isTransactionConfirmed;
                
                //get transaction addresses
                let transactionAddressArray = [];
                
                if (result > 0) {
                    //blockchain OUT Array
                    transactionAddressArray = transactions[i].out;
                }
                
                else {
                    //blockchain in Array
                    transactionAddressArray = transactions[i].out;
                }
                
                for (let j in transactionAddressArray) {
                    let transactionAddressObject = transactionAddressArray[j];
                    let transactionAddress = transactionAddressObject.addr;
                    
                    transactionAddressArray[j] = transactionAddress;
                }
                transaction.addresses = transactionAddressArray;
                
                transactions[i] = transaction;
            }
            
            return transactions;
        }

        else {
            return false
        }
    },
    createTransaction: () => {
        let txb = new bitcoin.TransactionBuilder(mainNet)
    }
}

// let encryptedWalletDetails = encryptor.privateEncrypt(JSON.stringify(walletDetails));