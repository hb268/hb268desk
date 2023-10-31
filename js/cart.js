var userId = 25801;
const apiUrl = `https://japceibal.github.io/emercado-api/user_cart/${userId}.json`;
const tasaDeCambio = 39;
const tablaProductosBody = document.getElementById("tablaProductosBody");
let precargadoEliminado = false;
document.addEventListener("DOMContentLoaded", () => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;

            articles.forEach(articulo => {
                const newRow = document.createElement("tr");
                newRow.setAttribute("data-id", articulo.id);

                newRow.innerHTML = `
                <td class="image-container"><img src="${articulo.image}" alt="${articulo.name}" class="img-thumbnail"></td>
                <td>${articulo.name}</td>
                <td>${articulo.currency} ${articulo.unitCost}</td>
                <td><input type="number" min="1" max="9999" value="1" id="cantidad_${articulo.id}" class="form-control" onchange="recalcularCostos()"></td>
                <td id="total_${articulo.id}"><p>${articulo.currency} ${articulo.unitCost}</p></td>
                <td><button class="btn btn-danger" id="eliminarPrecargado">Eliminar</button></td>
            `;

                tablaProductosBody.appendChild(newRow);

                const eliminarPrecargadoButton = newRow.querySelector('#eliminarPrecargado');
                eliminarPrecargadoButton.addEventListener('click', () => {
                    newRow.style.display = 'none';
                    const cantidadInput = document.getElementById(`cantidad_${articulo.id}`);
                    const cantidad = parseInt(cantidadInput.value);
                    recalcularCostos(articulo.unitCost * cantidad);
                    precargadoEliminado = true;
                });

                document.getElementById(`cantidad_${articulo.id}`).addEventListener('input', (event) => {
                    const cantidad = event.target.value;
                    const subtotal = articulo.unitCost * cantidad;
                    document.getElementById(`total_${articulo.id}`).innerHTML = `<p>${articulo.currency} ${subtotal}</p>`;
                });
            });
        });
});

addEventListener("DOMContentLoaded", AgregarACarrito)

