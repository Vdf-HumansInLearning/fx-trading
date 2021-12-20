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
createAsideImage();

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
    "mb-2 d-flex align-content-center justify-content-evenly";
  form.appendChild(firstDiv);
  let firstDivIcon = document.createElement("i");
  firstDivIcon.className = "fas fa-user fa-2x";
  firstDiv.appendChild(firstDivIcon);
  let emailInput = document.createElement("input");
  emailInput.id = "input-email";
  firstDiv.appendChild(emailInput);
  emailInput.setAttribute("type", "email");
}

//createMainLoginForm();
