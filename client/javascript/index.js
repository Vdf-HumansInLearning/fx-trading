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
console.log("AAAAA" + createNavigationBar)
mainContainer.appendChild(createNavigationBar());