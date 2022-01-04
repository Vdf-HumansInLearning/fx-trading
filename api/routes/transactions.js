var express = require("express");
var router = express.Router();

const fs = require("fs");
const path = require("path");

/* GET transactions */
router.get("/transactions", (req, res) => {
  let rawdata = fs.readFileSync(
    path.resolve(__dirname, "../db/transactions.json")
  );

  let transactionList = JSON.parse(rawdata);
  let transactions = transactionList.transactions;
  console.log(transactions);
});

module.exports = router;
