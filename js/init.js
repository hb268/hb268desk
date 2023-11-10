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

//Al cargar la página se verifica si el usuario está logueado y almacenado en la localstorage
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
//Función para cerrar sesión y borrar los datos de la localStorage
function logout() {
  localStorage.removeItem("logueado");
  localStorage.removeItem("nombreLogueado");
  localStorage.removeItem("userData");
  window.location.href = "login.html";
}

DirigirALogin()
function DirigirALogin(){
  var estaLogueado = localStorage.getItem('logueado');
  if (estaLogueado != "true") {
      window.location.href = 'login.html';
  }
}
//se cargan los datos del usuario al cargar la página, desde la localStorage
document.addEventListener("DOMContentLoaded", function(){
  const userDataJSON = localStorage.getItem("userData");

  if (userDataJSON) {
    const userData = JSON.parse(userDataJSON);
    const email = userData.email;

    if (email) {
      document.getElementById("nombreLogin").innerHTML = email;
    }
  }
});

document.getElementById("cerrarSesionDesplegable").addEventListener("click", () => {
  logout();
});
//función para cambiar el aspecto modo día-noche, verificando qué está guardado en la localStorage
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
//funcionalidad del carrito, qué elementos están en el carrito de compras. Estilos con bootstrap
let cartbtn = document.createElement("button");
let cartbtntext = document.createTextNode(" Comprar ");
cartbtn.appendChild(cartbtntext);
cartbtn.classList.add("btn");
cartbtn.classList.add("btn-success");

let btndiv = document.createElement("div");
btndiv.classList.add("col-12");
btndiv.classList.add("text-center");
btndiv.classList.add("btn-hover");

const carthtml = "cart.html";
let productcart = JSON.parse(localStorage.getItem('cart')) || [];

function mostrarMensajeEnAlerta(mensaje, tipo, duracion) {
  const alertDiv = document.getElementById('alertMessage');
  alertDiv.textContent = mensaje;
  alertDiv.classList.remove('alert-primary', 'alert-success', 'alert-info', 'alert-warning', 'alert-danger');
  alertDiv.classList.add(`alert-${tipo}`);
  alertDiv.style.display = 'block';
  setTimeout(() => {
    alertDiv.style.display = 'none';
  }, duracion);
}

cartbtn.addEventListener("click", () => {
  const productcart = JSON.parse(localStorage.getItem('cart')) || [];
  const nombreLogueado = localStorage.getItem('nombreLogueado');

  if (isProductInCart(product, nombreLogueado)) {
    mostrarMensajeEnAlerta("Este producto ya está en el carrito.", "warning", 2000);
  } else {
    product.nombreCliente = nombreLogueado;

    productcart.push(product);
    localStorage.setItem('cart', JSON.stringify(productcart));
    mostrarMensajeEnAlerta("Agregando al Carrito", "success", 2000);
    console.log(productcart);
    setTimeout(() => {
      window.location.href = carthtml;
    }, 2000);
  }
});

function isProductInCart(product, nombreLogueado) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productId = product.id;
  for (const item of cart) {
    if (item.nombreCliente === nombreLogueado && item.id === productId) {
      return true;
    }
  }

  return false;
}