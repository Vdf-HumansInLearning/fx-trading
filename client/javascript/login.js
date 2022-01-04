////const methods = require("methods");
//onst { response } = require("../../api/app");

//const { response } = require("express");

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

  let hr = document.createElement("hr");
  mainContainer.appendChild(hr);
  hr.className = "solid";

  let form = document.createElement("form");
  form.setAttribute("id", "form");
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
  secondDiv.className = "mb-3 d-flex align-content-center ";
  form.appendChild(secondDiv);

  let passwordIcon = document.createElement("i");
  passwordIcon.className = "fas fa-unlock";
  secondDiv.appendChild(passwordIcon);

  let divIconAndPassword = document.createElement("div");
  secondDiv.appendChild(divIconAndPassword);
  divIconAndPassword.className = "mb-3 d-flex align-content-center flex-column";

  let passwordInput = document.createElement("input");
  secondDiv.appendChild(passwordInput);
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("name", "password");
  passwordInput.className = "form-control";
  passwordInput.setAttribute("id", "inputPassword");
  passwordInput.setAttribute("placeholder", "Password");

  let loginBtn = document.createElement("button");
  form.appendChild(loginBtn);
  loginBtn.setAttribute("id", "loginBtn");
  loginBtn.setAttribute("type", "submit");
  loginBtn.className = "main__btn";
  loginBtn.textContent = "Login";
  loginBtn.addEventListener("click", login);

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

function login() {
  const form = document.getElementById("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let userEmail = document.getElementById("inputEmail").value;
      let password = document.getElementById("inputPassword").value;

      const isValid = validateRegisterForm();

      if (isValid) {
        let url = "http://localhost:8080/api/auth/login";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail, password: password }),
        })
          .then((res) =>
            res.json().then((data) => ({ status: res.status, body: data }))
          )
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              //save cookie

              showToast("Login succesfull", "You have been logged in");
              setTimeout(() => {
                window.location.href =
                  "http://127.0.0.1:5500/client/index.html";
              }, 2000);

              //window.location.hash = "#dashboard";
            } else {
              showToast("Login failed", response.body.message);
            }
          })

          .catch((error) => {
            console.log(error);
          });
      }
    });
  }
}

function validateRegisterForm() {
  let isValid = true;
  const passRegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const email = document.getElementById("inputEmail");
  removePreviousError(email.parentElement);
  const pattern = /^\S+@\S+\.\S+$/;
  if (!pattern.test(email.value)) {
    email.parentElement.insertAdjacentHTML(
      "beforeend",
      '<p class="error">Email is not valid</p>'
    );
  }

  const password = document.getElementById("inputPassword");
  removePreviousError(password.parentElement);
  if (password.value.length < 7 || password.value.length >= 20) {
    isValid = false;
    password.parentElement.insertAdjacentHTML(
      "beforeend",
      '<p class="error">Password must be between 8 and 20 characters</p>'
    );
  } else if (checkRegExp(passRegExp, password.value) === false) {
    isValid = false;
    password.parentElement.insertAdjacentHTML(
      "beforeend",
      '<p class="error">"Password must be 8 characters long and must contain at least: one uppercase, one lowercase, a number and a special character!"</p>'
    );
  }
  function checkRegExp(regExp, myStr) {
    return regExp.test(myStr);
  }

  return isValid;
}

function removePreviousError(parent) {
  const errors = parent.getElementsByClassName("error");

  if (errors.length > 0) {
    for (let errChild of errors) {
      parent.removeChild(errChild);
    }
  }
}

function generateMessage(message) {
  let toast = document.createElement("div");
  toast.className = "tn-box tn-box-color-1";
  let toastTitle = document.createElement("p");
  toastTitle.innerText = message;

  toast.append(toastTitle);

  toast.classList.add("tn-box-active");

  body.append(toast);
}

function showToast(titleMessage, bodyMessage) {
  let liveToast = document.getElementById("liveToast");
  console.log(liveToast);
  let toastHeader = liveToast.querySelector(".toast-header .me-auto");
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
