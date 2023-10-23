var userId = 25801;
const apiUrl = `https://japceibal.github.io/emercado-api/user_cart/${userId}.json`;

const tablaProductosBody = document.getElementById("tablaProductosBody");

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
                <td><input type="number" min="1" max="9999" value="1" id="cantidad_${articulo.id}" class="form-control"></td>
                <td id="total_${articulo.id}"><b>${articulo.currency} ${articulo.unitCost}</b></td>
                <td><button class="btn btn-danger" id="eliminarPrecargado">Eliminar</button></td>
            `;

                tablaProductosBody.appendChild(newRow);

                const eliminarPrecargadoButton = newRow.querySelector('#eliminarPrecargado');
                eliminarPrecargadoButton.addEventListener('click', () => {
                    newRow.style.display = 'none';
                });

                document.getElementById(`cantidad_${articulo.id}`).addEventListener('input', (event) => {
                    const cantidad = event.target.value;
                    const subtotal = articulo.unitCost * cantidad;
                    document.getElementById(`total_${articulo.id}`).innerHTML = `<b>${articulo.currency} ${subtotal}</b>`;
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
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td class="image-container"><img src="${element.images[0]}" alt="" class="img-thumbnail img-fluid"></td>
            <td>${element.name}</td>
            <td>${element.currency} ${element.cost}</td>
            <td><input type="number" min="1" max="100" value="1" id="cantidad_${element.id}" class="form-control"></td>
            <td id="total_${element.id}"><b>${element.currency} ${element.cost}</b></td>
            <td><button class="btn btn-danger" id="eliminar_${element.id}">Eliminar</button></td>
        `;
        tablaProductosBody.appendChild(newRow);

        const cantidadInput = document.getElementById(`cantidad_${element.id}`);
        const eliminarButton = document.getElementById(`eliminar_${element.id}`);

        cantidadInput.addEventListener('input', (event) => {
            const cantidad = event.target.value;
            const subtotal = element.cost * cantidad;
            document.getElementById(`total_${element.id}`).innerHTML = `<b>${element.currency} ${subtotal}</b>`;
        });

        eliminarButton.addEventListener('click', () => {
            carrito.splice(carrito.findIndex(item => item.id === element.id), 1);
            localStorage.setItem('cart', JSON.stringify(carrito));
            window.location.href = 'cart.html';
        });
    });
}

AgregarACarrito();


let Tarjeta_credito = document.getElementById("credito");
let Transfer = document.getElementById("transferencia");
let numerodetarjeta = document.getElementById("numerodetarjeta");
let codseguridad = document.getElementById("codseguridad");
let vencimiento = document.getElementById("vencimiento");
let numcuenta = document.getElementById("numcuenta");
let metodo_seleccionado = document.getElementById("metodo_seleccionado")



Tarjeta_credito.addEventListener("click", ()=>{
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

Transfer.addEventListener("click", ()=>{
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