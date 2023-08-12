
 const productListDiv = document.createElement('div');
productListDiv.id = "productList";

 document.body.appendChild(productListDiv);

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
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Precio: $${product.cost} ${product.currency}</p>
                <p>Cantidad Vendida: ${product.soldCount}</p>
                <p>${product.description}</p>
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
  
