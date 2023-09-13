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

const Comment_div = document.createElement('div');
const main_comment = document.querySelector("main");
main_comment.appendChild(Comment_div);


function loadComment(){
    const idProducto = localStorage.getItem("productoSeleccionado")
    let URL_comments =  `https://japceibal.github.io/emercado-api/products_comments/${idProducto}.json`;
    
    getJSONData(URL_comments)
        .then(response => {
            if(response.status === "ok"){
                const comment = response.data;

                let CommentList =`
                <br><br><br><br>
                <div class="container border">  
                <table id="comentarios" class="table table-hover table-striped">
                <thead>
                <tr class="container">
                <tr>
                <th class=" text-left">Comentarios</th>
                </tr>
                </thead>
                <thead>
                <tr class="container">
                <th class="col-1 text-left"></th>
                <th class="col-2 text-left">Usuario</th>
                <th class="col-3 text-left">Descripción</th>
                <th class="col-3 text-center">Puntuación</th>
                <th class="col-3 text-left">Fecha</th>
                </tr>
                </thead>
                <tbody id="comentarios">
                `;

                comment.forEach( com => {
                    CommentList += `
                <tr class="container">
                <td class="col-1"><img src="img/User_icon.webp" class="img-rounded" style="width:15%" ></td>
                <td class="col-2" >${com.user}</td>
                <td class="col-3" >${com.description}</td>
                <td class="col-3 text-center">
                `
                    + `<span id="star"class="fa fa-star checked"></span>`.repeat(com.score) +
                    `<span id="star"class="fa fa-star "></span>`.repeat(5-com.score) +
                `
                </td>
                <td class="col-3 small text-muted" >${com.dateTime}</td>
                </tr>
                    `;
                    
                });
                Comment_div.innerHTML = CommentList + 
                `</tbody>
                <table>
                </div>
                <br><br><br>
                <div class="container primary">
                <form method="post">
                    <h3>Cuéntanos sobre el producto:</h3><br><br>
                    <div>
                    <label for="opinion" class="form-label">Su opinión:</label><br>
                    <textarea name="opinion" id="opinion" cols="30" rows="10" placeholder="Escriba aquí." class="form-control"></textarea>
                    </div>
                    <br>
                    <div>
                    <label for="score" class="form-label">Su puntuación:</label>
                    <select id="score" class="form-select">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5" selected>5</option>
                    </select>
                    </div><br>
                    <input type="submit" value="Enviar" id= "btnComment" class="form-control"><br>
                    
                </form>
                </div>
                
                `;
                //DESAFIATE
                
                function obtenerFechaYHora() {
                    var fechaHora = new Date();
                    return fechaHora.toLocaleString(); 
                  }
                  let fechaHora= obtenerFechaYHora();
                
                
                
                function addNewComment() {
                    let comentario = document.getElementById("opinion").value;
                    let score = document.getElementById("score").value;
                    let nombreU = localStorage.getItem("nombreLogueado");
                    let arrayComentarios = {dato: nombreU, dato2: comentario, dato3: score, dato4: fechaHora};
                    let datosJSON = JSON.stringify(arrayComentarios);

                    
                        if (comentario.trim() !== "") {
                            
                           localStorage.setItem("opinion", datosJSON);
                           localStorage.getItem("opinion");
                           
                        
                        let nuevoComentario = `
                        <tr class="container">
                        <td class="col-1"><img src="img/User_icon.webp" class="img-rounded" style="width:15%" ></td>
                        <td class="col-2">${nombreU}</td>
                        <td class="col-3">${comentario}</td>
                        <td class="col-3 text-center">
                        `
                            + `<span id="star"class="fa fa-star checked"></span>`.repeat(score) +
                            `<span id="star"class="fa fa-star "></span>`.repeat(5-score) +
                        `
                        </td>
                        <td class="col-3 small text-muted">${fechaHora}</td>
                        </tr>
                        `;
                
                let contenedorDeComentarios = document.getElementById("comentarios"); 
                contenedorDeComentarios.innerHTML += nuevoComentario;

                
                document.getElementById("opinion").value = "";
                    }
                }
                
                    
                    const botonComentario =  document.getElementById("btnComment");
                    botonComentario.addEventListener("click", addNewComment);
            } else {
                console.error("Error", response.data)
            }
          
        })
}


document.addEventListener("DOMContentLoaded", loadComment);

