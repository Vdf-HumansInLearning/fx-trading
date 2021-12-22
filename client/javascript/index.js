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

function createBlotterView() {}

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

function createPickWidget() {}

function createAddWidget() {}

function createRatesView() {}

function createIndexPage() {
  const navBar = createNavigationBar();
  mainContainer.appendChild(navBar);
  item = {
    mainCurrency: "EUR",
    secondCurrency: "USD",
    buyRate: 9.6,
    sellRate: 10.2,
  };
  const mainWidget = createMainWidget(item);
  mainContainer.appendChild(mainWidget);
}

createIndexPage();
