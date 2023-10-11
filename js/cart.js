var userId = 25801;
const apiUrl = `https://japceibal.github.io/emercado-api/user_cart/${userId}.json`;

const tablaProductosBody = document.getElementById("tablaProductosBody").addEventListener("DOMContentLoaded", () => { 

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
    const articles = data.articles;


    articles.forEach(articulo => {
        const newRow = document.createElement("tr");
        newRow.setAttribute("data-id", articulo.id);

        newRow.innerHTML = `
        <td class="h-25" style="width: 100px"><img src="${articulo.image}" alt="${articulo.name}" class="img-thumbnail"></td>
        <td>${articulo.name}</td>
        <td>${articulo.currency} ${articulo.unitCost}</td>
        <td><input type="number" min="1" max="9999" value="1" id="cantidad_${articulo.id}" class="form-control"></td>
        <td id="total_${articulo.id}"><b>${articulo.currency} ${articulo.unitCost}</b></td>
        `;

        tablaProductosBody.appendChild(newRow);

        
        document.getElementById(`cantidad_${articulo.id}`).addEventListener('input', (event) => {
        const cantidad = event.target.value;
          const subtotal = articulo.unitCost * cantidad;
        document.getElementById(`total_${articulo.id}`).innerHTML = `<b>${articulo.currency} ${subtotal}</b>`;
        });
    });
});
});


addEventListener("DOMContentLoaded", AgregarACarrito);

        const newRow2 = document.createElement("tr");
        newRow2.innerHTML = `
            <td class= "h-25" style="width: 100px"><img src="${articulosDisponibles.image}" alt="${articulosDisponibles.name}" class="img-thumbnail"></td>
            <td>${articulosDisponibles.name}</td>
            <td>${articulosDisponibles.currency} ${articulosDisponibles.unitCost}</td>
            <td><input type="number" min="1" max="${articulosDisponibles.count}" value="1" id="cantidad_${articulosDisponibles.id}" class="form-control"></td>
            <td id="total_${articulosDisponibles.id}"><b>${articulosDisponibles.currency} ${articulosDisponibles.unitCost}</b></td>
        `;
        tablaProductosBody.appendChild(newRow);

        document.getElementById(`cantidad_${articulosDisponibles.id}`).addEventListener('input', (event) => {
            const cantidad = event.target.value;
            const subtotal = articulosDisponibles.unitCost * cantidad;
            document.getElementById(`total_${articulosDisponibles.id}`).innerHTML = `<b>${articulosDisponibles.currency} ${subtotal}</b>`;
        });





addEventListener("DOMContentLoaded", AgregarACarrito)


function AgregarACarrito() {
    const carrito = JSON.parse(localStorage.getItem('cart')) || [];
    const tablaProductosBody = document.getElementById("tablaProductosBody");
    tablaProductosBody.innerHTML = '';

    carrito.forEach(element => {

        Row.innerHTML += `
    <td class= "h-25" style="width: 100px"><img src="${element.images[0]}" alt="" class="img-thumbnail"></td>
    <td>${element.name}</td>
    <td>${element.currency} ${element.cost}</td>
    <td><input type="number" min="1" max="$100" value="1" id="cantidad_${element.id}" class="form-control"></td>
    <td id="total_${element.id}"><b>${element.currency} ${element.cost}</b></td>
    `;
    tablaProductosBody.appendChild(Row)
    })
};

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td class="col-lg-2"><img src="${element.images[0]}" alt="" class="img-thumbnail img-fluid"></td>
            <td>${element.name}</td>
            <td>${element.currency} ${element.cost}</td>
            <td><input type="number" min="1" max="100" value="1" id="cantidad_${element.id}" class="form-control"></td>
            <td id="total_${element.id}"><b>${element.currency} ${element.cost}</b></td>
        `;
        tablaProductosBody.appendChild(newRow);

AgregarACarrito();


