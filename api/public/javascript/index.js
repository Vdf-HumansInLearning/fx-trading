const bodyContainer = document.getElementById("body-container");
const appContainer = document.getElementById("app");
const baseUrl = "http://localhost:8080/api/";
//keep track of how many widgets are on the page
let pickWidgetsNr = 0;
let mainWidgetsNr = 0;
let totalWidgetsNr = pickWidgetsNr + mainWidgetsNr;

let pickWidget = null;

//initialize container for cards
let cardsRow = null;

let item = {
  mainCurrency: "",
  secondCurrency: "",
  sellRate: 0,
  buyRate: 0,
};

let tableHeadArray = [
  { name: "ID", icon: false },
  { name: "Username", icon: true },
  { name: "CCY Pair", icon: true },
  { name: "Rate", icon: false },
  { name: "Action", icon: true },
  { name: "Notional", icon: true },
  { name: "Tenor", icon: false },
  { name: "Transaction Date", icon: true },
  { name: "Amount", icon: false },
];

//table registrations
let tableRegistrations = [];
let currentSelectionTable = [];
//ccyPairs input
let ccyPairs = [];
//card ids
let cardIdCounter = 0;
let inputId = 0;

//input group list
let cardInputsList = [
  {
    label_for: "inputMainCurrency",
    label_text: "Primary",
    select_id: "inputMainCurrency",
    select_options: [],
  },
  {
    label_for: "inputSecondCurrency",
    label_text: "Secondary",
    select_id: "inputSecondCurrency",
    select_options: [],
  },
];

let sortObj = {
  username: false,
  ccy_pair: false,
  action: false,
  notional: false,
  trans_date: false,
};

//select for PickWidget
let inputMainCurrency = null;
let inputSecondaryCurrency = null;

function createNavigationBar() {
  const navElem = document.createElement("nav");
  navElem.className = "navbar navbar-light bg-light mb-3";

  const navBrand = document.createElement("a");
  navBrand.className = "navbar-brand";
  navBrand.addEventListener("click", () => {
    window.scrollTo(0, 0);
  });

  const navImage = document.createElement("img");
  navImage.setAttribute(
    "src",
    "https://raw.githubusercontent.com/WebToLearn/fx-trading-app/master/App/ui/src/assets/img/logo-main.svg"
  );
  navImage.setAttribute("alt", "logo");
  navImage.setAttribute("width", "85px");
  navImage.setAttribute("height", "100%");

  const logoutBtn = document.createElement("a");
  logoutBtn.className = "btn btn-outline-secondary";
  logoutBtn.setAttribute("role", "button");
  logoutBtn.setAttribute("id", "logoutBtn");
  logoutBtn.addEventListener("click", clearCookiesOnLogout);
  logoutBtn.textContent = "Logout";

  navBrand.appendChild(navImage);
  navElem.appendChild(navBrand);
  navElem.appendChild(logoutBtn);

  return navElem;
}

function createMainWidget(item) {
  let cardDivCol = document.createElement("div");
  cardDivCol.className = "col";
  cardDivCol.id = `card${cardIdCounter}`;

  let cardDiv = document.createElement("div");
  cardDivCol.appendChild(cardDiv);
  cardDiv.className = "card";

  let cardDivCurrency = document.createElement("div");
  cardDiv.appendChild(cardDivCurrency);
  cardDivCurrency.className =
    "card-currency px-3 d-flex justify-content-between";
  let cardDivItems = document.createElement("div");
  cardDivCurrency.appendChild(cardDivItems);
  cardDivItems.className = "d-flex align-items-center";

  let pSubtitle = document.createElement("p");
  cardDivItems.appendChild(pSubtitle);
  pSubtitle.className = "subtitle";

  let spanMainCurrency = document.createElement("span");
  pSubtitle.appendChild(spanMainCurrency);
  spanMainCurrency.className = "text-large ";

  spanMainCurrency.setAttribute("id", `mainCurrency${inputId}`);
  spanMainCurrency.textContent = `${item.mainCurrency}`;
  let sendMainCurrency = `mainCurrency${inputId}`;
  spanMainCurrency.setAttribute("value", `${item.mainCurrency}`);

  let spanSecondCurrency = document.createElement("span");
  pSubtitle.appendChild(spanSecondCurrency);
  spanSecondCurrency.className = "secondCurrency";

  spanSecondCurrency.setAttribute("id", `secondCurrency${inputId}`);
  let sendSecCurrency = `secondCurrency${inputId}`;
  spanSecondCurrency.textContent = `/${item.secondCurrency}`;
  spanSecondCurrency.setAttribute("value", `${item.secondCurrency}`);

  let divIcon = document.createElement("div");
  cardDivItems.appendChild(divIcon);
  divIcon.className = "icon-exchange";

  let iconExchange = document.createElement("i");
  divIcon.appendChild(iconExchange);
  iconExchange.className = "fas fa-exchange-alt";
  iconExchange.setAttribute("id", `swapp${inputId}`);

  let closeBtn = document.createElement("button");
  cardDivCurrency.appendChild(closeBtn);
  closeBtn.className = "btn-close";
  closeBtn.setAttribute("type", "button");
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.addEventListener("click", () => closeWidget(cardDivCol.id));

  let cardRatesDiv = document.createElement("div");
  cardDiv.appendChild(cardRatesDiv);
  cardRatesDiv.className = "card-rates px-3 d-flex justify-content-between";

  let pRatesSell = document.createElement("p");
  cardRatesDiv.appendChild(pRatesSell);
  pRatesSell.className = "subtitle mb-0";
  pRatesSell.textContent = "SELL: ";

  let spanRate = document.createElement("span");
  pRatesSell.appendChild(spanRate);
  spanRate.className = "text-large";
  spanRate.setAttribute("value", `${item.sellRate}`);
  spanRate.textContent = `${item.sellRate}`;
  spanRate.setAttribute("id", `sellRate${inputId}`);
  let sellRatetoSend = `sellRate${inputId}`;

  let spanSellIcon = document.createElement("span");
  pRatesSell.appendChild(spanSellIcon);
  spanSellIcon.className = "icon-down";

  let sellIcon = document.createElement("i");
  spanSellIcon.appendChild(sellIcon);
  sellIcon.className = "fas fa-caret-down";
  sellIcon.setAttribute("id", `iconDown${inputId}`);

  let pRatesBuy = document.createElement("p");
  cardRatesDiv.appendChild(pRatesBuy);
  pRatesBuy.className = "subtitle mb-0";
  pRatesBuy.textContent = "BUY: ";

  let spanBuyRate = document.createElement("span");
  pRatesBuy.appendChild(spanBuyRate);
  spanBuyRate.className = "text-large";
  spanBuyRate.textContent = `${item.buyRate}`;
  spanBuyRate.setAttribute("value", `${item.buyRate}`);
  spanBuyRate.setAttribute("id", `buyRate${inputId}`);
  let sellOrBuyRateToSend = `buyRate${inputId}`;

  let spanIconBuy = document.createElement("span");
  pRatesBuy.appendChild(spanIconBuy);
  spanIconBuy.className = "icon-up";

  let iconBuy = document.createElement("i");
  spanIconBuy.appendChild(iconBuy);
  iconBuy.className = "fas fa-caret-up";
  iconBuy.setAttribute("id", `iconUp${inputId}`);

  let cardMainArea = document.createElement("div");
  cardDiv.appendChild(cardMainArea);
  cardMainArea.className = "card-input mt-3 px-3";

  let mainArea = document.createElement("div");
  cardMainArea.appendChild(mainArea);
  mainArea.className = "input-group mb-3";

  let spanNotional = document.createElement("span");
  mainArea.appendChild(spanNotional);
  spanNotional.className = "input-group-text";
  spanNotional.setAttribute("id", '"inputNotional"');
  spanNotional.textContent = "Notional";

  let inputNational = document.createElement("input");
  mainArea.appendChild(inputNational);
  inputNational.className = "form-control";
  inputNational.setAttribute("type", "number");
  let inputIdtoSendNotional = `inputDate${inputId}`;
  inputNational.setAttribute("id", `inputDate${inputId}`);
  inputNational.setAttribute("placeholder", "Amount");
  inputNational.setAttribute("min", 1);

  let tenorDiv = document.createElement("div");
  cardMainArea.appendChild(tenorDiv);
  tenorDiv.className = "input-group mb-3";

  let labelTenor = document.createElement("label");
  tenorDiv.appendChild(labelTenor);
  labelTenor.className = "input-group-text";
  let inputIdToSendTenor = `inputCcy${inputId}`;
  labelTenor.setAttribute("for", `inputCcy${inputId}`);
  labelTenor.textContent = "Tenor";

  let select = document.createElement("select");
  tenorDiv.appendChild(select);
  select.className = "form-select";
  select.setAttribute("id", `inputCcy${inputId}`);

  let optionEmpty = document.createElement("option");
  select.appendChild(optionEmpty);
  optionEmpty.setAttribute("selected", "true");
  optionEmpty.setAttribute("id", "optionDefault");
  optionEmpty.textContent = "Choose...";

  let optionSpot = document.createElement("option");
  select.appendChild(optionSpot);
  optionSpot.setAttribute("value", "Spot");
  optionSpot.textContent = "Spot";

  let option1M = document.createElement("option");
  select.appendChild(option1M);
  option1M.setAttribute("value", "1M");
  option1M.textContent = "1 Month";

  let option3M = document.createElement("option");
  select.appendChild(option3M);
  option3M.setAttribute("value", "3M");
  option3M.textContent = "3 Month";

  let divButtons = document.createElement("div");
  cardDiv.appendChild(divButtons);
  divButtons.className = "card-actions px-3 d-flex justify-content-between";

  let sellBtn = document.createElement("button");
  divButtons.appendChild(sellBtn);
  sellBtn.className = "btn btn-success";
  sellBtn.setAttribute("type", "button");
  sellBtn.setAttribute("id", "sellBtn");
  sellBtn.textContent = "Sell";
  sellBtn.addEventListener("click", () => {
    sendDataTransactions(
      "sell",
      sendMainCurrency,
      sendSecCurrency,
      sellRatetoSend,
      `${inputIdtoSendNotional}`,
      `${inputIdToSendTenor}`
    );
  });

  let buyBtn = document.createElement("button");
  divButtons.appendChild(buyBtn);
  buyBtn.className = "btn btn-primary";
  buyBtn.setAttribute("type", "button");
  buyBtn.setAttribute("id", "buyBtn");
  buyBtn.textContent = "Buy";
  buyBtn.addEventListener("click", () => {
    sendDataTransactions(
      "buy",
      sendMainCurrency,
      sendSecCurrency,
      sellOrBuyRateToSend,
      `${inputIdtoSendNotional}`,
      `${inputIdToSendTenor}`
    );
  });
  return cardDivCol;
}

