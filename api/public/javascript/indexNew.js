import {
  showLoading,
  hideLoading,
  createIndexPage,
  ccyPairs,
} from "./index.js";

window.onload = () => {
  showLoading();
  const urlPairs = "http://localhost:8080/api/currencies/pairs";
  const urlTransactions = "http://localhost:8080/api/transactions";
  const urlCurrencies = "http://localhost:8080/api/currencies";

  const fetchPairs = fetch(urlPairs);
  const fetchTransactions = fetch(urlTransactions);
  const fetchCurrencies = fetch(urlCurrencies);

  Promise.all([fetchPairs, fetchTransactions, fetchCurrencies])
    .then((responses) => Promise.all(responses.map((r) => r.json())))
    .then((data) => {
      console.log(data);
      console.log(ccyPairs);
      ccyPairs = data[0];
      cardInputsList[0].select_options = data[2];
      cardInputsList[1].select_options = data[2];
      tableRegistrations = data[1];
      currentSelectionTable = data[1];

      //create the page
      createIndexPage();
      hideLoading();
    })

    .catch((error) => {
      console.error("Error:", error);
    });
};
