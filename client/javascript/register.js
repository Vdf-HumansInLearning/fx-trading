const body = document.getElementsByClassName("body")[0];

function createRegisterAside() {
  let aside = document.createElement("aside");
  body.appendChild(aside);
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

createRegisterAside();

function createMain() {
  let main = document.createElement("main");
  body.appendChild(main);
  main.className = "main";

  let divContainer = document.createElement("div");
  main.appendChild(divContainer);
  divContainer.className = "main__container";

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

  let divUsername = document.createElement("div");
  form.appendChild(divUsername);
  divUsername.className = "mb-3 align-content-center";

  let pUsername = document.createElement("p");
  divUsername.appendChild(pUsername);
  pUsername.textContent = "Username";

  let inputUsername = document.createElement("input");
  divUsername.appendChild(inputUsername);
  inputUsername.className = "form-control";
  inputUsername.setAttribute("id", "inputEmail");
  inputUsername.setAttribute("type", "text");
  inputUsername.setAttribute("name", "user");
  inputUsername.setAttribute("aria-describedby", "emailHelp");
  inputUsername.setAttribute("placeholder", "Username");

  let divEmail = document.createElement("div");
  divContainer.appendChild(divEmail);
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

  let divPassword = document.createElement("div");
  divContainer.appendChild(divPassword);
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

  let divPasswordConfirm = document.createElement("div");
  divContainer.appendChild(divPasswordConfirm);
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

  let submitBtn = document.createElement("button");
  divContainer.appendChild(submitBtn);
  submitBtn.setAttribute("id", "submitBtn");
  submitBtn.className = "main__btn";
  submitBtn.setAttribute("type", "submit");
  submitBtn.textContent = "Register";

  let divRegister = document.createElement("div");
  divContainer.appendChild(divRegister);
  divRegister.className = "register";

  let pRegister = document.createElement("p");
  divRegister.appendChild(pRegister);
  pRegister.textContent = "Already have an account? ";

  let aRegister = document.createElement("a");
  pRegister.appendChild(aRegister);
  aRegister.setAttribute("href", "./register.html");
  aRegister.textContent = "Login";
}
createMain();
