const bodyContainer = document.getElementById("body-container");
const baseUrl = "http://localhost:8080/api/";
//keep track of how many widgets are on the page
let widgetsNr = 0;
let pickWidget = null;

//initialize container for cards
let cardsRow = null;

let item = {
  mainCurrency: "EUR",
  secondCurrency: "USD",
  sellRate: 4.5,
  buyRate: 5,
};

let tableHeadArray = [
  { name: "ID", icon: false },
  { name: "Username", icon: true },
  { name: "CYY Pair", icon: true },
  { name: "Rate", icon: false },
  { name: "Action", icon: true },
  { name: "Notional", icon: true },
  { name: "Tenor", icon: false },
  { name: "Transaction Date", icon: true },
];

let tableRegistrations = [
  {
    id: 1,
    username: "Mark Otto",
    ccy_pair: "USD/EUR",
    rate: "0.86",
    action: "sell",
    notional: "100",
    tenor: "1M",
    trans_date: "12/02/2018 12:22",
  },
  {
    id: 2,
    username: "Test Test",
    ccy_pair: "USD/RON",
    rate: "0.86",
    action: "buy",
    notional: "20000",
    tenor: "Spot",
    trans_date: "12/02/2018 15:28",
  },
];
//card ids
let cardIdCounter = 0;

//input group list
const cardInputsList = [
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

//ccyPairs input
const ccyPairs = [
  "USD/EUR",
  "USD/RON",
  "USD/GBP",
  "USD/CHF",
  "RON/USD",
  "RON/EUR",
  "RON/GBP",
  "RON/CHF",
  "EUR/USD",
  "EUR/RON",
  "EUR/GBP",
  "EUR/CHF",
  "CHF/USD",
  "CHF/EUR",
  "CHF/RON",
  "CHF/GBP",
  "GBP/USD",
  "GBP/EUR",
  "GBP/RON",
  "GBP/CHF",
];

//select for PickWidget
let inputMainCurrency = null;
let inputSecondaryCurrency = null;

function createNavigationBar() {
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
  logoutBtn.setAttribute("href", "./login.html");
  logoutBtn.setAttribute("role", "button");
  logoutBtn.setAttribute("id", "logoutBtn");
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
  spanMainCurrency.textContent = `${item.mainCurrency}`;

  let spanSecondCurrency = document.createElement("span");
  pSubtitle.appendChild(spanSecondCurrency);
  spanSecondCurrency.className = "secondCurrency";
  spanSecondCurrency.textContent = `/${item.secondCurrency}`;

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
  optionEmpty.textContent = "Choose...";

  let optionSpot = document.createElement("option");
  select.appendChild(optionSpot);
  optionSpot.setAttribute("value", "SP");
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
  sellBtn.textContent = "Sell";

  let buyBtn = document.createElement("button");
  divButtons.appendChild(buyBtn);
  buyBtn.className = "btn btn-primary";
  buyBtn.setAttribute("type", "button");
  buyBtn.textContent = "Buy";

  return cardDivCol;
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
      option.setAttribute("value", selectOption.value);
      let optionText = document.createTextNode(selectOption.text);
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
  if (widgetsNr <= 4) {
    getAvailableCurrencies();
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

function addNewWidget() {
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

function closeWidget(cardId) {
  document.getElementById(cardId).remove();
  widgetsNr--;
}

function selectCurrency() {
  inputMainCurrency = document.getElementById("inputMainCurrency");
  inputSecondCurrency = document.getElementById("inputSecondCurrency");

  if (inputMainCurrency && inputSecondCurrency)
    if (
      inputMainCurrency.value !== "opt_none" ||
      inputSecondaryCurrency.value !== "opt_none"
    ) {
      //user must choose two different currencies
      if (inputMainCurrency.value == inputSecondCurrency.value) {
        showToast("Error", "You must choose two different currencies", false);
      }
    }
}
function confirmSelectionCurrency() {
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
    }
    tr.appendChild(th);
  }
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

  const inputCcyLabel = document.createElement("label");
  inputCcyLabel.className = "input-group-text";
  inputCcyLabel.setAttribute("for", "inputCcy");
  inputCcyLabel.textContent = "CCY Pair";

  const inputCyy = document.createElement("select");
  inputCyy.className = "form-select";
  inputCyy.setAttribute("id", "inputCcy");

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

  const inputDate = document.createElement("input");
  inputDate.setAttribute("type", "date");
  inputDate.className = "form-control";
  inputDate.setAttribute("id", "inputDate");
  inputDate.setAttribute("placeholder", "12/02/2018");

  inputFiltersGroupNd.appendChild(inputDateLabel);
  inputFiltersGroupNd.appendChild(inputDate);

  inputFilters.appendChild(inputFiltersGroupSt);
  inputFilters.appendChild(inputFiltersGroupNd);

  return inputFilters;
}

function createOneTableRegistration(transaction) {
  const trUsers = document.createElement("tr");
  const rowId = document.createElement("th");
  rowId.setAttribute("scope", "row");
  rowId.textContent = transaction.id;
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
  tdDate.textContent = transaction.trans_date;
  trUsers.appendChild(tdDate);

  return trUsers;
}

function createBlotterView() {
  const blotterSection = document.createElement("section");
  blotterSection.className = "col-sm-12 col-md-12 col-lg-6";

  const blotterTitle = document.createElement("h5");
  blotterTitle.className = "color-titles";
  blotterTitle.textContent = "Blotter View";
  const hr = document.createElement("hr");

  blotterSection.appendChild(blotterTitle);
  blotterSection.appendChild(hr);

  const blotterButtons = document.createElement("div");
  blotterButtons.className = "blotter-buttons";

  let inputFilters = createFiltersSection(blotterButtons);
  blotterButtons.appendChild(inputFilters);

  const blotterTableResponsive = document.createElement("div");
  blotterTableResponsive.className = "table-responsive";

  const blotterTable = document.createElement("table");
  blotterTable.className = "table table-striped";

  const headTable = document.createElement("thead");
  headTable.className = "thead-primary";

  const tr = document.createElement("tr");
  headTable.appendChild(tr);

  createTableHeader(tr);

  const bodyTable = document.createElement("tbody");

  for (let i = 0; i < tableRegistrations.length; i++) {
    const registration = createOneTableRegistration(tableRegistrations[i]);
    bodyTable.appendChild(registration);
  }

  blotterTable.appendChild(headTable);
  blotterTable.appendChild(bodyTable);

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
  //create navbar
  const navBar = createNavigationBar();
  bodyContainer.appendChild(navBar);

  //create main div
  let mainContainer = document.createElement("main");
  mainContainer.className = "container-fluid row mb-5";
  bodyContainer.append(mainContainer);

  let ratesSection = createRatesView();
  mainContainer.append(ratesSection);

  const blotter = createBlotterView();
  mainContainer.appendChild(blotter);
}

// clear cookie using its name
function clearCookie(name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function clearCookiesOnLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", function () {
    clearCookie("username");
  });
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
function cleanup(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function getAvailableCurrencies() {
  fetch(baseUrl + "currencies", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let optionsList = data.map((item) => ({
        value: item,
        text: item,
      }));
      //populate the lists
      cardInputsList[0].select_options = optionsList;
      cardInputsList[1].select_options = optionsList;
      console.log("selects now have values");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

window.onload = () => {
  //load list of currencies available
  console.log("data");
  //create the page
  createIndexPage();
};
