const productListDiv = document.createElement('div');
productListDiv.id = "productList";

const container = document.querySelector("main");

container.before(productListDiv);
container.remove();

// Función para cargar y mostrar la lista de productos
function loadProducts() {
    const productsUrl = "https://japceibal.github.io/emercado-api/cats_products/101.json";
  
    getJSONData(productsUrl)
      .then(response => {
        if (response.status === "ok") {
          const products = response.data.products;
          const productListDiv = document.getElementById("productList");
  
          let productListHTML = "";
  
          products.forEach(product => {
            productListHTML += `
               <div class="product">
                <div class ="img">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="col">
                    <div class="caract">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                    </div>
                    <div class="ventas">
                        <p>Precio: $${product.cost} ${product.currency}</p>
                        <p>Cantidad Vendida: ${product.soldCount}</p>
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
  
