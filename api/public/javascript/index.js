export const bodyContainer = document.getElementById("body-container");
export const appContainer = document.getElementById("app");
export const baseUrl = "http://localhost:8080/api/";
//keep track of how many widgets are on the page
export let widgetsNr = 0;
export let pickWidget = null;

//initialize container for cards
export let cardsRow = null;

export let item = {
  mainCurrency: "",
  secondCurrency: "",
  sellRate: 0,
  buyRate: 0,
};

export let tableHeadArray = [
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
export let tableRegistrations = [];
export let currentSelectionTable = [];
//ccyPairs input
export let ccyPairs = [];
//card ids
export let cardIdCounter = 0;

//input group list
export let cardInputsList = [
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

export let sortObj = {
  username: false,
  ccy_pair: false,
  action: false,
  notional: false,
  trans_date: false,
};

//select for PickWidget
export let inputMainCurrency = null;
export let inputSecondaryCurrency = null;

export function createNavigationBar() {
  const navElem = document.createElement("nav");
  navElem.className = "navbar navbar-light bg-light mb-3";

  const navBrand = document.createElement("a");
  navBrand.className = "navbar-brand";
  navBrand.setAttribute("href", "#");

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
  logoutBtn.setAttribute("href", "/login");
  logoutBtn.setAttribute("role", "button");
  logoutBtn.setAttribute("id", "logoutBtn");
  logoutBtn.addEventListener("click", clearCookiesOnLogout);
  logoutBtn.textContent = "Logout";

  navBrand.appendChild(navImage);
  navElem.appendChild(navBrand);
  navElem.appendChild(logoutBtn);

  return navElem;
}

export function createMainWidget(item) {
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
  spanMainCurrency.setAttribute("id", "mainCurrency");
  spanMainCurrency.textContent = `${item.mainCurrency}`;
  spanMainCurrency.setAttribute("value", `${item.mainCurrency}`);

  let spanSecondCurrency = document.createElement("span");
  pSubtitle.appendChild(spanSecondCurrency);
  spanSecondCurrency.className = "secondCurrency";
  spanSecondCurrency.setAttribute("id", "secondCurrency");
  spanSecondCurrency.textContent = `/${item.secondCurrency}`;
  spanSecondCurrency.setAttribute("value", `${item.secondCurrency}`);

  let divIcon = document.createElement("div");
  cardDivItems.appendChild(divIcon);
  divIcon.className = "icon-exchange";

  let iconExchange = document.createElement("i");
  divIcon.appendChild(iconExchange);
  iconExchange.className = "fas fa-exchange-alt";

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
  spanRate.textContent = `${item.sellRate}`;

  let spanSellIcon = document.createElement("span");
  pRatesSell.appendChild(spanSellIcon);
  spanSellIcon.className = "icon-down";

  let sellIcon = document.createElement("i");
  spanSellIcon.appendChild(sellIcon);
  sellIcon.className = "fas fa-caret-down";

  let pRatesBuy = document.createElement("p");
  cardRatesDiv.appendChild(pRatesBuy);
  pRatesBuy.className = "subtitle mb-0";
  pRatesBuy.textContent = "BUY: ";

  let spanBuyRate = document.createElement("span");
  pRatesBuy.appendChild(spanBuyRate);
  spanBuyRate.className = "text-large";
  spanBuyRate.textContent = `${item.buyRate}`;

  let spanIconBuy = document.createElement("span");
  pRatesBuy.appendChild(spanIconBuy);
  spanIconBuy.className = "icon-up";

  let iconBuy = document.createElement("i");
  spanIconBuy.appendChild(iconBuy);
  iconBuy.className = "fas fa-caret-up";

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
  inputNational.setAttribute("id", "inputDate");
  inputNational.setAttribute("placeholder", "Amount");
  inputNational.setAttribute("min", 0);

  let tenorDiv = document.createElement("div");
  cardMainArea.appendChild(tenorDiv);
  tenorDiv.className = "input-group mb-3";

  let labelTenor = document.createElement("label");
  tenorDiv.appendChild(labelTenor);
  labelTenor.className = "input-group-text";
  labelTenor.setAttribute("for", "inputCcy");
  labelTenor.textContent = "Tenor";

  let select = document.createElement("select");
  tenorDiv.appendChild(select);
  select.className = "form-select";
  select.setAttribute("id", "inputCcy");

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
      `${item.mainCurrency}`,
      `${item.secondCurrency}`,
      `${item.sellRate}`
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
      `${item.mainCurrency}`,
      `${item.secondCurrency}`,
      `${item.buyRate}`
    );
  });
  return cardDivCol;
}