function sendDataTransactions(
  action,
  sendMainCurrency,
  sendSecCurrency,
  sellOrBuyRate,
  inputIdtoSendNotional,
  inputIdToSendTenor
) {
  let inputToSendN = inputIdtoSendNotional;
  let inputToSendT = inputIdToSendTenor;
  let mainC = sendMainCurrency;
  let secC = sendSecCurrency;
  let notional = document.getElementById(`${inputToSendN}`).value;
  let tenor = document.getElementById(`${inputToSendT}`).value;
  let mainCurrencyToSend = document
    .getElementById(`${mainC}`)
    .getAttribute("value");
  let secondCurrencyToSend = document
    .getElementById(`${secC}`)
    .getAttribute("value");

  let sellOrBuyRateToSend = document
    .getElementById(`${sellOrBuyRate}`)
    .getAttribute("value");

  let userName = getCookie("username");

  if (tenor !== "Choose..." && notional >= 1) {
    let actionSellOrBuy = action;
    const monthNames = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = dateObj.getFullYear();
    const d = new Date();
    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
    let h = addZero(dateObj.getHours());
    let m = addZero(dateObj.getMinutes());
    let s = addZero(dateObj.getSeconds());
    let time = h + ":" + m;
    const outputDate = day + "/" + month + "/" + year;

    let url = "http://localhost:8080/api/transactions";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: `${userName}`,
        ccy_pair: `${mainCurrencyToSend}/${secondCurrencyToSend}`,
        rate: sellOrBuyRateToSend,
        action: actionSellOrBuy,
        notional: notional,
        tenor: tenor,
        trans_date: outputDate,
        trans_hour: time,
      }),
    })
      .then((res) =>
        res.json().then((data) => ({ status: res.status, body: data.message }))
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          showToast("Succes", "Transaction completed", true);
          document.getElementById(`${inputToSendN}`).value = null;
          document.getElementById(`inputCcy${inputId}`).value =
            document.getElementById(`inputCcy${inputId}`).options[0].value;
        } else {
          showToast("Failure", "Transaction failed", false);
        }
      })
      .then(
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) =>
          res.json().then((data) => {
            tableRegistrations = data;
            const tableBody = document.getElementById("table-body");
            if (tableBody) {
              cleanup(tableBody);
            }
            for (let i = 0; i < tableRegistrations.length; i++) {
              const registration = createOneTableRegistration(
                tableRegistrations[i],
                i + 1
              );
              tableBody.appendChild(registration);
            }
          })
        )
      )
      .catch((error) => {
        console.log(error);
      });
  } else if (notional && tenor === "Choose...") {
    showToast("Empty field", "Please choose a tenor value", false);
  } else if (!notional && tenor !== "Choose...") {
    showToast("Empty field", "Please choose a National value", false);
  } else if (!notional && tenor === "Choose...") {
    showToast("Empty field", "Please choose national and tenor values", false);
  } else if (notional <= 1) {
    showToast("Error", "Notional value must be at least 1.", false);
  }
}

function swappCurrency(id) {
  console.log(id);
}

