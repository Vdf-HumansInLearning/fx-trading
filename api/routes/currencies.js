const { response } = require("express");
var express = require("express");
var router = express.Router();

const fs = require("fs");
const path = require("path");

//read from file
let rawdata = fs.readFileSync(path.resolve(__dirname, "../db/currencies.json"));
let fileContents = JSON.parse(rawdata);
const currenciesAvailable = fileContents.currencies_available;
const currenciesRates = fileContents.currency_rates;

//rate = at what rate the user but or sell
/* GET all currencies available in the app */
router.get("/currencies", (req, res) => {
  res.status(200).json(currenciesAvailable);
});

/* GET all currency rates with pairings */
router.get("/currencies/rates", (req, res) => {
  res.status(200).json(currenciesRates);
});

/* POST one base currency */
router.post("/currencies", (req, res) => {
  //get base_cuurency
  //verify if it is in the list of currencies
  if (req.body.base_currency) {
    let foundCurrency = currenciesRates.find(
      (pair) => pair.base_currency === req.body.base_currency
    );
    if (foundCurrency) {
      res.status(200).json(foundCurrency);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});

/* POST one currency pairing */
// {
//   base_currency: "EUR",
//   quote_currency: "RON"
// }
router.post("/currencies/quote", (req, res) => {
  if (req.body.base_currency && req.body.quote_currency) {
    let foundBase = currenciesRates.find(
      (pair) => pair.base_currency === req.body.base_currency
    ).quotes;

    for (item in foundBase) {
      if (item === req.body.quote_currency) {
        res.status(200).json(foundBase[item]);
      }
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});
module.exports = router;