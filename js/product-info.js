document.addEventListener("DOMContentLoaded", function () {
    const idProducto = localStorage.getItem("productoSeleccionado")
    if (idProducto) {
        const urlProductsInfo = `https://japceibal.github.io/emercado-api/products/${idProducto}.json`
        getJSONData(urlProductsInfo)
            .then(response => {
                if (response.status === "ok") {
                    const product = response.data;
                    const containerProducto = document.getElementById("products-info")
                    containerProducto.innerHTML = ""
                    const divProducto = document.createElement("div")
                    divProducto.innerHTML = `
                    <div class="row">
                        <div class="col-12">
                            <h4 class="mb-5 mt-4">${product.name}</h4>
                            <hr>
                            <div class="row">
                                <p><strong>Precio:</strong><br>${product.currency} ${product.cost}</p>
                                <p><strong>Descripción:</strong><br>${product.description}</p>
                                <p><strong>Categoria:</strong><br>${product.category}</p>
                                <p><strong>Cantidad vendida:</strong><br>${product.soldCount}</p>
                            </div>
                            <div class="col-3">
                                <div class="productos-imagenes d-flex">
                                </div>
                            </div>
                        </div>
                    </div>
          `;
                    const contenedorImagenes = divProducto.querySelector(".productos-imagenes")
                    for(const srcImagen of product.images){
                        const elementoImagen = document.createElement("img")
                        elementoImagen.src = srcImagen
                        elementoImagen.alt = product.name
                        elementoImagen.classList.add("img-thumbnail")
                        contenedorImagenes.appendChild(elementoImagen)
                    }
                    containerProducto.appendChild(divProducto);
                } else {
                    console.error("Error al cargar los productos:", response.data);
                }
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
            });
    }
})