function createPickWidget() {
  //create column
  let cardContainer = document.createElement("div");
  cardContainer.classList.add("col");
  cardContainer.id = `cardPick${cardIdCounter}`;

  //create card container
  let card = document.createElement("div");
  card.className = "card";

  //create card currency
  let cardCurrency = document.createElement("div");
  cardCurrency.className =
    "card-currency--border px-3 d-flex justify-content-between";

  //create title of the card
  let cardCurrencyDiv = document.createElement("div");
  cardCurrencyDiv.className = "d-flex align-items-center";
  let currencyTitle = document.createElement("p");
  currencyTitle.classList.add("subtitle");
  let currencyTitleText = document.createTextNode("Pick a currency");

  //create close/delete button for card
  let closeBtn = document.createElement("button");
  closeBtn.classList.add("btn-close");
  closeBtn.setAttribute("type", "button");
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.addEventListener("click", () => closeWidget(cardContainer.id));

  //append elements to card rates div
  currencyTitle.append(currencyTitleText);
  cardCurrencyDiv.append(currencyTitle);

  cardCurrency.append(cardCurrencyDiv);
  cardCurrency.append(closeBtn);

  //create inputs for base and quote currency
  let cardInputs = document.createElement("div");
  cardInputs.className = "card-input--center mt-3 px-3";

  //create inputs for currencies
  cardInputsList.forEach((cardInput) => {
    let inputGroup = document.createElement("div");
    inputGroup.className = "input-group mb-3";
    let label = document.createElement("label");
    label.classList.add("input-group-text");
    label.setAttribute("for", cardInput.label_for);
    let labelText = document.createTextNode(cardInput.label_text);
    label.append(labelText);

    //append each input group to parent div
    cardInputs.append(inputGroup);
    inputGroup.append(label);

    //create select element for each currency
    let select = document.createElement("select");
    select.classList.add("form-select");
    select.setAttribute("id", cardInput.select_id);
    select.addEventListener("change", () => selectCurrency(cardContainer.id));

    //add one default option
    let defaultOption = document.createElement("option");
    defaultOption.setAttribute("value", "opt_none");
    let defaultOptionText = document.createTextNode("Choose...");
    defaultOption.append(defaultOptionText);

    select.append(defaultOption);

    //iterate through options to append to select
    cardInput.select_options.forEach((selectOption) => {
      let option = document.createElement("option");
      option.setAttribute("value", selectOption);
      let optionText = document.createTextNode(selectOption);
      option.append(optionText);
      //append each option to select element
      select.append(option);
    });
    inputGroup.append(select);
  });

  //create action buttons div
  let cardActions = document.createElement("div");
  cardActions.className = "card-actions px-3 d-flex justify-content-end";
  let confirmBtn = document.createElement("button");
  confirmBtn.className = "btn btn-primary";
  confirmBtn.setAttribute("type", "button");
  confirmBtnText = document.createTextNode("Ok");
  confirmBtn.append(confirmBtnText);
  confirmBtn.addEventListener("click", () =>
    confirmSelectionCurrency(cardContainer.id)
  );
  cardActions.append(confirmBtn);

  //add card to cardContainer
  cardContainer.append(card);
  card.append(cardCurrency);

  //add card rates, card inputs, card actions to card container
  card.append(cardCurrency);
  card.append(cardInputs);
  card.append(cardActions);

  return cardContainer;
}

function createAddWidget() {
  //create column
  let cardContainer = document.createElement("div");
  cardContainer.classList.add("col");

  //create card div
  let card = document.createElement("div");
  card.className = "card--add p-0 border-0";

  //create add button
  let button = document.createElement("button");
  button.className = "btn btn-light btn-add";

  //create plus icon
  let icon = document.createElement("i");
  icon.className = "fas fa-plus";

  button.append(icon);
  card.append(button);
  cardContainer.append(card);

  cardContainer.addEventListener("click", addPickWidget);

  return cardContainer;
}

function addPickWidget() {
  //no more that 5 cards
  if (pickWidgetsNr + mainWidgetsNr <= 4) {
    console.log("create pick widget");
    pickWidget = createPickWidget();
    cardsRow.prepend(pickWidget);

    pickWidgetsNr++;
    cardIdCounter++;
  } else {
    showToast(
      "Error",
      "You cannot have more than 5 widgets on the page",
      false
    );
  }
}

function addNewWidget(cardId) {
  //no more that 5 cards
  if (pickWidgetsNr + mainWidgetsNr <= 5) {
    //fetch item from api
    const newWidget = createMainWidget(item);
    cardsRow.prepend(newWidget);

    let currentInputId = `swapp${inputId}`;
    let swappId = document.getElementById(currentInputId);
    swappId.addEventListener("click", () => {
      let numberIdToSwap = currentInputId.substring(5);
      let mainCurrencyToSwap = document
        .querySelector(`#mainCurrency${numberIdToSwap}`)
        .getAttribute("value");
      let secondCurrencyToSwap = document
        .querySelector(`#secondCurrency${numberIdToSwap}`)
        .getAttribute("value");
      let sellValueToSwap = document
        .querySelector(`#sellRate${numberIdToSwap}`)
        .getAttribute("value");
      let buyValueToSwap = document
        .querySelector(`#buyRate${numberIdToSwap}`)
        .getAttribute("value");

      console.log(mainCurrencyToSwap);
      console.log(secondCurrencyToSwap);
      console.log(sellValueToSwap);
      console.log(buyValueToSwap);

      let tempMainCurrency = secondCurrencyToSwap;
      let tempSecondCurrency = mainCurrencyToSwap;
      let tempSellValue = buyValueToSwap;
      let tempBuyValue = sellValueToSwap;

      console.log(tempMainCurrency);
      console.log(tempSecondCurrency);
      console.log(tempSellValue);
      console.log(tempBuyValue);
      document.getElementById(`mainCurrency${numberIdToSwap}`).textContent =
        tempMainCurrency;
      document
        .getElementById(`mainCurrency${numberIdToSwap}`)
        .setAttribute("value", tempMainCurrency);

      document.getElementById(`secondCurrency${numberIdToSwap}`).textContent =
        tempSecondCurrency;
      document
        .getElementById(`secondCurrency${numberIdToSwap}`)
        .setAttribute("value", tempSecondCurrency);

      document.getElementById(`sellRate${numberIdToSwap}`).textContent =
        tempSellValue;
      document
        .getElementById(`sellRate${numberIdToSwap}`)
        .setAttribute("value", tempSellValue);

      document.getElementById(`buyRate${numberIdToSwap}`).textContent =
        tempBuyValue;
      document
        .getElementById(`buyRate${numberIdToSwap}`)
        .setAttribute("value", tempBuyValue);

      //let tempIconDown = document.getElementsByClassName('fas fa-caret-down')[0]
      // let tempIconUp = d
    });
    closeWidget(cardId);
    mainWidgetsNr++;
  } else {
    showToast(
      "Error",
      "You cannot have more than 5 widgets on the page",
      false
    );
  }
}

function closeWidget(cardId) {
  console.log(cardId);
  document.getElementById(cardId).remove();
  if (cardId.startsWith("cardPick")) {
    pickWidgetsNr--;
  } else {
    mainWidgetsNr--;
    stop();
  }
}

function selectCurrency(cardId) {
  let card = document.getElementById(cardId);
  inputMainCurrency = card.querySelector("#inputMainCurrency");
  inputSecondCurrency = card.querySelector("#inputSecondCurrency");

  if (inputMainCurrency && inputSecondCurrency)
    if (
      inputMainCurrency.value !== "opt_none" ||
      inputSecondCurrency.value !== "opt_none"
    ) {
      //user must choose two different currencies
      if (inputMainCurrency.value == inputSecondCurrency.value) {
        showToast("Error", "You must choose two different currencies", false);
      }
    }
}

