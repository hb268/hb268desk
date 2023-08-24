const productListDiv = document.createElement('div');
productListDiv.id = "productList";

productos.appendChild(productListDiv);
let productsData = []; 

function loadProducts() {
    const DivID =  localStorage.getItem("catID");
    const productsUrl = `https://japceibal.github.io/emercado-api/cats_products/${DivID}.json`;
    
  
    getJSONData(productsUrl)
      .then(response => {
        if (response.status === "ok") {
          const products = response.data.products;
          productsData=products;
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
  
  function filtrarPorPrecio() {
    const precioMinimo = parseFloat(document.getElementById("rangeFilterCountMin").value);
    const precioMaximo = parseFloat(document.getElementById("rangeFilterCountMax").value);

    const productosFiltrados = productsData.filter(product => {
      const precioProducto = parseFloat(product.cost);
      return !isNaN(precioProducto) && precioProducto >= precioMinimo && precioProducto <= precioMaximo;
    });

    const productListDiv = document.getElementById("productList");

    let productListHTML = "";

    productosFiltrados.forEach(product => {
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
  }

  document.addEventListener("DOMContentLoaded", loadProducts);

  const btnFiltro = document.getElementById("rangeFilterCount");
  btnFiltro.addEventListener("click", filtrarPorPrecio);

  const btnLimpiar = document.getElementById("clearRangeFilter");
  btnLimpiar.addEventListener("click", () => {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";
        loadProducts();
  });