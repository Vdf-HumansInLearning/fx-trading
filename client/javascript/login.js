const body = document.getElementsByClassName("body")[0];

function createAsideImage() {
  let aside = document.createElement("aside");
  aside.classList.add("aside");
  let img = document.createElement("img");
  img.classList.add("aside__img");
  img.setAttribute(
    "src",
    "https://raw.githubusercontent.com/WebToLearn/fx-trading-app/master/App/ui/src/assets/img/logo-grayscale.svg"
  );
  img.setAttribute("alt", "logo");
  body.appendChild(aside);
  aside.appendChild(img);

  return aside;
}

function createMainLoginForm() {
  let main = document.createElement("main");
  main.classList.add("main");
  body.appendChild(main);
  let mainContainer = document.createElement("div");
  mainContainer.classList.add("main__container");
  main.appendChild(mainContainer);

  let h1 = document.createElement("h1");
  h1.classList.add("main__title");
  h1.textContent = "Log in to your account";
  mainContainer.appendChild(h1);

  let form = document.createElement("form");
  form.setAttribute("method", "POST");
  mainContainer.appendChild(form);

  let firstDiv = document.createElement("div");
  firstDiv.className =
    "mb-3 d-flex align-content-center justify-content-evenly";
  form.appendChild(firstDiv);
  let emailIcon = document.createElement("i");
  emailIcon.className = "fas fa-user-alt";
  firstDiv.appendChild(emailIcon);

  let emailInput = document.createElement("input");
  firstDiv.appendChild(emailInput);
  emailInput.id = "inputEmail";
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("name", "email");
  emailInput.classList.add("form-control");
  emailInput.setAttribute("aria-describedby", "emailHelp");
  emailInput.setAttribute("placeholder", "Email");

  let secondDiv = document.createElement("div");
  secondDiv.className = "mb-3 d-flex align-content-center";
  form.appendChild(secondDiv);
  let passwordIcon = document.createElement("i");
  passwordIcon.className = "fas fa-unlock";
  secondDiv.appendChild(passwordIcon);

  let passwordInput = document.createElement("input");
  secondDiv.appendChild(passwordInput);
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("name", "password");
  passwordInput.className = "form-control";
  passwordInput.setAttribute("is", "inputPassword");
  passwordInput.setAttribute("placeholder", "Password");

  let loginBtn = document.createElement("button");
  form.appendChild(loginBtn);
  loginBtn.setAttribute("id", "loginBtn");
  loginBtn.setAttribute("type", "submit");
  loginBtn.className = "main__btn";
  loginBtn.textContent = "Login";

  let divRegister = document.createElement("div");
  form.appendChild(divRegister);
  divRegister.className = "register";

  let p = document.createElement("p");
  divRegister.appendChild(p);
  p.textContent = "You don't have an account? ";
  let a = document.createElement("a");
  p.appendChild(a);
  a.setAttribute("href", "../client/register.html");
  a.textContent = "Register";

  return main;
}

createAsideImage();
createMainLoginForm();