function confirmSelectionCurrency(cardId) {
  let card = document.getElementById(cardId);
  let swappId = document.getElementById;
  inputMainCurrency = card.querySelector("#inputMainCurrency");
  inputSecondCurrency = card.querySelector("#inputSecondCurrency");
  console.log(inputMainCurrency);

  if (
    inputMainCurrency.value &&
    inputSecondCurrency.value &&
    inputMainCurrency.value !== "opt_none" &&
    inputSecondCurrency.value !== "opt_none"
  ) {
    if (inputMainCurrency.value == inputSecondCurrency.value) {
      showToast("Error", "You must choose two different currencies", false);
    } else {
      let currencyObj = {
        base_currency: inputMainCurrency.value,
        quote_currency: inputSecondCurrency.value,
      };
      fetch(baseUrl + "currencies/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currencyObj),
      })
        .then((res) =>
          res.json().then((data) => ({ status: res.status, body: data }))
        )
        .then((response) => {
          if (response.status === 200) {
            inputId++;
            console.log("inputId  " + inputId);
            console.log(response.body);
            //populate the item
            item.mainCurrency = currencyObj.base_currency;
            item.secondCurrency = currencyObj.quote_currency;
            item.sellRate = response.body.sell;
            item.buyRate = response.body.buy;
            //create the page
            addNewWidget(cardId);
            start(
              currencyObj.base_currency,
              currencyObj.quote_currency,
              cardId
            );
          } else {
            showToast("Error", response.body, false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  } else {
    showToast("Error", "Currency fields cannot be empty", false);
  }
}

//create the header
//containing fields names
function createTableHeader(tr) {
  for (let i = 0; i < tableHeadArray.length; i++) {
    const th = document.createElement("th");
    th.setAttribute("scope", "col");
    th.textContent = tableHeadArray[i].name;
    if (tableHeadArray[i].icon) {
      const icon = document.createElement("i");
      icon.className = "fas fa-sort";
      const space = document.createElement("span");
      space.textContent = " ";
      th.appendChild(space);
      th.appendChild(icon);
      addTableHeadSortEvent(tableHeadArray[i].name, icon);
    }
    tr.appendChild(th);
  }
}

function addTableHeadSortEvent(name, icon) {
  if (name === "Username") {
    icon.addEventListener("click", () =>
      sortEntries("username", "alphabetical")
    );
  }
  if (name === "CCY Pair") {
    icon.addEventListener("click", () =>
      sortEntries("ccy_pair", "alphabetical")
    );
  }
  if (name === "Action") {
    icon.addEventListener("click", () => sortEntries("action", "alphabetical"));
  }
  if (name === "Notional") {
    icon.addEventListener("click", () => sortEntries("notional", "numerical"));
  }
  if (name === "Transaction Date") {
    icon.addEventListener("click", () => sortEntries("trans_date", "date"));
  }
}

function sortEntries(property, sortType) {
  const tableBody = document.getElementById("table-body");
  let filteredRegistrations = [];

  sortObj.property = !sortObj.property;

  if (tableBody) {
    cleanup(tableBody);
  }
  switch (sortType) {
    case "alphabetical":
      if (sortObj.property) {
        filteredRegistrations = currentSelectionTable.sort((a, b) =>
          a[property].toLowerCase().localeCompare(b[property].toLowerCase())
        );
      } else {
        filteredRegistrations = currentSelectionTable.sort((a, b) =>
          b[property].toLowerCase().localeCompare(a[property].toLowerCase())
        );
      }
      break;
    case "numerical":
      if (sortObj.property) {
        filteredRegistrations = currentSelectionTable.sort(
          (a, b) => a[property] - b[property]
        );
      } else {
        filteredRegistrations = currentSelectionTable.sort(
          (a, b) => b[property] - a[property]
        );
      }
      break;
    case "date":
      if (sortObj.property) {
        filteredRegistrations = currentSelectionTable.sort((a, b) => {
          let { firstDate, secondDate } = parseDates(a, b, property);
          return firstDate - secondDate;
        });
      } else {
        filteredRegistrations = currentSelectionTable.sort((a, b) => {
          let { firstDate, secondDate } = parseDates(a, b, property);
          return secondDate - firstDate;
        });
      }
      break;
  }
  for (let i = 0; i < filteredRegistrations.length; i++) {
    const registration = createOneTableRegistration(
      filteredRegistrations[i],
      i + 1
    );
    tableBody.appendChild(registration);
  }
}

function parseDates(a, b, property) {
  let incomingDateA = a[property].substring(0, 10);
  let newIncomingDateA = incomingDateA.split("/");
  [newIncomingDateA[0], newIncomingDateA[1]] = [
    newIncomingDateA[1],
    newIncomingDateA[0],
  ];

  incomingDateA = newIncomingDateA.join("/");
  let firstDate = new Date(incomingDateA);

  let incomingDateB = b[property].substring(0, 10);
  let newIncomingDateB = incomingDateB.split("/");
  [newIncomingDateB[0], newIncomingDateB[1]] = [
    newIncomingDateB[1],
    newIncomingDateB[0],
  ];

  incomingDateB = newIncomingDateB.join("/");
  let secondDate = new Date(incomingDateB);

  return {
    firstDate: firstDate,
    secondDate: secondDate,
  };
}

function createFiltersSection(blotterButtons) {
  const filterSubtitle = document.createElement("p");
  filterSubtitle.className = "subtitle";
  filterSubtitle.textContent = "FILTERS";

  blotterButtons.appendChild(filterSubtitle);

  const verticalLine = document.createElement("div");
  verticalLine.className = "vertical-line";
  blotterButtons.appendChild(verticalLine);

  const inputFilters = document.createElement("div");
  inputFilters.className = "row";

  const inputFiltersGroupSt = document.createElement("div");
  inputFiltersGroupSt.className = "input-group col mb-3";

  //create elements for ccy-pair filter
  const inputCcyLabel = document.createElement("label");
  inputCcyLabel.className = "input-group-text";
  inputCcyLabel.setAttribute("for", "inputCcy");
  inputCcyLabel.textContent = "CCY Pair";

  const inputCyy = document.createElement("select");
  inputCyy.className = "form-select";
  inputCyy.setAttribute("id", "inputCcy");
  inputCyy.addEventListener("change", () => filterBlotterTable());

  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Choose..";
  defaultOption.value = "opt_none";
  inputCyy.appendChild(defaultOption);

  for (let i = 0; i < ccyPairs.length; i++) {
    const option = document.createElement("option");
    option.setAttribute("value", ccyPairs[i]);
    option.setAttribute("id", ccyPairs[i] + "Ccy");
    option.textContent = ccyPairs[i];
    inputCyy.appendChild(option);
  }

  inputFiltersGroupSt.appendChild(inputCcyLabel);
  inputFiltersGroupSt.appendChild(inputCyy);

  const inputFiltersGroupNd = document.createElement("div");
  inputFiltersGroupNd.className = "input-group col mb-3";

  const inputDateLabel = document.createElement("span");
  inputDateLabel.className = "input-group-text";
  inputDateLabel.textContent = "Date";

  //create elements for date filter
  const inputDate = document.createElement("input");
  inputDate.setAttribute("type", "date");
  inputDate.className = "form-control";
  inputDate.setAttribute("id", "inputDateFilter");
  inputDate.setAttribute("placeholder", "12/02/2018");
  inputDate.addEventListener("change", () => filterBlotterTable());

  inputFiltersGroupNd.appendChild(inputDateLabel);
  inputFiltersGroupNd.appendChild(inputDate);

  inputFilters.appendChild(inputFiltersGroupSt);
  inputFilters.appendChild(inputFiltersGroupNd);

  return inputFilters;
}

//adds one registration in blotter table
function createOneTableRegistration(transaction, counter) {
  const trUsers = document.createElement("tr");
  const rowId = document.createElement("th");
  rowId.setAttribute("scope", "row");
  rowId.textContent = counter;
  trUsers.appendChild(rowId);

  const tdName = document.createElement("td");
  tdName.textContent = transaction.username;
  trUsers.appendChild(tdName);

  const tdCcyPair = document.createElement("td");
  tdCcyPair.textContent = transaction.ccy_pair;
  trUsers.appendChild(tdCcyPair);

  const tdRate = document.createElement("td");
  tdRate.textContent = transaction.rate;
  trUsers.appendChild(tdRate);

  const tdAction = document.createElement("td");
  tdAction.textContent = transaction.action;
  trUsers.appendChild(tdAction);

  const tdNotional = document.createElement("td");
  tdNotional.textContent = transaction.notional;
  trUsers.appendChild(tdNotional);

  const tdTenor = document.createElement("td");
  tdTenor.textContent = transaction.tenor;
  trUsers.appendChild(tdTenor);

  const tdDate = document.createElement("td");
  tdDate.textContent = transaction.trans_date + " " + transaction.trans_hour;
  trUsers.appendChild(tdDate);

  const tdAmount = document.createElement("td");
  tdAmount.textContent = (
    Number(transaction.notional) * Number(transaction.rate)
  ).toFixed(2);
  trUsers.appendChild(tdAmount);

  return trUsers;
}

//create body content for registrations
function createBodyTable(registrations) {
  const bodyTable = document.createElement("tbody");
  bodyTable.setAttribute("id", "table-body");
  for (let i = 0; i < registrations.length; i++) {
    const registration = createOneTableRegistration(registrations[i], i + 1);
    bodyTable.appendChild(registration);
  }
  return bodyTable;
}

function createBlotterView() {
  //create blotter section
  const blotterSection = document.createElement("section");
  blotterSection.className = "col-sm-12 col-md-12 col-lg-6";

  //create blotter title
  const blotterTitle = document.createElement("h5");
  blotterTitle.className = "color-titles";
  blotterTitle.textContent = "Blotter View";
  const hr = document.createElement("hr");

  blotterSection.appendChild(blotterTitle);
  blotterSection.appendChild(hr);

  const blotterButtons = document.createElement("div");
  blotterButtons.className = "blotter-buttons";

  //create filter section
  let inputFilters = createFiltersSection(blotterButtons);
  blotterButtons.appendChild(inputFilters);

  const blotterTableResponsive = document.createElement("div");
  blotterTableResponsive.className = "table-responsive";

  const blotterTable = document.createElement("table");
  blotterTable.setAttribute("id", "blotter-table");
  blotterTable.className = "table table-striped";

  //creat table head
  const headTable = document.createElement("thead");
  headTable.className = "thead-primary";

  const tr = document.createElement("tr");
  headTable.appendChild(tr);
  createTableHeader(tr);

  //create table body
  const bodyTable = createBodyTable(tableRegistrations);
  blotterTable.appendChild(headTable);
  blotterTable.appendChild(bodyTable);

  //append header and body to table container
  blotterTableResponsive.appendChild(blotterTable);
  blotterSection.appendChild(blotterButtons);
  blotterSection.appendChild(blotterTableResponsive);

  return blotterSection;
}

function createRatesView() {
  //create main section in which the cards will be
  let ratesSection = document.createElement("section");
  ratesSection.className = "col-sm-12 col-md-12 col-lg-6";

  //create title
  let ratesTitle = document.createElement("h5");
  ratesTitle.classList.add("color-titles");
  ratesTitle.textContent = "Fx Rates View";

  //create cards container
  let cardsContainer = document.createElement("div");
  cardsContainer.classList.add("cards-container");

  //create row which will hold cards
  cardsRow = document.createElement("div");
  cardsRow.className = "row row-cols-1 row-cols-sm-2 g-4";

  //at first, there will be visible only add button
  let addWidget = createAddWidget();
  cardsRow.append(addWidget);

  ratesSection.append(ratesTitle);
  ratesSection.append(cardsContainer);
  cardsContainer.append(cardsRow);

  return ratesSection;
}

function createIndexPage() {
  //cleanup
  cleanup(appContainer);

  //create navbar
  const navBar = createNavigationBar();
  appContainer.appendChild(navBar);

  let mainContainer = document.createElement("main");
  //create main div
  mainContainer.className = "container-fluid row mb-5";
  appContainer.appendChild(mainContainer);

  let ratesSection = createRatesView();
  mainContainer.append(ratesSection);

  const blotter = createBlotterView();
  mainContainer.appendChild(blotter);
}

// clear cookie using its name
function clearCookie(name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//clear username from cookies
//on logout
function clearCookiesOnLogout() {
  clearCookie("username");
  changeHash("#login");
  showToast("Logged out", "You have been logged out.", true);
  if (eventSource) stop();
}

//display succes/error toast
function showToast(titleMessage, bodyMessage, toastType) {
  let liveToast = document.getElementById("liveToast");
  console.log(liveToast);
  console.log(toastType);

  let toastHeaderContainer = liveToast.querySelector(".toast-header");
  let toastHeader = liveToast.querySelector(".toast-header .me-auto");
  if (toastType) {
    toastHeaderContainer.classList.remove("bg-danger");
    toastHeaderContainer.classList.add("bg-success");
    liveToast.classList.remove("border-danger");
    liveToast.classList.add("border-success");
  } else {
    toastHeaderContainer.classList.remove("bg-success");
    toastHeaderContainer.classList.add("bg-danger");
    liveToast.classList.remove("border-success");
    liveToast.classList.add("border-danger");
  }
  cleanup(toastHeader);
  toastHeaderText = document.createTextNode(titleMessage);
  toastHeader.appendChild(toastHeaderText);
  let toastBody = liveToast.querySelector(".toast-body");
  cleanup(toastBody);

  let toastBodyText = document.createTextNode(bodyMessage);
  toastBody.appendChild(toastBodyText);
  let toast = new bootstrap.Toast(liveToast);
  toast.show();
}
function cleanup(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//filter blotter table by given inputs
function filterBlotterTable() {
  const body = document.getElementById("table-body");
  const inputCcy = document.getElementById("inputCcy").value;
  const inputDate = document.getElementById("inputDateFilter").value;

  //clear blotter table
  if (body) {
    cleanup(body);
  }

  let selectedDate = document.getElementById("inputDateFilter").value;
  let dateArray = selectedDate.split("-").reverse();
  selectedDate = dateArray.join("/");

  //ccy input and date input exist
  if (inputCcy != "opt_none" && selectedDate.length !== 0) {
    currentSelectionTable = tableRegistrations;
    const selectedPair = document.getElementById("inputCcy").value;
    currentSelectionTable = tableRegistrations
      .filter((i) => i.ccy_pair === selectedPair)
      .filter((i) => i.trans_date.startsWith(selectedDate));
    if (currentSelectionTable.length === 0) {
      showToast(
        "Not found",
        "There are any registrations for selected filters. Please select another options.",
        false
      );
    }
    //display filterd table registration
    for (let i = 0; i < currentSelectionTable.length; i++) {
      const reg = createOneTableRegistration(currentSelectionTable[i], i + 1);
      body.appendChild(reg);
    }
  }
  //ccy input exists but date input doesn`t
  else if (inputCcy != "opt_none" && selectedDate.length === 0) {
    currentSelectionTable = tableRegistrations;
    const selectedPair = document.getElementById("inputCcy").value;
    currentSelectionTable = tableRegistrations.filter(
      (i) => i.ccy_pair === selectedPair
    );
    if (currentSelectionTable.length === 0) {
      showToast(
        "Not found",
        "There are any registrations for selected filters. Please select another options.",
        false
      );
    }
    //display filterd table registration
    for (let i = 0; i < currentSelectionTable.length; i++) {
      const reg = createOneTableRegistration(currentSelectionTable[i], i + 1);
      body.appendChild(reg);
    }
  }
  //date input exists but ccy input doesn`t
  else if (inputCcy === "opt_none" && selectedDate.length !== 0) {
    currentSelectionTable = tableRegistrations;
    currentSelectionTable = tableRegistrations.filter((i) =>
      i.trans_date.startsWith(selectedDate)
    );
    if (currentSelectionTable.length === 0) {
      showToast(
        "Not found",
        "There are any registrations for selected filters. Please select another options.",
        false
      );
    }
    //display filterd table registration
    for (let i = 0; i < currentSelectionTable.length; i++) {
      const reg = createOneTableRegistration(currentSelectionTable[i], i + 1);
      body.appendChild(reg);
    }
  }
  //there is no input for any filter fields
  else {
    //display filterd table registration
    for (let i = 0; i < tableRegistrations.length; i++) {
      const reg = createOneTableRegistration(tableRegistrations[i], i + 1);
      currentSelectionTable = tableRegistrations;
      body.appendChild(reg);
    }
  }
}

window.onload = () => {
  showLoading();
  //when document loads, initialize router
  let myRouter = new MyHashRouter();
  //change hash so it triggers the event on first start
  const initialHash = window.location.hash;
  window.location.hash = "#aa";
  window.location.hash = initialHash;
};

function getIndexData() {
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
      ccyPairs = data[0];
      cardInputsList[0].select_options = data[2];
      cardInputsList[1].select_options = data[2];
      tableRegistrations = data[1];
      currentSelectionTable = data[1];

      createIndexPage();
    })

    .catch((error) => {
      console.error("Error:", error);
    });
}

//loading
function showLoading() {
  let loading = document.createElement("div");
  loading.classList.add("spinner");
  loading.id = "loadingContainer";

  appContainer.appendChild(loading);
}

function hideLoading() {
  let container = document.getElementById("loadingContainer");
  if (container) container.remove();
}

let loginContainer = null;

function createAsideImage() {
  let aside = document.createElement("aside");
  aside.classList.add("aside");
  let img = document.createElement("img");
  img.classList.add("aside__img");
  img.setAttribute(
    "src",
    "https://raw.githubusercontent.com/WebToLearn/fx-trading-app/master/App/ui/src/assets/img/logo-grayscale.svg"
  );
  img.setAttribute("alt", "logo");
  loginContainer.appendChild(aside);
  aside.appendChild(img);

  return aside;
}

function createMainLoginForm() {
  let main = document.createElement("main");
  main.classList.add("main");
  loginContainer.appendChild(main);
  let mainContainer = document.createElement("div");
  mainContainer.classList.add("main__container");
  main.appendChild(mainContainer);

  const logoImg = document.createElement("img");
  logoImg.classList.add("mobile__image");
  logoImg.setAttribute(
    "src",
    "https://raw.githubusercontent.com/WebToLearn/fx-trading-app/master/App/ui/src/assets/img/logo-main.svg"
  );
  logoImg.setAttribute("alt", "logo");
  main.append(logoImg);

  let h1 = document.createElement("h1");
  h1.classList.add("main__title");
  h1.textContent = "Log in to your account";
  mainContainer.appendChild(h1);

  let hr = document.createElement("hr");
  mainContainer.appendChild(hr);
  hr.className = "solid";

  let form = document.createElement("form");
  form.setAttribute("id", "form");
  form.setAttribute("method", "POST");
  mainContainer.appendChild(form);

  let firstDiv = document.createElement("div");
  firstDiv.className =
    "mb-3 d-flex align-content-center justify-content-evenly";
  form.appendChild(firstDiv);
  let emailIcon = document.createElement("i");
  emailIcon.className = "fas fa-user-alt icon-auth";
  firstDiv.appendChild(emailIcon);

  let emailInput = document.createElement("input");
  firstDiv.appendChild(emailInput);
  emailInput.id = "inputEmail";
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("name", "email");
  emailInput.classList.add("form-control");
  emailInput.setAttribute("aria-describedby", "emailHelp");
  emailInput.setAttribute("placeholder", "Email");
  emailInput.setAttribute("value", "adela@adela.com");

  let secondDiv = document.createElement("div");
  secondDiv.className = "mb-3 d-flex align-content-center ";
  form.appendChild(secondDiv);

  let passwordIcon = document.createElement("i");
  passwordIcon.className = "fas fa-unlock icon-auth";
  secondDiv.appendChild(passwordIcon);

  let divIconAndPassword = document.createElement("div");
  secondDiv.appendChild(divIconAndPassword);
  divIconAndPassword.className = "mb-3 d-flex align-content-center flex-column";

  let passwordInput = document.createElement("input");
  secondDiv.appendChild(passwordInput);
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("name", "password");
  passwordInput.className = "form-control";
  passwordInput.setAttribute("id", "inputPassword");
  passwordInput.setAttribute("placeholder", "Password");
  passwordInput.setAttribute("value", "Test123!");

  let loginBtn = document.createElement("button");
  form.appendChild(loginBtn);
  loginBtn.setAttribute("id", "loginBtn");
  loginBtn.setAttribute("type", "submit");
  loginBtn.className = "main__btn";
  loginBtn.textContent = "Login";
  loginBtn.addEventListener("click", login);

  let divRegister = document.createElement("div");
  form.appendChild(divRegister);
  divRegister.className = "register";

  let p = document.createElement("p");
  divRegister.appendChild(p);
  p.textContent = "You don't have an account? ";
  let a = document.createElement("a");
  p.appendChild(a);
  a.addEventListener("click", () => changeHash("#register"));
  a.textContent = "Register";
  a.className = "link-primary";

  return main;
}

function login() {
  const form = document.getElementById("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let userEmail = document.getElementById("inputEmail").value;
      let password = document.getElementById("inputPassword").value;

      let url = "http://localhost:8080/api/auth/login";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, password: password }),
      })
        .then((res) =>
          res.json().then((data) => ({
            status: res.status,
            body: data,
          }))
        )
        .then((response) => {
          let username = response.body.username;
          if (response.status === 200) {
            //save cookie
            createCookie("username", `${username}`, 2);
            showToast("Login succesfull", "You have been logged in!", true);
            changeHash("");
          } else {
            showToast("Login failed", response.body.message, false);
          }
        })

        .catch((error) => {
          console.log(error);
        });
    });
  }
}

