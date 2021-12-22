const mainContainer = document.getElementById("body-container");

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
  logoutBtn.textContent = "Logout";

  navBrand.appendChild(navImage);
  navElem.appendChild(navBrand);
  navElem.appendChild(logoutBtn);

  return navElem;
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

  let tenantOptions = ["Spot", "1M", "3M"];

  for (let i = 0; i < tenantOptions.length; i++) {
    const option = document.createElement("option");
    option.setAttribute("value", tenantOptions[i]);
    option.textContent = tenantOptions[i];
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
  blotterButtons.appendChild(inputFilters);

  const blotterTableResponsive = document.createElement("div");
  blotterTableResponsive.className = "table-responsive";

  const blotterTable = document.createElement("table");
  blotterTable.className = "table table-striped";

  const headTable = document.createElement("thead");
  headTable.className = "thead-primary";

  const tr = document.createElement("tr");
  headTable.appendChild(tr);

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

  for (let i = 0; i < tableHeadArray.length; i++) {
    const th = document.createElement("th");
    th.setAttribute("scope", "col");
    th.textContent = tableHeadArray[i].name;
    if (tableHeadArray[i].icon) {
      const icon = document.createElement("i");
      icon.className = "fas fa-sort";
      th.appendChild(icon);
    }
    tr.appendChild(th);
  }

  const bodyTable = document.createElement("tbody");
  const trUsers = document.createElement("tr");

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
  ];

  for (let i = 0; i < tableRegistrations.length; i++) {
    const rowId = document.createElement("th");
    rowId.setAttribute("scope", "row");
    rowId.textContent = tableRegistrations[i].id;
    trUsers.appendChild(rowId);

    const tdName = document.createElement("td");
    tdName.textContent = tableRegistrations[i].username;
    trUsers.appendChild(tdName);

    const tdCcyPair = document.createElement("td");
    tdCcyPair.textContent = tableRegistrations[i].ccy_pair;
    trUsers.appendChild(tdCcyPair);

    const tdRate = document.createElement("td");
    tdRate.textContent = tableRegistrations[i].rate;
    trUsers.appendChild(tdRate);

    const tdAction = document.createElement("td");
    tdAction.textContent = tableRegistrations[i].action;
    trUsers.appendChild(tdAction);

    const tdNotional = document.createElement("td");
    tdNotional.textContent = tableRegistrations[i].notional;
    trUsers.appendChild(tdNotional);

    const tdTenor = document.createElement("td");
    tdTenor.textContent = tableRegistrations[i].tenor;
    trUsers.appendChild(tdTenor);

    const tdDate = document.createElement("td");
    tdDate.textContent = tableRegistrations[i].trans_date;
    trUsers.appendChild(tdDate);
  }

  bodyTable.appendChild(trUsers);
  blotterTable.appendChild(headTable);
  blotterTable.appendChild(bodyTable);

  blotterTableResponsive.appendChild(blotterTable);
  blotterSection.appendChild(blotterButtons);
  blotterSection.appendChild(blotterTableResponsive);

  return blotterSection;
}

function createMainWidget(item) {
  let cardDivCol = document.createElement("div");
  cardDivCol.className = "col";

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

  let tenantDiv = document.createElement("div");
  cardMainArea.appendChild(tenantDiv);
  tenantDiv.className = "input-group mb-3";

  let labelTenant = document.createElement("label");
  tenantDiv.appendChild(labelTenant);
  labelTenant.className = "input-group-text";
  labelTenant.setAttribute("for", "inputCcy");
  labelTenant.textContent = "Tenant";

  let select = document.createElement("select");
  tenantDiv.appendChild(select);
  select.className = "form-select";
  select.setAttribute("id", "inputCcy");

  let optionEmpty = document.createElement("option");
  select.appendChild(optionEmpty);
  optionEmpty.setAttribute("selected", "true");
  optionEmpty.textContent = "Choose...";

  let option1M = document.createElement("option");
  select.appendChild(option1M);
  option1M.setAttribute("value", "1M");
  option1M.textContent = "1 Month";

  let option2M = document.createElement("option");
  select.appendChild(option2M);
  option2M.setAttribute("value", "2M");
  option2M.textContent = "2 Month";

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

function createIndexPage() {
  const navBar = createNavigationBar();
  mainContainer.appendChild(navBar);
  let item = {
    mainCurrency: "EUR",
    secondCurrency: "USD",
    sellRate: 4.5,
    buyRate: 5,
  };

  const mainWidget = createMainWidget(item);
  mainContainer.appendChild(mainWidget);

  const blotter = createBlotterView();
  mainContainer.appendChild(blotter);
}

createIndexPage();
