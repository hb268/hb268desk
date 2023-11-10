//Funcionalidad para cambiar datos de usuario, cambio de imagen del perfil. 
function subirImagen() {
    const entradaArchivo = document.getElementById('entradaArchivo');
    const contenedorImagen = document.getElementById('contenedorImagen');
    const archivo = entradaArchivo.files[0];
    const nombreUsuario = localStorage.getItem("nombreLogueado");

    if (archivo) {
        const lector = new FileReader();
        lector.onload = function (evento) {
            const img = document.createElement('img');
            img.src = evento.target.result;
            img.style.width = '200px';
            img.style.height = '200px';
            localStorage.setItem(`imagenUsuario_${nombreUsuario}`, img.src);

            contenedorImagen.innerHTML = '';
            contenedorImagen.appendChild(img);
        };

        lector.readAsDataURL(archivo);
    } else {
        alert('Por favor, selecciona una imagen.');
    }
}

const nombreUsuario = localStorage.getItem("nombreLogueado");
const imagenAlmacenada = localStorage.getItem(`imagenUsuario_${nombreUsuario}`);
const contenedorImagen = document.getElementById('contenedorImagen');

if (imagenAlmacenada) {
    const img = document.createElement('img');
    img.src = imagenAlmacenada;
    img.style.width = '200px';
    img.style.height = '200px';
    contenedorImagen.appendChild(img);
} else {
    const srcImagenPorDefecto = 'img/img_perfil.png';
    const imagenPorDefecto = document.createElement('img');
    imagenPorDefecto.src = srcImagenPorDefecto;
    imagenPorDefecto.style.width = '200px';
    imagenPorDefecto.style.height = '200px';
    contenedorImagen.appendChild(imagenPorDefecto);
    localStorage.setItem(`imagenUsuario_${nombreUsuario}`, srcImagenPorDefecto);
}
//Funcionalidad para la carga de información del usuario logueado en la página y cambios
document.addEventListener("DOMContentLoaded", function () {
    const userDataJSON = localStorage.getItem("userData");

    if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        const email = userData.email;
        const primerApellido = userData.primerApellido;
        const primerNombre = userData.primerNombre;
        const segundoApellido = userData.segundoApellido;
        const segundoNombre = userData.segundoNombre;
        const telefono = userData.telefono;

        if (email) {
            document.getElementById("email").value = email;
            document.getElementById("first-name").value = primerNombre;
            document.getElementById("middle-name").value = segundoNombre;
            document.getElementById("last-name").value = primerApellido;
            document.getElementById("second-last-name").value = segundoApellido;
            document.getElementById("phone-number").value = telefono;
        }
    }
});

function actualizarDatosUsuarioYCarrito(nuevoEmail) {
    const primerNombre = document.getElementById("first-name").value;
    const segundoNombre = document.getElementById("middle-name").value;
    const primerApellido = document.getElementById("last-name").value;
    const segundoApellido = document.getElementById("second-last-name").value;
    const telefono = document.getElementById("phone-number").value;
    let userData = JSON.parse(localStorage.getItem("userData"));

    if (userData.email !== nuevoEmail) {
        const emailAntiguo = userData.email;
        userData.email = nuevoEmail;
        const carrito = JSON.parse(localStorage.getItem("cart"));
        if (carrito) {
            carrito.forEach((producto) => {
                if (producto.nombreCliente === emailAntiguo) {
                    producto.nombreCliente = nuevoEmail;
                }
            });
            localStorage.setItem("cart", JSON.stringify(carrito));
        }
        
        const imagenUsuarioAntiguo = localStorage.getItem("imagenUsuario_" + emailAntiguo);
        localStorage.removeItem("imagenUsuario_" + emailAntiguo);
        localStorage.setItem("imagenUsuario_" + nuevoEmail, imagenUsuarioAntiguo);
    }

    userData.primerNombre = primerNombre;
    userData.segundoNombre = segundoNombre;
    userData.primerApellido = primerApellido;
    userData.segundoApellido = segundoApellido;
    userData.telefono = telefono;

    localStorage.setItem("nombreLogueado", nuevoEmail);
    localStorage.setItem("userData", JSON.stringify(userData));

    const nombreLoginElement = document.getElementById("nombreLogin");
    nombreLoginElement.textContent = nuevoEmail;
}

const botonGuardarCambios = document.getElementById("boton-guardar-cambios");

botonGuardarCambios.addEventListener("click", function () {
    const nuevoEmail = document.getElementById("email").value;
    const primerNombre = document.getElementById("first-name").value;
    const primerApellido = document.getElementById("last-name").value;
    const telefono = document.getElementById("phone-number").value;
    if (primerNombre === "" || primerApellido === "" || telefono === "") {
        if (primerNombre === "") {
            document.getElementById("nombreError").style.display = "block";
        } else {
            document.getElementById("nombreError").style.display = "none";
        }
        if (primerApellido === "") {
            document.getElementById("apellidoError").style.display = "block";
        } else {
            document.getElementById("apellidoError").style.display = "none";
        }
        if (telefono === "") {
            document.getElementById("telefonoError").style.display = "block";
        } else {
            document.getElementById("telefonoError").style.display = "none";
        }
    } else {
        document.getElementById("nombreError").style.display = "none";
        document.getElementById("apellidoError").style.display = "none";
        document.getElementById("telefonoError").style.display = "none";
        actualizarDatosUsuarioYCarrito(nuevoEmail);
        const nombreLoginElement = document.getElementById("nombreLogin");
        nombreLoginElement.textContent = nuevoEmail;
        window.location.href = "index.html";
    }
});