function removePreviousError(parent) {
  const errors = parent.getElementsByClassName("error");

  if (errors.length > 0) {
    for (let errChild of errors) {
      parent.removeChild(errChild);
    }
  }
}

function showToast(titleMessage, bodyMessage, toastType) {
  let liveToast = document.getElementById("liveToast");
  console.log(liveToast);
  let toastHeaderContainer = liveToast.querySelector(".toast-header");
  let toastHeader = liveToast.querySelector(".toast-header .me-auto");
  if (toastType) {
    toastHeaderContainer.classList.remove("bg-danger");
    toastHeaderContainer.classList.add("bg-success");
    liveToast.classList.remove("border-danger");
    liveToast.classList.add("border-success");
  } else {
    toastHeaderContainer.classList.remove("bg-success");
    toastHeaderContainer.classList.add("bg-danger");
    liveToast.classList.remove("border-success");
    liveToast.classList.add("border-danger");
  }
  cleanup(toastHeader);
  toastHeaderText = document.createTextNode(titleMessage);
  toastHeader.appendChild(toastHeaderText);
  let toastBody = liveToast.querySelector(".toast-body");
  cleanup(toastBody);

  let toastBodyText = document.createTextNode(bodyMessage);
  toastBody.appendChild(toastBodyText);
  let toast = new bootstrap.Toast(liveToast);
  toast.show();
}

