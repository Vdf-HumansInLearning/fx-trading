//hash router
class MyHashRouter {
  constructor() {
    window.addEventListener("hashchange", (event) => this.onRouteChange(event));
    this.app = document.getElementById("app");
    console.log("hash router init");
  }
  onRouteChange(event) {
    const hashLocation = window.location.hash.substring(1);
    this.loadContent(hashLocation);
  }

  loadContent(uri) {
    const contentUri = `${uri}`;
    console.log(contentUri);

    //generate pages by uri
    //http://127.0.0.1:5500/client/#login
    switch (contentUri) {
      case "":
        window.location.hash = "#dashboard";

        break;
      case "dashboard":
        console.log("dashboard route");
        break;

      case "login":
        console.log("login route");
        break;

      case "register":
        console.log("register route");
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
