const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("loginLink");
  const estaLogueado = localStorage.getItem("logueado") === "true";
  if (estaLogueado) {
      loginLink.innerHTML = "Cerrar sesión";
      loginLink.addEventListener("click", () => {
          logout();
      });
  } else {
      loginLink.innerHTML = "Login";
  }
});

function logout() {
  localStorage.removeItem("logueado");
  localStorage.removeItem("nombreLogueado");
  window.location.href = "login.html";
}

DirigirALogin()
function DirigirALogin(){
  var estaLogueado = localStorage.getItem('logueado');
  if (estaLogueado != "true") {
      window.location.href = 'login.html';
  }
}

document.addEventListener("DOMContentLoaded", function(){
  var nameLogueado = localStorage.getItem('nombreLogueado');
  document.getElementById("nombreLogin").innerHTML=nameLogueado
});

document.getElementById("cerrarSesionDesplegable").addEventListener("click", () => {
  logout();
});

function cambiarModo() {
  const modoActual = localStorage.getItem("modo-preferido");
  const toggleButton = document.getElementById("toggleButton");
  const toggleIcon = document.getElementById("toggleButtonIcon");
  const toggleText = document.getElementById("toggleButtonText");

  if (modoActual === "modo-noche") {
    localStorage.setItem("modo-preferido", "modo-dia");
    document.body.classList.remove("modo-noche");
    toggleIcon.classList.remove("fa-moon");
    toggleIcon.classList.add("fa-sun");
    toggleText.textContent = "Modo dia";
    toggleButton.classList.remove("btn-dark");
    toggleButton.classList.add("btn-light");
    toggleButton.style.backgroundColor = '';
    toggleButton.style.border = '1px solid gray';
  } else {
    localStorage.setItem("modo-preferido", "modo-noche");
    document.body.classList.add("modo-noche");
    toggleIcon.classList.remove("fa-sun");
    toggleIcon.classList.add("fa-moon");
    toggleText.textContent = "Modo noche";
    toggleButton.classList.remove("btn-light");
    toggleButton.classList.add("btn-dark");
    toggleButton.style.backgroundColor = "#2C2E30";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const modoActual = localStorage.getItem("modo-preferido");
  const toggleButton = document.getElementById("toggleButton");
  const toggleIcon = document.getElementById("toggleButtonIcon");
  const toggleText = document.getElementById("toggleButtonText");

  if (modoActual === "modo-noche") {
    document.body.classList.add("modo-noche");
    toggleIcon.classList.add("fa-moon");
    toggleText.textContent = "Modo noche";
    toggleButton.classList.remove("btn-light");
    toggleButton.classList.add("btn-dark");
    toggleButton.style.backgroundColor = "#2C2E30";
    toggleButton.style.border = '1px solid gray';
  } else {
    toggleText.textContent = "Modo dia";
    toggleIcon.classList.add("fa-sun");
    toggleButton.classList.remove("btn-dark");
    toggleButton.classList.add("btn-light");
    toggleButton.style.border = '1px solid gray';
  }

  toggleButton.addEventListener("click", () => {
    cambiarModo();
  });
});