function createCookie(name, value, days) {
  var date, expires;
  if (days) {
    date = new Date();
    date.setDate(date.getDate() + days);
    expires = "; expires=" + date.toUTCString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires;
}

//when we move to login/register page from index,
//we should clear the whole body
//or, we can get navbar by id and remove the element
function createLoginPage() {
  //cleanup
  cleanup(appContainer);
  loginContainer = document.createElement("div");
  loginContainer.className = "d-flex";
  appContainer.appendChild(loginContainer);

  createAsideImage();
  createMainLoginForm();
}

let registerContainer = null;

function createRegisterAside() {
  let aside = document.createElement("aside");
  registerContainer.appendChild(aside);
  aside.className = "aside";

  let imgAside = document.createElement("img");
  aside.appendChild(imgAside);
  imgAside.className = "aside__img";
  imgAside.setAttribute(
    "src",
    "https://raw.githubusercontent.com/WebToLearn/fx-trading-app/master/App/ui/src/assets/img/logo-grayscale.svg"
  );
  imgAside.setAttribute("alt", "logo");
}

function createMain() {
  let main = document.createElement("main");
  registerContainer.appendChild(main);
  main.className = "main";

  let divContainer = document.createElement("div");
  main.appendChild(divContainer);
  divContainer.className = "main__container";

  const logoImg = document.createElement("img");
  logoImg.classList.add("mobile__image");
  logoImg.classList.add("register__logo");
  logoImg.setAttribute(
    "src",
    "https://raw.githubusercontent.com/WebToLearn/fx-trading-app/master/App/ui/src/assets/img/logo-main.svg"
  );
  logoImg.setAttribute("alt", "logo");
  main.append(logoImg);

  let h1 = document.createElement("h1");
  divContainer.appendChild(h1);
  h1.className = "main__title";
  h1.textContent = "Register a new account";

  let hr = document.createElement("hr");
  divContainer.appendChild(hr);
  hr.className = "solid";

  let form = document.createElement("form");
  divContainer.appendChild(form);
  form.setAttribute("method", "POST");
  form.setAttribute("id", "form");

  let divUsername = document.createElement("div");
  form.appendChild(divUsername);
  divUsername.className = "mb-3 align-content-center";

  let pUsername = document.createElement("p");
  divUsername.appendChild(pUsername);
  pUsername.textContent = "Username";

  let inputUsername = document.createElement("input");

  divUsername.appendChild(inputUsername);
  inputUsername.className = "form-control";
  inputUsername.setAttribute("id", "inputUsername");
  inputUsername.setAttribute("type", "text");
  inputUsername.setAttribute("name", "user");
  inputUsername.setAttribute("aria-describedby", "emailHelp");
  inputUsername.setAttribute("placeholder", "Username");
  inputUsername.setAttribute("value", "oana");

  let divEmail = document.createElement("div");
  form.appendChild(divEmail);
  divEmail.className = "mb-3 align-content-center";

  let pEmail = document.createElement("p");
  divEmail.appendChild(pEmail);
  pEmail.textContent = "Email adress";

  let inputEmail = document.createElement("input");
  divEmail.appendChild(inputEmail);
  inputEmail.className = "form-control";
  inputEmail.setAttribute("id", "inputEmail");
  inputEmail.setAttribute("type", "email");
  inputEmail.setAttribute("name", "email");
  inputEmail.setAttribute("placeholder", "Email");
  inputEmail.setAttribute("value", "oana@oana2.com");

  let divPassword = document.createElement("div");
  form.appendChild(divPassword);
  divPassword.className = "mb-3 align-content-center";

  let pPassword = document.createElement("p");
  divPassword.appendChild(pPassword);
  pPassword.textContent = "Password";

  let inputPassword = document.createElement("input");
  divPassword.appendChild(inputPassword);
  inputPassword.className = "form-control";
  inputPassword.setAttribute("id", "inputPassword");
  inputPassword.setAttribute("type", "password");
  inputPassword.setAttribute("name", "password");
  inputPassword.setAttribute("placeholder", "Password");
  inputPassword.setAttribute("value", "Test123!");

  let divPasswordConfirm = document.createElement("div");
  form.appendChild(divPasswordConfirm);
  divPasswordConfirm.className = "mb-3 align-content-center";

  let pPasswordConfirm = document.createElement("p");
  divPasswordConfirm.appendChild(pPasswordConfirm);
  pPasswordConfirm.textContent = "Confirm Password";

  let inputPasswordConfirm = document.createElement("input");
  divPasswordConfirm.appendChild(inputPasswordConfirm);
  inputPasswordConfirm.className = "form-control";
  inputPasswordConfirm.setAttribute("id", "inputPasswordConfirm");
  inputPasswordConfirm.setAttribute("type", "password");
  inputPasswordConfirm.setAttribute("name", "co-password");
  inputPasswordConfirm.setAttribute("placeholder", "Confirm Password");
  inputPasswordConfirm.setAttribute("value", "Test123!");

  let submitBtn = document.createElement("button");
  form.appendChild(submitBtn);
  submitBtn.setAttribute("id", "submitBtn");
  submitBtn.className = "main__btn";
  submitBtn.setAttribute("type", "submit");
  submitBtn.addEventListener("click", () => {
    submitRegisterData();
  });
  submitBtn.textContent = "Register";

  let divRegister = document.createElement("div");
  divContainer.appendChild(divRegister);
  divRegister.className = "register";

  let pRegister = document.createElement("p");
  divRegister.appendChild(pRegister);
  pRegister.textContent = "Already have an account? ";

  let aRegister = document.createElement("a");
  pRegister.appendChild(aRegister);
  aRegister.addEventListener("click", () => {
    changeHash("#login");
  });
  aRegister.textContent = "Login";
  aRegister.className = "link-primary";
}

function submitRegisterData() {
  const form = document.getElementById("form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const isValid = validateRegisterForm(); // front-end validation

      if (isValid) {
        // submit form

        let username = document.getElementById("inputUsername").value;
        let email = document.getElementById("inputEmail").value;
        let password = document.getElementById("inputPassword").value;
        let repassword = document.getElementById("inputPasswordConfirm").value;
        const url = "http://localhost:8080/api/auth/register";

        fetch(url, {
          method: "POST",
          headers: {
            //Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            repassword: repassword,
          }),
        })
          .then((data) => {
            console.log(data);
            if (data.status == 200) {
              createCookie("username", `${username}`, 2);
              showToast(
                "Register succesfull",
                "You have been registered successfully!",
                true
              );
              changeHash("");
            } else {
              showToast("Error", "Registration failed!", false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }
}

function validateRegisterForm() {
  let isValid = true;
  const passRegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const username = document.getElementById("inputUsername");
  removePreviousError(username.parentElement);
  if (!username.value) {
    isValid = false;
    username.parentElement.insertAdjacentHTML(
      "beforeend",
      '<p class="error">Username is not valid</p>'
    );
  } else if (username.value.length < 3 || username.value.length > 20) {
    isValid = false;
    username.parentElement.insertAdjacentHTML(
      "beforeend",
      '<p class="error">Username must be between 3 and 20 characters</p>'
    );
  }

  const email = document.getElementById("inputEmail");
  removePreviousError(email.parentElement);
  const pattern = /^\S+@\S+\.\S+$/;
  if (!pattern.test(email.value)) {
    email.parentElement.insertAdjacentHTML(
      "beforeend",
      '<p class="error">Email is not valid</p>'
    );
  }

  const password = document.getElementById("inputPassword");
  removePreviousError(password.parentElement);
  if (password.value.length < 7 || password.value.length >= 20) {
    isValid = false;
    password.parentElement.insertAdjacentHTML(
      "beforeend",
      '<p class="error">Password must be between 8 and 20 characters</p>'
    );
  } else if (checkRegExp(passRegExp, password.value) === false) {
    isValid = false;
    password.parentElement.insertAdjacentHTML(
      "beforeend",
      '<p class="error">Password must be 8 characters long and must contain at least: one uppercase, one lowercase, a number and a special character!</p>'
    );
  }
  function checkRegExp(regExp, myStr) {
    return regExp.test(myStr);
  }

  const confirmPassword = document.getElementById("inputPasswordConfirm");
  removePreviousError(confirmPassword.parentElement);
  if (confirmPassword.value !== password.value) {
    isValid = false;
    confirmPassword.parentElement.insertAdjacentHTML(
      "beforeend",
      '<p class="error">Passwords do not match</p>'
    );
  }

  return isValid;
}

function removePreviousError(parent) {
  const errors = parent.getElementsByClassName("error");

  if (errors.length > 0) {
    for (let errChild of errors) {
      parent.removeChild(errChild);
    }
  }
}

function showToast(titleMessage, bodyMessage, toastType) {
  let liveToast = document.getElementById("liveToast");
  console.log(liveToast);
  let toastHeaderContainer = liveToast.querySelector(".toast-header");
  let toastHeader = liveToast.querySelector(".toast-header .me-auto");
  if (toastType) {
    toastHeaderContainer.classList.remove("bg-danger");
    toastHeaderContainer.classList.add("bg-success");
    liveToast.classList.remove("border-danger");
    liveToast.classList.add("border-success");
  } else {
    toastHeaderContainer.classList.remove("bg-success");
    toastHeaderContainer.classList.add("bg-danger");
    liveToast.classList.remove("border-success");
    liveToast.classList.add("border-danger");
  }
  cleanup(toastHeader);
  toastHeaderText = document.createTextNode(titleMessage);
  toastHeader.appendChild(toastHeaderText);
  let toastBody = liveToast.querySelector(".toast-body");
  cleanup(toastBody);

  let toastBodyText = document.createTextNode(bodyMessage);
  toastBody.appendChild(toastBodyText);
  let toast = new bootstrap.Toast(liveToast);
  toast.show();
}

function createRegisterPage() {
  //cleanup
  cleanup(appContainer);
  registerContainer = document.createElement("div");
  registerContainer.className = "d-flex";
  appContainer.appendChild(registerContainer);
  createRegisterAside();
  createMain();
}

function createCookie(name, value, days) {
  var date, expires;
  if (days) {
    date = new Date();
    date.setDate(date.getDate() + days);
    expires = "; expires=" + date.toUTCString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires;
}

function changeHash(hash) {
  //hash should include #
  window.location.hash = hash;
}

let eventSource;

function start(base_currency, quote_currency, cardId) {
  // when "Start" button pressed
  if (!window.EventSource) {
    // IE or an old browser
    alert("The browser doesn't support EventSource.");
    return;
  }

  eventSource = new EventSource(
    baseUrl +
      `currencies/quote?base_currency=${base_currency}&quote_currency=${quote_currency}`
  );

  eventSource.onopen = function (e) {
    console.log("Event: open");
  };

  eventSource.onerror = function (e) {
    console.log("Event: error");
    if (this.readyState == EventSource.CONNECTING) {
      console.log(`Reconnecting (readyState=${this.readyState})...`);
    } else {
      console.log("Error has occured.");
    }
  };

  eventSource.onmessage = function (e) {
    console.log("Event: message, data: " + e.data);
    currencyObj = JSON.parse(e.data);
    //populate the item
    item.mainCurrency = base_currency;
    item.secondCurrency = quote_currency;
    item.sellRate = currencyObj.sell;
    item.buyRate = currencyObj.buy;
    //call update rates method
  };
}

function stop() {
  // when "Stop" button pressed
  eventSource.close();
  eventSource = null;
  console.log("eventSource.close()");
}

//hash router
class MyHashRouter {
  constructor() {
    window.addEventListener("hashchange", (event) => this.onRouteChange(event));
    this.app = document.getElementById("app");
    console.log("hash router init");
  }
  //home
  onRouteChange(event) {
    const hashLocation = window.location.hash.substring(1);
    this.loadContent(hashLocation);
  }

  loadContent(uri) {
    const contentUri = `${uri}`;
    console.log(contentUri);

    //generate pages by uri
    switch (contentUri) {
      case "":
        //get data from server
        if (getCookie("username")) {
          getIndexData();
        } else {
          //create the page
          createLoginPage();
          showToast(
            "Please log in",
            "You have to be logged to see this page!",
            false
          );
        }

        console.log("dashboard page");
        hideLoading();
        window.scrollTo(0, 0);
        break;

      case "login":
        if (getCookie("username")) {
          showToast(
            "Warning",
            "You are already logged in as " + getCookie("username"),
            false
          );
          showLoading();
          getIndexData();
        } else {
          console.log("login route");
          createLoginPage();
          window.scrollTo(0, 0);
        }
        break;

      case "register":
        if (getCookie("username")) {
          showToast(
            "Warning",
            "You are already logged in as " + getCookie("username"),
            false
          );
          showLoading();
          getIndexData();
        } else {
          console.log("register route");
          createRegisterPage();
          window.scrollTo(0, 0);
        }
        break;

      default:
        let message = document.createElement("p");
        let messageText = document.createTextNode("Not Found");
        message.appendChild(messageText);
        app.appendChild(message);
        break;
    }
  }
}
