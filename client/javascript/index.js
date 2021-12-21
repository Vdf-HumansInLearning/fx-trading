const mainContainer = document.getElementById('body-container')

function createNavigationBar(){
    const navElem = document.createElement('nav');
    navElem.className = "navbar navbar-light bg-light mb-3";

    const navBrand = document.createElement('a');
    navBrand.className = "navbar-brand";
    navBrand.setAttribute('href','#');

    const navImage = document.createElement('img');
    navImage.setAttribute('src',"https://raw.githubusercontent.com/WebToLearn/fx-trading-app/master/App/ui/src/assets/img/logo-main.svg");
    navImage.setAttribute('alt', 'logo');
    navImage.setAttribute('width', '85px');
    navImage.setAttribute('height', '100%');

    const logoutBtn = document.createElement('a');
    logoutBtn.className = "btn btn-outline-secondary";
    logoutBtn.setAttribute('href', './login.html');
    logoutBtn.setAttribute('role', 'button');
    logoutBtn.textContent = "Logout";

    navBrand.appendChild(navImage);
    navElem.appendChild(navBrand);
    navElem.appendChild(logoutBtn);

    return navElem;
}

function createBlotterView(){

    const blotterSection = document.createElement('section');
    blotterSection.className = "col-sm-12 col-md-12 col-lg-6";

    const blotterTitle = document.createElement('h5');
    blotterTitle.className = "color-titles";
    blotterTitle.textContent = "Blotter View";
    const hr = document.createElement('hr');
    
    blotterSection.appendChild(blotterTitle);
    blotterSection.appendChild(hr);

    const blotterButtons = document.createElement('div');
    blotterButtons.className = "blotter-buttons";

    const filterSubtitle = document.createElement('p');
    filterSubtitle.className = "subtitle";
    filterSubtitle.textContent = "FILTERS";

    blotterButtons.appendChild(filterSubtitle);

    const verticalLine = document.createElement('div');
    verticalLine.className = "vertical-line";
    blotterButtons.appendChild(verticalLine);

    const inputFilters = document.createElement('div');
    inputFilters.className = "row";

    const inputFiltersGroupSt = document.createElement('div');
    inputFiltersGroupSt.className = "input-group col mb-3";

    const inputCcyLabel = document.createElement('label');
    inputCcyLabel.className = "input-group-text";
    inputCcyLabel.setAttribute('for',"inputCcy");
    inputCcyLabel.textContent = "CCY Pair";

    const inputCyy = document.createElement('select');
    inputCyy.className = "form-select";
    inputCyy.setAttribute('id','inputCcy');

    let tenantOptions = ['Spot','1M','3M'];

    for(let i = 0; i < tenantOptions.length; i++){
        const option = document.createElement('option');
        option.setAttribute('value', tenantOptions[i]);
        option.textContent = tenantOptions[i];
        inputCyy.appendChild(option);
    }

    inputFiltersGroupSt.appendChild(inputCcyLabel);
    inputFiltersGroupSt.appendChild(inputCyy);

    const inputFiltersGroupNd = document.createElement('div');
    inputFiltersGroupNd.className = "input-group col mb-3";

    const inputDateLabel = document.createElement('span');
    inputDateLabel.className = "input-group-text";
    inputDateLabel.textContent = "Date";

    const inputDate = document.createElement('input');
    inputDate.setAttribute('type','date');
    inputDate.className = 'form-control';
    inputDate.setAttribute('id','inputDate');
    inputDate.setAttribute('placeholder','12/02/2018');

    inputFiltersGroupNd.appendChild(inputDateLabel);
    inputFiltersGroupNd.appendChild(inputDate);

    inputFilters.appendChild(inputFiltersGroupSt);
    inputFilters.appendChild(inputFiltersGroupNd);
    blotterButtons.appendChild(inputFilters);

    const blotterTableResponsive = document.createElement('div');
    blotterTableResponsive.className = "table-responsive";

    const blotterTable = document.createElement('table');
    blotterTable.className = "table table-striped";

    const headTable = document.createElement('thead');
    headTable.className = 'thead-primary';

    const tr = document.createElement('tr');
    headTable.appendChild(tr);

    let tableHeadArray = [{"name":"ID", "icon": false},{"name":"Username", "icon": true},
                          {"name":"CYY Pair", "icon": true},{"name":"Rate", "icon": false},
                          {"name":"Action", "icon": true}, {"name":"Notional", "icon": true},
                          {"name":"Tenor", "icon": false}, {"name":"Transaction Date", "icon": true}]
    
    for(let i = 0; i < tableHeadArray.length; i++){
        const th = document.createElement('th');
        th.setAttribute('scope','col');
        th.textContent = tableHeadArray[i].name;
        if(tableHeadArray[i].icon){
            const icon = document.createElement('i');
            icon.className = 'fas fa-sort';
            th.appendChild(icon);
        }
        tr.appendChild(th);
    }

    const bodyTable = document.createElement('tbody');
    const trUsers = document.createElement('tr');

    let tableRegistrations = [{"id":1, "username": 'Mark Otto',"ccy_pair":'USD/EUR',"rate":"0.86",
    "action": "sell",
    "notional":"100",
    "tenor": "1M",
    "trans_date": "12/02/2018 12:22",}]

    for(let i = 0; i < tableRegistrations.length; i++){
        const rowId = document.createElement('th');
        rowId.setAttribute('scope','row');
        rowId.textContent = tableRegistrations[i].id;
        trUsers.appendChild(rowId);

        const tdName = document.createElement('td');
        tdName.textContent = tableRegistrations[i].username;
        trUsers.appendChild(tdName);

        const tdCcyPair = document.createElement('td');
        tdCcyPair.textContent = tableRegistrations[i].ccy_pair;
        trUsers.appendChild(tdCcyPair);

        const tdRate = document.createElement('td');
        tdRate.textContent = tableRegistrations[i].rate;
        trUsers.appendChild(tdRate);

        const tdAction = document.createElement('td');
        tdAction.textContent = tableRegistrations[i].action;
        trUsers.appendChild(tdAction);

        const tdNotional = document.createElement('td');
        tdNotional.textContent = tableRegistrations[i].notional;
        trUsers.appendChild(tdNotional);

        const tdTenor = document.createElement('td');
        tdTenor.textContent = tableRegistrations[i].tenor;
        trUsers.appendChild(tdTenor);

        const tdDate = document.createElement('td');
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

function createMainWidget(){
}

function createPickWidget(){
}

function createAddWidget(){
}

function createRatesView(){
}

function createIndexPage(){
    const navBar = createNavigationBar();
    mainContainer.appendChild(navBar);

    const blotter = createBlotterView();
    mainContainer.appendChild(blotter);
}

createIndexPage();