function AgregarACarrito() {
    const carrito = JSON.parse(localStorage.getItem('cart')) || [];
    const tablaProductosBody = document.getElementById("tablaProductosBody");
    tablaProductosBody.innerHTML = '';
  
    carrito.forEach(element => {
      const nombreLogueado = localStorage.getItem('nombreLogueado');
      if (element.nombreCliente === nombreLogueado) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td class="image-container"><img src="${element.images[0]}" alt="" class="img-thumbnail img-fluid"></td>
            <td>${element.name}</td>
            <td>${element.currency} ${element.cost}</td>
            <td><input type="number" min="1" max="100" value="1" id="cantidad_${element.id}" class="form-control" onchange="recalcularCostos()"></td>
            <td id="total_${element.id}"><p>${element.currency} ${element.cost}</p></td>
            <td><button class="btn btn-danger" id="eliminar_${element.id}">Eliminar</button></td>
        `;
        tablaProductosBody.appendChild(newRow);
  
        const cantidadInput = document.getElementById(`cantidad_${element.id}`);
        const eliminarButton = document.getElementById(`eliminar_${element.id}`);
  
        cantidadInput.addEventListener('input', (event) => {
            const cantidad = event.target.value;
            const subtotal = element.cost * cantidad;
            document.getElementById(`total_${element.id}`).innerHTML = `<p>${element.currency} ${subtotal}</p>`;
        });
  
        eliminarButton.addEventListener('click', () => {
            const cantidadInput = document.getElementById(`cantidad_${element.id}`);
            const cantidad = parseInt(cantidadInput.value);
            const itemIndex = carrito.findIndex(item => item.id === element.id && item.nombreCliente === nombreLogueado);
        
            if (itemIndex !== -1) {
                carrito.splice(itemIndex, 1);
                localStorage.setItem('cart', JSON.stringify(carrito));
            }
        
            const rowToDelete = document.getElementById(`total_${element.id}`).closest('tr');
            rowToDelete.style.display = 'none';
            recalcularCostos();
        });
      }
    });
  }

AgregarACarrito();

document.addEventListener("DOMContentLoaded", () => {
    recalcularCostos();
});

const radioButtons = document.querySelectorAll('input[name="inlineRadioOptions"]');

function recalcularCostos(descuento) {
    const subtotalValue = document.getElementById("importeSubtotal");
    const envioValue = document.getElementById("importeEnvio");
    const totalValue = document.getElementById("importeTotal");
    const carrito = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;
    let moneda = "";
    const nombreLogueado = localStorage.getItem('nombreLogueado'); // Obtener el nombre de usuario logueado del almacenamiento local

    if (descuento > 0) {
        subtotal -= descuento;
    }

    carrito.forEach((element) => {
        if (element.nombreCliente === nombreLogueado) {
            const cantidadInput = document.getElementById(`cantidad_${element.id}`);
            const precioProducto = parseFloat(element.cost);
            const cantidad = parseInt(cantidadInput.value);
            let subtotalProducto = precioProducto * cantidad;

            if (element.currency === "UYU") {
                subtotalProducto = subtotalProducto / tasaDeCambio;
                element.currency = "USD";
            }

            moneda = element.currency;
            subtotal += subtotalProducto;
        }
    });
    if (!precargadoEliminado) {
        const apiUrl = `https://japceibal.github.io/emercado-api/user_cart/${userId}.json`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const articles = data.articles;
                articles.forEach(articulo => {
                    const unitCost = parseFloat(articulo.unitCost);
                    const cantidadInput = document.getElementById(`cantidad_${articulo.id}`);
                    const cantidad = parseInt(cantidadInput.value);
                    const subtotalProducto = unitCost * cantidad;
                    moneda = articulo.currency;
                    subtotal += subtotalProducto;
                });

                let costoEnvio = 0;
                radioButtons.forEach((radio) => {
                    if (radio.checked) {
                        const selectedValue = radio.value;
                        if (selectedValue === "premium") {
                            costoEnvio = subtotal * 0.15;
                        } else if (selectedValue === "express") {
                            costoEnvio = subtotal * 0.07;
                        } else if (selectedValue === "Estándar") {
                            costoEnvio = subtotal * 0.05;
                        }
                    }
                });

                subtotalValue.textContent = moneda + " " + subtotal.toFixed(2);
                envioValue.textContent = moneda + " " + costoEnvio.toFixed(2);
                totalValue.textContent = moneda + " " + (subtotal + costoEnvio).toFixed(2);
            });
    }
    let costoEnvio = 0;
    radioButtons.forEach((radio) => {
        if (radio.checked) {
            const selectedValue = radio.value;
            if (selectedValue === "premium") {
                costoEnvio = subtotal * 0.15;
            } else if (selectedValue === "express") {
                costoEnvio = subtotal * 0.07;
            } else if (selectedValue === "Estándar") {
                costoEnvio = subtotal * 0.05;
            }
        }
    });

    subtotalValue.textContent = moneda + " " + subtotal.toFixed(2);
    envioValue.textContent = moneda + " " + costoEnvio.toFixed(2);
    totalValue.textContent = moneda + " " + (subtotal + costoEnvio).toFixed(2);
}

radioButtons.forEach((radio) => {
    radio.addEventListener('change', recalcularCostos);
});

let Tarjeta_credito = document.getElementById("credito");
let Transfer = document.getElementById("transferencia");
let numerodetarjeta = document.getElementById("numerodetarjeta");
let codseguridad = document.getElementById("codseguridad");
let vencimiento = document.getElementById("vencimiento");
let numcuenta = document.getElementById("numcuenta");
let metodo_seleccionado = document.getElementById("metodo_seleccionado")

Tarjeta_credito.addEventListener("click", () => {
    metodo_seleccionado.innerHTML = "Tarjeta de Crédito"

    numcuenta.disabled = true;
    numcuenta.classList.add("bg-gris");
    numcuenta.value = "";

    numerodetarjeta.required = true;
    numerodetarjeta.disabled = false;
    numerodetarjeta.classList.remove("bg-gris");

    codseguridad.required = true;
    codseguridad.disabled = false;
    codseguridad.classList.remove("bg-gris");

    vencimiento.required = true;
    vencimiento.disabled = false;
    vencimiento.classList.remove("bg-gris");
});

