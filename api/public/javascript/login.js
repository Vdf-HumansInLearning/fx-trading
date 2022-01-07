const body = document.getElementsByClassName("body")[0];
const appContainer = document.getElementById("app");
let loginContainer = null;

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
  loginContainer.appendChild(aside);
  aside.appendChild(img);

  return aside;
}

function createMainLoginForm() {
  let main = document.createElement("main");
  main.classList.add("main");
  loginContainer.appendChild(main);
  let mainContainer = document.createElement("div");
  mainContainer.classList.add("main__container");
  main.appendChild(mainContainer);

  const logoImg = document.createElement("img");
  logoImg.classList.add("mobile__image");
  logoImg.setAttribute(
    "src",
    "https://raw.githubusercontent.com/WebToLearn/fx-trading-app/master/App/ui/src/assets/img/logo-main.svg"
  );
  logoImg.setAttribute("alt", "logo");
  main.append(logoImg);

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
  a.setAttribute("href", "/register");
  a.textContent = "Register";

  return main;
}

function login() {
  const form = document.getElementById("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let userEmail = document.getElementById("inputEmail").value;
      let password = document.getElementById("inputPassword").value;

      let url = "http://localhost:8080/api/auth/login";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, password: password }),
      })
        .then((res) =>
          res.json().then((data) => ({
            status: res.status,
            body: data,
          }))
        )
        .then((response) => {
          let username = response.body.username;
          if (response.status === 200) {
            //save cookie
            createCookie("username", `${username}`, 2);
            showToast("Login succesfull", "You have been logged in!", true);
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);

            //window.location.hash = "#dashboard";
          } else {
            showToast("Login failed", response.body.message, false);
          }
        })

        .catch((error) => {
          console.log(error);
        });
    });
  }
}

function removePreviousError(parent) {
  const errors = parent.getElementsByClassName("error");

  if (errors.length > 0) {
    for (let errChild of errors) {
      parent.removeChild(errChild);
    }
  }
}

function showToast(titleMessage, bodyMessage, toastType) {
  let liveToast = document.getElementById("liveToast");
  console.log(liveToast);
  let toastHeaderContainer = liveToast.querySelector(".toast-header");
  let toastHeader = liveToast.querySelector(".toast-header .me-auto");
  if (toastType) {
    toastHeaderContainer.classList.remove("bg-danger");
    toastHeaderContainer.classList.add("bg-success");
    liveToast.classList.remove("border-danger");
    liveToast.classList.add("border-success");
  } else {
    toastHeaderContainer.classList.remove("bg-success");
    toastHeaderContainer.classList.add("bg-danger");
    liveToast.classList.remove("border-success");
    liveToast.classList.add("border-danger");
  }
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

//when we move to login/register page from index,
//we should clear the whole body
//or, we can get navbar by id and remove the element
function createLoginPage() {
  loginContainer = document.createElement("div");
  loginContainer.className = "d-flex";
  appContainer.appendChild(loginContainer);

  createAsideImage();
  createMainLoginForm();
}

createLoginPage();
