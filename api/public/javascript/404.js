const body = document.getElementsByClassName("body-container-404")[0];

function create404Page() {
  let main = document.createElement("main");
  body.appendChild(main);
  main.className = "main404";

  let divContainer = document.createElement("div");
  main.appendChild(divContainer);
  divContainer.className = "main__container404";

  let img = document.createElement("img");
  divContainer.appendChild(img);
  img.className = "background_img";
  img.setAttribute(
    "src",
    "https://raw.githubusercontent.com/WebToLearn/fx-trading-app/master/App/ui/src/assets/img/error_404.png"
  );
  img.setAttribute("alt", "logo404");

  let divMessage = document.createElement("div");
  divContainer.appendChild(divMessage);
  divMessage.className = "message_container";

  let p404 = document.createElement("p");
  divMessage.appendChild(p404);
  p404.className = "help-block-404";
  p404.textContent = "Sorry, the page your are looking for does not exist";

  let divLoginBtn = document.createElement("div");
  divContainer.appendChild(divLoginBtn);
  divLoginBtn.className = "button__container404";

  let a = document.createElement("a");
  divLoginBtn.appendChild(a);
  a.setAttribute("href", "/login");

  let loginBtn = document.createElement("button");
  a.appendChild(loginBtn);
  loginBtn.setAttribute("type", "submit");
  loginBtn.className = "btn btn-primary main__button404";
  loginBtn.textContent = "Go to Login";
}

create404Page();
