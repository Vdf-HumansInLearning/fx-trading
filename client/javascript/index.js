const bodyContainer = document.getElementById("body-container");
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
];

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
    confirmBtn.addEventListener("click", addNewWidget);
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
        pickWidget = createPickWidget();
        cardsRow.prepend(pickWidget);
        widgetsNr++;
    } else {
        generateMessage("You cannot have more than 5 widgets on the page");
    }
}

function addNewWidget() {
    //no more that 5 cards
    if (widgetsNr <= 4) {
        //fetch item from api
        const newWidget = createMainWidget(item);
        cardsRow.prepend(newWidget);
        pickWidget.remove();
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

    bodyContainer.append(toast);
}

function createTableHeader(tr) {
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

    return inputFilters;
}

function createOneTableRegistration(transaction, trUsers) {
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
    const trUsers = document.createElement("tr");

    for (let i = 0; i < tableRegistrations.length; i++) {
        createOneTableRegistration(tableRegistrations[i], trUsers);
    }

    bodyTable.appendChild(trUsers);
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

createIndexPage();
