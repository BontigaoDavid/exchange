const axios = require("axios");

module.exports = {
    getWalletBalance: async address => {
        let response = await axios.get("https://blockchain.info/rawaddr/" + address + "?limit=0");
        let balance = response.data.final_balance;
        return balance;
    },
    getWalletTransactions: async (address, limit) => {
        let response = await axios.get("https://blockchain.info/rawaddr/" + address + "?limit=" + limit);
        let transactions = response.data.txs;
        return transactions;
    }
}