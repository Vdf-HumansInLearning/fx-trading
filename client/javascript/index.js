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
  //input group list
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

  //create column
  let cardContainer = document.createElement("div");
  cardContainer.classList.add("col");
  cardContainer.id = "card0";

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

    //add one disabled option
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
  confirmBtn.addEventListener("click", createMainWidget);
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

  cardContainer.addEventListener("click", addNewWidget);

  return cardContainer;
}
//keep track of how many widgets are on the page
let widgetsNr = 0;
function addNewWidget() {
  //no more that 5 cards
  if (widgetsNr <= 1) {
    const newWidget = createPickWidget();
    cardsRow.append(newWidget);
    widgetsNr++;
  } else {
    generateMessage("You cannot have more than 5 widgets on the page");
  }
}

function closeWidget(cardId) {
  document.getElementById(cardId).remove();
  widgetsNr--;
}

function generateMessage(message) {
  //   let toast = document.createElement("div");
  //   toast.className = "toast-custom success";
  //   let outerContainer = document.createElement("div");
  //   outerContainer.className = "outer-container";
  //   let icon = document.createElement("i");
  //   outerContainer.className = "fas fa-check-circle";
  //   outerContainer.append(icon);

  //   let innerContainer = document.createElement("div");
  //   innerContainer.className = "inner-container";
  //   let innerContainerTitle = document.createElement("p");
  //   innerContainerTitle.innerText = "Success";
  //   let innerContainerMessage = document.createElement("p");
  //   innerContainerMessage.innerText = message;

  //   innerContainer.append(innerContainerTitle);
  //   innerContainer.append(innerContainerMessage);

  //   toast.append(outerContainer);
  //   toast.append(innerContainer);

  let toast = document.createElement("div");
  toast.className = "tn-box tn-box-color-1";
  let toastTitle = document.createElement("p");
  toastTitle.innerText = message;

  toast.append(toastTitle);

  toast.classList.add("tn-box-active");

  mainContainer.append(toast);
}
//initialize container for cards
let cardsRow = null;
function createRatesView() {
  //create main section in which the cards will be
  let ratesSection = document.createElement("div");
  ratesSection.className = "col-sm-12 col-md-12 col-lg-6";

  //create title
  let ratesTitle = document.createElement("h5");
  ratesTitle.classList.add("color-titles");

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
  mainContainer.appendChild(navBar);

  //create main div
  let main = document.createElement("main");
  main.className = "container-fluid row mb-5";
  mainContainer.append(main);

  let ratesSection = createRatesView();
  main.append(ratesSection);
}

createIndexPage();
