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

function createMainWidget() {}

function createPickWidget() {
  //create column
  let cardContainer = document.createElement("div");
  cardContainer.classList.add("col");

  //create card container
  let card = document.createElement("div");
  card.className = "card";

  let cardCurrency = document.createElement("div");
  cardCurrency.className =
    "card-currency--border px-3 d-flex justify-content-between";

  cardContainer.append(card);
  card.append(cardCurrency);

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

  //append elements to card rates div
  currencyTitle.append(currencyTitleText);
  cardCurrencyDiv.append(currencyTitle);

  cardCurrency.append(cardCurrencyDiv);
  cardCurrency.append(closeBtn);

  //create inputs for base and quote currency
  let cardInputs = document.createElement("div");
  cardInputs.className = "card-input--center mt-3 px-3";

  //create input groups
  const cardInputsList = [
    {
      label_for: "inputMainCurrency",
      label_text: "Primary",
      select_id: "inputMainCurrency",
      select_options: [
        { value: "opt_usd", text: "USD" },
        { value: "opt_eur", text: "EUR" },
        { value: "opt_gbr", text: "GBR" },
        { value: "opt_ron", text: "RON" },
        { value: "opt_chf", text: "CHF" },
      ],
    },
    {
      label_for: "inputSecondCurrency",
      label_text: "Secondary",
      select_id: "inputSecondCurrency",
      select_options: [
        { value: "opt_usd", text: "USD" },
        { value: "opt_eur", text: "EUR" },
        { value: "opt_gbr", text: "GBR" },
        { value: "opt_ron", text: "RON" },
        { value: "opt_chf", text: "CHF" },
      ],
    },
  ];

  //create select for currencies

  cardInputsList.forEach((cardInput) => {
    let inputGroup = document.createElement("div");
    inputGroup.className = "input-group mb-3";
    let label = document.createElement("label");
    label.classList.add("input-group-text");
    label.setAttribute("for", cardInput.label_for);
    let labelText = document.createTextNode(cardInput.label_text);
    label.append(labelText);

    cardInputs.append(inputGroup);
    inputGroup.append(label);

    //create select element for each currency
    let select = document.createElement("select");
    select.classList.add("form-select");
    select.setAttribute("id", cardInput.select_id);

    //add one disabled option
    let disabledOption = document.createElement("option");
    disabledOption.setAttribute("value", "opt_none");
    let disabledOptionText = document.createTextNode("Choose...");
    disabledOption.append(disabledOptionText);

    select.append(disabledOption);

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
  cardActions.append(confirmBtn);

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

  return cardContainer;
}

function createRatesView() {}

function createIndexPage() {
  const navBar = createNavigationBar();
  mainContainer.appendChild(navBar);

  const addWidget = createAddWidget();
  mainContainer.append(addWidget);

  const pickWidget = createPickWidget();
  mainContainer.append(pickWidget);
}

createIndexPage();
