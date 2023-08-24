const productListDiv = document.createElement('div');
productListDiv.id = "productList";

productos.appendChild(productListDiv);

// Función para cargar y mostrar la lista de productos
function loadProducts() {
    const DivID =  localStorage.getItem("catID");
    const productsUrl = `https://japceibal.github.io/emercado-api/cats_products/${DivID}.json`;
    
  
    getJSONData(productsUrl)
      .then(response => {
        if (response.status === "ok") {
          const products = response.data.products;
          const productListDiv = document.getElementById("productList");
  
          let productListHTML = "";
  
          products.forEach(product => {
            productListHTML += `
            <div class="product list-group-item list-group-item-action cursor-active">
            <div class="row">
              <div class="col-3">
                <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
              </div>
              <div class="col">
                <div class="d-flex w-100 justify-content-between">
                  <h4 class="mb-1">${product.name}</h4>
                  <small class="text-muted">Cantidad Vendida: ${product.soldCount}</small>
                </div>
                <p class="mb-1">${product.description}</p>
                <p class="mb-1">Precio: $${product.cost} ${product.currency}</p>
              </div>
            </div>
          </div>
            `;
          });
  
          productListDiv.innerHTML = productListHTML;
        } else {
          console.error("Error al cargar los productos:", response.data);
        }
      })
      .catch(error => {
        console.error("Error en la solicitud:", error);
      });
  }
  
  // Llamada a la función para cargar los productos al cargar la página
  document.addEventListener("DOMContentLoaded", loadProducts);
  