Transfer.addEventListener("click", () => {
    metodo_seleccionado.innerHTML = "Transferencia Bancaria";

    numcuenta.disabled = false;
    numcuenta.classList.remove("bg-gris");

    numerodetarjeta.disabled = true;
    numerodetarjeta.classList.add("bg-gris");
    numerodetarjeta.value = "";

    codseguridad.disabled = true;
    codseguridad.classList.add("bg-gris");
    codseguridad.value = "";

    vencimiento.disabled = true;
    vencimiento.classList.add("bg-gris");
    vencimiento.value = "";

})

const mensajeError = document.getElementById('formapagoError');


function validarFormaDePago() {
    let seleccionado = false;

    [Tarjeta_credito, Transfer].forEach((formaDePago) => {
        if (formaDePago.checked) {
            seleccionado = true;
        }
    });

    if (!seleccionado) {
        mensajeError.style.display = 'block';
        return false;
    }

    if (Tarjeta_credito.checked) {
        if (numerodetarjeta.value.trim() === '' ||
            codseguridad.value.trim() === '' ||
            vencimiento.value.trim() === '') {
            mensajeError.style.display = 'block';
            numerodetarjeta.classList.add('is-invalid');
            codseguridad.classList.add('is-invalid');
            vencimiento.classList.add('is-invalid');
            return false;
        }
    } else if (Transfer.checked) {
        if (numcuenta.value.trim() === '') {
            mensajeError.style.display = 'block';
            numcuenta.classList.add('is-invalid');
            return false;
        }
    }

    mensajeError.style.display = 'none';
    numerodetarjeta.classList.remove('is-invalid');
    codseguridad.classList.remove('is-invalid');
    vencimiento.classList.remove('is-invalid');
    numcuenta.classList.remove('is-invalid');
    return true;
}

btnCompra.addEventListener('click', function (event) {
    event.preventDefault();

    const campos = [calle, numero, esquina];
    let camposValidos = true;

    for (const campo of campos) {
        if (campo.value.trim() === '') {
            campo.classList.add('is-invalid');
            camposValidos = false;
        } else {
            campo.classList.remove('is-invalid');
            campo.classList.add('is-valid');
        }
    }

    var tipoEnvio = document.querySelector('input[name="inlineRadioOptions"]:checked');

    if (!tipoEnvio) {
        document.getElementById("envioError").style.display = "block";
        return false;
    } else {
        document.getElementById("envioError").style.display = "none";
    }

    const cantidades = document.querySelectorAll('input[id^="cantidad_"]');
    let cantidadesValidas = true;

    cantidades.forEach(cantidadInput => {
        const cantidad = parseInt(cantidadInput.value);
        if (isNaN(cantidad) || cantidad <= 0) {
            cantidadesValidas = false;
            cantidadInput.classList.add('is-invalid');
        } else {
            cantidadInput.classList.remove('is-invalid');
            cantidadInput.classList.add('is-valid');
        }
    });


    if (!validarFormaDePago()) {
        return false;
    }

    if (!camposValidos || !cantidadesValidas) {
        return false;
    }

    document.getElementById('alertaCompraExitosa').style.display = 'block';
    setTimeout(function () {
        document.getElementById('alertaCompraExitosa').style.display = 'none';
        localStorage.removeItem('cart');
        window.location.href = 'cart.html';
    }, 2000);

    for (const campo of campos) {
        campo.value = '';
        campo.classList.remove('is-valid');
    }

    const radios = document.querySelectorAll('input[name="inlineRadioOptions"]');
    radios.forEach(radio => {
        radio.checked = false;
    });


    cantidades.forEach(cantidadInput => {
        cantidadInput.value = '1';
        cantidadInput.classList.remove('is-valid');
    });

});