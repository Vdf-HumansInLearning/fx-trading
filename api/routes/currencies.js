var express = require("express");
var router = express.Router();

const fs = require("fs");
const path = require("path");

/* GET all currencies available in the app */
router.get("/currencies", (req, res) => {
  let rawdata = fs.readFileSync(
    path.resolve(__dirname, "../db/currencies.json")
  );
  let fileContents = JSON.parse(rawdata);
  const currenciesAvailable = fileContents.currencies_available;
  res.status(200).json(currenciesAvailable);
});

/* GET all currency rates with pairings */
router.get("/currencies/rates", (req, res) => {
  let rawdata = fs.readFileSync(
    path.resolve(__dirname, "../db/currencies.json")
  );
  let fileContents = JSON.parse(rawdata);
  const currenciesRates = fileContents.currency_rates;
  res.status(200).json(currenciesRates);
});

/* GET all currency pairings */
router.get("/currencies/pairs", (req, res) => {
  let rawdata = fs.readFileSync(
    path.resolve(__dirname, "../db/currencies.json")
  );
  let fileContents = JSON.parse(rawdata);
  const currenciesPairings = fileContents.currency_pairings;
  res.status(200).json(currenciesPairings);
});

/* POST one base currency */
router.post("/currencies", (req, res) => {
  let rawdata = fs.readFileSync(
    path.resolve(__dirname, "../db/currencies.json")
  );
  let fileContents = JSON.parse(rawdata);
  const currenciesRates = fileContents.currency_rates;
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
  let rawdata = fs.readFileSync(
    path.resolve(__dirname, "../db/currencies.json")
  );
  let fileContents = JSON.parse(rawdata);
  const currenciesRates = fileContents.currency_rates;
  if (req.body.base_currency && req.body.quote_currency) {
    let foundBase = currenciesRates.find(
      (pair) => pair.base_currency === req.body.base_currency
    ).quotes;

    for (item in foundBase) {
      if (item === req.body.quote_currency) {
        res.status(200).json({
          sell: (Math.random() * (foundBase[item].sell + 0.1 - (foundBase[item].sell - 0.1)) + (foundBase[item].sell - 0.1)).toFixed(2),
          buy: (Math.random() * (foundBase[item].buy + 0.1 - (foundBase[item].buy - 0.1)) + (foundBase[item].buy - 0.1)).toFixed(2)
        });
      }
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});
module.exports = router;
