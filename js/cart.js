var userId = 25801;
const apiUrl = `https://japceibal.github.io/emercado-api/user_cart/${userId}.json`;

const tablaProductosBody = document.getElementById("tablaProductosBody");

addEventListener("DOMContentLoaded", () => { 
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const articulosDisponibles = data.articles[0];

 const newRow = document.createElement("tr");
newRow.innerHTML = `
                    <td class= "h-25" style="width: 100px"><img src="${articulosDisponibles.image}" alt="${articulosDisponibles.name}" class="img-thumbnail"></td>
                    <td>${articulosDisponibles.name}</td>
                    <td>${articulosDisponibles.currency} ${articulosDisponibles.unitCost}</td>
                    <td><input type="number" min="1" max="${articulosDisponibles.count}" value="1" id="cantidad_${articulosDisponibles.id}" class="form-control"></td>
                    <td id="total_${articulosDisponibles.id}"><b>${articulosDisponibles.currency} ${articulosDisponibles.unitCost}</b></td>
                       `;
                        tablaProductosBody.appendChild(newRow);
                            })
});
