//hash router
class MyHashRouter {
  constructor() {
    window.addEventListener("hashchange", (event) => this.onRouteChange(event));
    this.app = document.getElementById("app");
  }
  onRouteChange(event) {
    const hashLocation = window.location.hash.substring(1);
    this.loadContent(hashLocation);
  }

  loadContent(uri) {
    const contentUri = `${uri}`;

    //generate pages by uri
    switch (contentUri) {
      case "":
        window.location.hash = "#home";
        break;
      case "home":
        break;

      default:
        let message = document.createElement("p");
        let messageText = document.createTextNode("Not Found");
        message.appendChild(messageText);
        app.appendChild(message);
        break;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  //when document loads, initialize router
  let myRouter = new MyHashRouter();
  //change hash so it triggers the event on first start
  const initialHash = window.location.hash;
  window.location.hash = "#aa";
  window.location.hash = initialHash;
});
