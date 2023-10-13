var userId = 25801;
const apiUrl = `https://japceibal.github.io/emercado-api/user_cart/${userId}.json`;

const tablaProductosBody = document.getElementById("tablaProductosBody");
addEventListener("DOMContentLoaded", () => {

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
        `;
        tablaProductosBody.appendChild(newRow);
        document.getElementById(`cantidad_${element.id}`).addEventListener('input', (event) => {
            const cantidad = event.target.value;
            const subtotal = element.cost * cantidad;
            document.getElementById(`total_${element.id}`).innerHTML = `<b>${element.currency} ${subtotal}</b>`;
        });
    })
};
AgregarACarrito();