export function sendDataTransactions(
  action,
  mainCurrency,
  secondCurrency,
  sellOrBuyRate
) {
  let notional = document.getElementById("inputDate").value;
  let tenor = document.getElementById("inputCcy").value;
  let mainCurrencyToSend = mainCurrency.toUpperCase();
  let secondCurrencyToSend = secondCurrency.toUpperCase();
  let sellOrBuyRateToSend = sellOrBuyRate;
  let userName = getCookie("username");

  if (notional && tenor !== "Choose...") {
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

    console.log(mainCurrencyToSend);
    console.log(secondCurrencyToSend);
    console.log(sellOrBuyRateToSend);
    console.log(`${mainCurrencyToSend}/${secondCurrencyToSend}`);
    console.log(actionSellOrBuy);
    console.log(outputDate);
    console.log(time);
    console.log(notional);
    console.log(tenor);
    console.log(userName);

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
          document.getElementById("inputDate").value = null;
          document.getElementById("inputCcy").value =
            document.getElementById("inputCcy").options[0].value;
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
  }
}

export function createPickWidget() {
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
    select.addEventListener("change", selectCurrency);

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
  confirmBtn.addEventListener("click", confirmSelectionCurrency);
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

export function createAddWidget() {
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

export function addPickWidget() {
  //no more that 5 cards
  if (widgetsNr <= 4) {
    console.log("create pick widget");
    pickWidget = createPickWidget();
    cardsRow.prepend(pickWidget);
    widgetsNr++;
  } else {
    showToast(
      "Error",
      "You cannot have more than 5 widgets on the page",
      false
    );
  }
}

export function addNewWidget() {
  //no more that 5 cards
  if (widgetsNr <= 5) {
    //fetch item from api
    const newWidget = createMainWidget(item);
    cardsRow.prepend(newWidget);
    pickWidget.remove();
    widgetsNr++;
  } else {
    showToast(
      "Error",
      "You cannot have more than 5 widgets on the page",
      false
    );
  }
}

export function closeWidget(cardId) {
  document.getElementById(cardId).remove();
  widgetsNr--;
}

export function selectCurrency() {
  inputMainCurrency = document.getElementById("inputMainCurrency");
  inputSecondCurrency = document.getElementById("inputSecondCurrency");

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

export function confirmSelectionCurrency() {
  inputMainCurrency = document.getElementById("inputMainCurrency");
  inputSecondaryCurrency = document.getElementById("inputSecondCurrency");
  console.log("inside confirm selection");
  console.log(inputMainCurrency);

  console.log(inputSecondaryCurrency.value);

  if (
    inputMainCurrency.value &&
    inputSecondaryCurrency.value &&
    inputMainCurrency.value !== "opt_none" &&
    inputSecondaryCurrency.value !== "opt_none"
  ) {
    if (inputMainCurrency.value == inputSecondCurrency.value) {
      showToast("Error", "You must choose two different currencies", false);
    } else {
      let currencyObj = {
        base_currency: inputMainCurrency.value,
        quote_currency: inputSecondaryCurrency.value,
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
            console.log(response.body);
            //populate the item
            item.mainCurrency = currencyObj.base_currency;
            item.secondCurrency = currencyObj.quote_currency;
            item.sellRate = response.body.sell;
            item.buyRate = response.body.buy;

            //create the page
            addNewWidget();
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
export function createTableHeader(tr) {
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

export function sortEntries(property, sortType) {
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

export function parseDates(a, b, property) {
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

export function createFiltersSection(blotterButtons) {
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
export function createOneTableRegistration(transaction, counter) {
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
export function createBodyTable(registrations) {
  const bodyTable = document.createElement("tbody");
  bodyTable.setAttribute("id", "table-body");
  for (let i = 0; i < registrations.length; i++) {
    const registration = createOneTableRegistration(registrations[i], i + 1);
    bodyTable.appendChild(registration);
  }
  return bodyTable;
}

export function createBlotterView() {
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

export function createRatesView() {
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

export function createIndexPage() {
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
export function clearCookie(name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
export function getCookie(cname) {
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
  console.log("dsdsd log out an delete cookie");
  clearCookie("username");
}

//display succes/error toast
export function showToast(titleMessage, bodyMessage, toastType) {
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
function cleanup(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//filter blotter table by given inputs
export function filterBlotterTable() {
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

      //create the page
      createIndexPage();
      hideLoading();
    })

    .catch((error) => {
      console.error("Error:", error);
    });
};

//loading
export function showLoading() {
  let loading = document.createElement("div");
  loading.classList.add("spinner");
  loading.id = "loadingContainer";

  appContainer.appendChild(loading);
}

export function hideLoading() {
  let container = document.getElementById("loadingContainer");
  if (container) container.remove();
}
