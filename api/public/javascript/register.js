const body = document.getElementsByClassName("body")[0];
const appContainer = document.getElementById("app");
let registerContainer = null;

function createRegisterAside() {
  let aside = document.createElement("aside");
  registerContainer.appendChild(aside);
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

function createMain() {
  let main = document.createElement("main");
  registerContainer.appendChild(main);
  main.className = "main";

  let divContainer = document.createElement("div");
  main.appendChild(divContainer);
  divContainer.className = "main__container";

  const logoImg = document.createElement("img");
  logoImg.classList.add("mobile__image");
  logoImg.classList.add("register__logo");
  logoImg.setAttribute(
    "src",
    "https://raw.githubusercontent.com/WebToLearn/fx-trading-app/master/App/ui/src/assets/img/logo-main.svg"
  );
  logoImg.setAttribute("alt", "logo");
  main.append(logoImg);

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
  form.setAttribute("id", "form");

  let divUsername = document.createElement("div");
  form.appendChild(divUsername);
  divUsername.className = "mb-3 align-content-center";

  let pUsername = document.createElement("p");
  divUsername.appendChild(pUsername);
  pUsername.textContent = "Username";

  let inputUsername = document.createElement("input");

  divUsername.appendChild(inputUsername);
  inputUsername.className = "form-control";
  inputUsername.setAttribute("id", "inputUsername");
  inputUsername.setAttribute("type", "text");
  inputUsername.setAttribute("name", "user");
  inputUsername.setAttribute("aria-describedby", "emailHelp");
  inputUsername.setAttribute("placeholder", "Username");
  inputUsername.setAttribute("value", "oana");

  let divEmail = document.createElement("div");
  form.appendChild(divEmail);
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
  inputEmail.setAttribute("value", "oana@oana2.com");

  let divPassword = document.createElement("div");
  form.appendChild(divPassword);
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
  inputPassword.setAttribute("value", "Test123!");

  let divPasswordConfirm = document.createElement("div");
  form.appendChild(divPasswordConfirm);
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
  inputPasswordConfirm.setAttribute("value", "Test123!");

  let submitBtn = document.createElement("button");
  form.appendChild(submitBtn);
  submitBtn.setAttribute("id", "submitBtn");
  submitBtn.className = "main__btn";
  submitBtn.setAttribute("type", "submit");
  submitBtn.addEventListener("click", () => {
    submitRegisterData();
  });
  submitBtn.textContent = "Register";

  let divRegister = document.createElement("div");
  divContainer.appendChild(divRegister);
  divRegister.className = "register";

  let pRegister = document.createElement("p");
  divRegister.appendChild(pRegister);
  pRegister.textContent = "Already have an account? ";

  let aRegister = document.createElement("a");
  pRegister.appendChild(aRegister);
  aRegister.setAttribute("href", "/login");
  aRegister.textContent = "Login";
}

function submitRegisterData() {
  const form = document.getElementById("form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const isValid = validateRegisterForm(); // front-end validation

      if (isValid) {
        // submit form

        let username = document.getElementById("inputUsername").value;
        let email = document.getElementById("inputEmail").value;
        let password = document.getElementById("inputPassword").value;
        let repassword = document.getElementById("inputPasswordConfirm").value;
        const url = "http://localhost:8080/api/auth/register";

        fetch(url, {
          method: "POST",
          headers: {
            //Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            repassword: repassword,
          }),
        })
          .then((data) => {
            console.log(data);
            if (data.status == 200) {
              createCookie("user", `${username}`, 2);
              showToast("Register succesfull", "dsdsdsds");
              setTimeout(function () {
                e.preventDefault();
                window.location.href = "/";
              }, 2000);

              //window.location.hash = "#dashboard";
            } else {
              showToast("Error", "Registration failed!");
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

  const username = document.getElementById("inputUsername");
  removePreviousError(username.parentElement);
  if (!username.value) {
    isValid = false;
    username.parentElement.insertAdjacentHTML(
      "beforeend",
      '<p class="error">Username is not valid</p>'
    );
  } else if (username.value.length < 3 || username.value.length > 20) {
    isValid = false;
    username.parentElement.insertAdjacentHTML(
      "beforeend",
      '<p class="error">Username must be between 3 and 20 characters</p>'
    );
  }

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
      '<p class="error">Password must be 8 characters long and must contain at least: one uppercase, one lowercase, a number and a special character!</p>'
    );
  }
  function checkRegExp(regExp, myStr) {
    return regExp.test(myStr);
  }

  const confirmPassword = document.getElementById("inputPasswordConfirm");
  removePreviousError(confirmPassword.parentElement);
  if (confirmPassword.value !== password.value) {
    isValid = false;
    confirmPassword.parentElement.insertAdjacentHTML(
      "beforeend",
      '<p class="error">Passwords do not match</p>'
    );
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

function showToast(titleMessage, bodyMessage) {
  console.log("suntem in showToast");
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

function createRegisterPage() {
  registerContainer = document.createElement("div");
  registerContainer.className = "d-flex";
  appContainer.appendChild(registerContainer);
  createRegisterAside();
  createMain();
}

function createCookie(name, value, days) {
  var date, expires;
  if (days) {
    date = new Date();
    date.setDate(date.getDate() + days);
    expires = "; expires=" + date.toUTCString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires;
}

createRegisterPage();
