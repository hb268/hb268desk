var userId = 25801;
const apiUrl = `https://japceibal.github.io/emercado-api/user_cart/${userId}.json`;

const tablaProductosBody = document.getElementById("tablaProductosBody");
const newRow = document.createElement("tr")

addEventListener("DOMContentLoaded", () => { 
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const articulosDisponibles = data.articles[0];

;
newRow.innerHTML += `
                    <td class="col-lg-2"><img src="${articulosDisponibles.image}" alt="${articulosDisponibles.name}" class="img-thumbnail"></td>
                    <td>${articulosDisponibles.name}</td>
                    <td>${articulosDisponibles.currency} ${articulosDisponibles.unitCost}</td>
                    <td><input type="number" min="1" max="${articulosDisponibles.count}" value="1" id="cantidad_${articulosDisponibles.id}" class="form-control"></td>
                    <td id="total_${articulosDisponibles.id}"><b>${articulosDisponibles.currency} ${articulosDisponibles.unitCost}</b></td>
                       `;
                        tablaProductosBody.appendChild(newRow);
                            })
});

addEventListener("DOMContentLoaded", AgregarACarrito)

function AgregarACarrito() {
    const carrito = JSON.parse(localStorage.getItem('cart')) || [];
    const tablaProductosBody = document.getElementById("tablaProductosBody");
    tablaProductosBody.innerHTML = '';

    carrito.forEach(element => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td class="col-lg-2"><img src="${element.images[0]}" alt="" class="img-thumbnail img-fluid"></td>
            <td>${element.name}</td>
            <td>${element.currency} ${element.cost}</td>
            <td><input type="number" min="1" max="100" value="1" id="cantidad_${element.id}" class="form-control"></td>
            <td id="total_${element.id}"><b>${element.currency} ${element.cost}</b></td>
        `;
        tablaProductosBody.appendChild(newRow);
    });
}
AgregarACarrito();

