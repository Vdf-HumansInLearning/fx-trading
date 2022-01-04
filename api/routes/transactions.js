var express = require("express");
var router = express.Router();

const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const filePath = "../db/transactions.json";

/* GET transactions */
router.get("/transactions", (req, res) => {
  let jsonData = readFromFile(filePath);
  let transactions = jsonData.transactions;
  res.status(200).send(transactions);
});

/* POST transactions */
router.post("/transactions", (req, res) => {
  let jsonData = readFromFile(filePath);
  let transactions = jsonData.transactions;

  if (
    req.body.username &&
    req.body.ccy_pair &&
    req.body.rate &&
    req.body.action &&
    req.body.notional &&
    req.body.tenor &&
    req.body.trans_date
  ) {
    let transaction = {
      id: uuid.v4(),
      username: req.body.username,
      ccy_pair: req.body.ccy_pair,
      rate: req.body.rate,
      action: req.body.action,
      notional: req.body.notional,
      tenor: req.body.tenor,
      transDate: req.body.transDate,
    };
    let isValid = validateTransaction(transaction);
    if (isValid) {
      transactions.push(transaction);
      let result = writeToFile(jsonData, filePath);
      if (result) {
        res
          .status(200)
          .send({ message: "Transaction registered successfully" });
      } else {
        res.status(417).send({ result });
      }
    } else {
      res.status(400).send({ message: "Not valid fields" });
    }
  } else {
    res.status(400).send({ message: "Bad request" });
  }
});

function validateTransaction(transaction) {
  const regexUsername = /^[a-zA-Z ,.'-]{4,30}$/;
  const regexCcyPair = /[A-Z]{3}\/[A-Z]{3}/;
  const tenorOptions = ["Spot", "1M", "3M"];
  const actionOptions = ["sell", "buy"];

  const rate = Number(transaction.rate);
  const notional = Number(transaction.notional);

  if (!regexUsername.test(transaction.username)) return false;
  else if (!regexCcyPair.test(transaction.ccy_pair)) return false;
  else if (actionOptions.indexOf(transaction.action) === -1) return false;
  else if (tenorOptions.indexOf(transaction.tenor) === -1) return false;
  else if (isNaN(rate)) return false;
  else if (isNaN(notional)) return false;
  else return true;
}
// write data to a json file
function writeToFile(content, relPath) {
  fs.writeFile(
    path.resolve(__dirname, relPath),
    JSON.stringify(content, null, 2),
    function (err) {
      if (err) {
        return err;
      } else {
        return true;
      }
    }
  );
}
// return the data from a json file
function readFromFile(relPath) {
  let rawdata = fs.readFileSync(path.resolve(__dirname, relPath));
  let data = JSON.parse(rawdata);
  return data;
}
module.exports = router;
