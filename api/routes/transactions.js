var express = require("express");
var router = express.Router();

const fs = require("fs");
const path = require("path");

let rawdata = fs.readFileSync(
  path.resolve(__dirname, "../db/transactions.json")
);

let transactionList = JSON.parse(rawdata);
console.log(transactionList);
let transactions = transactionList.transactions;

/* GET transactions */
router.get("/transactions", (req, res) => {
  console.log(transactions);
});

module.exports = router;
