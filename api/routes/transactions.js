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
  filteredTransactions = transactions.filter(tran => tran.date === req.query.date)
  .filter(tran => tran.ccyPair === req.query.ccyPair);

  res.send(filteredTransactions);
});

module.exports = router;
