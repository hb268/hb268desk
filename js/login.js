const switchLoginRegistro = document.getElementById("switchLoginRegistro");
const accesoForm = document.querySelector(".acceso");
const registroForm = document.querySelector(".registro");
const labelSwitch = document.querySelector(".form-check-label");

switchLoginRegistro.addEventListener("change", () => {
    if (switchLoginRegistro.checked) {
        labelSwitch.innerHTML = "¿Ya tienes una cuenta?<br>Pulsa para ir al menú de ingreso.";
    } else {
        labelSwitch.innerHTML = "¿No tienes una cuenta?<br>Pulsa para ir al menú de registro.";
    }

    accesoForm.classList.toggle("acceso");
    accesoForm.classList.toggle("registro");
    registroForm.classList.toggle("registro");
    registroForm.classList.toggle("acceso");

    document.getElementById("usernameLogin").value = "";
    document.getElementById("contraseñaLogin").value = "";
    document.getElementById("usernameRegistro").value = "";
    document.getElementById("contraseñaRegistro").value = "";
    document.getElementById("contraseñaRegistro2").value = "";
    document.getElementById("emailRegistro").value = "";
    document.getElementById("nacimientoRegistro").value = "";
    document.getElementById("msgErrorRegistro").innerHTML = "Ingrese sus datos.";
    document.getElementById("msgErrorLogin").innerHTML = "Ingrese sus datos.";
});

const btnRegistro = document.getElementById("btnRegistro");

btnRegistro.addEventListener("click", () => {
    const username = document.getElementById("usernameRegistro").value;
    const password = document.getElementById("contraseñaRegistro").value;
    const password2 = document.getElementById("contraseñaRegistro2").value;
    const email = document.getElementById("emailRegistro").value;
    const birthdate = document.getElementById("nacimientoRegistro").value;

    if (username === "" || password === "" || password2 === "" || email === "" || birthdate === "") {
        document.getElementById("msgErrorRegistro").innerHTML = "Por favor, complete todos los campos.";
        return;
    }
    if (password === password2) {
        if (password.length >= 8) {
            alert("Registro correcto.");
            accesoForm.classList.remove("registro");
            accesoForm.classList.add("acceso");
            registroForm.classList.remove("acceso");
            registroForm.classList.add("registro");

            document.getElementById("usernameRegistro").value = "";
            document.getElementById("contraseñaRegistro").value = "";
            document.getElementById("contraseñaRegistro2").value = "";
            document.getElementById("emailRegistro").value = "";
            document.getElementById("nacimientoRegistro").value = "";
            document.getElementById("msgErrorRegistro").innerHTML = "Ingrese sus datos.";
            document.getElementById("msgErrorLogin").innerHTML = "Ingrese sus datos.";
        } else {
            document.querySelector("#msgErrorRegistro").innerHTML = "La contraseña debe tener al menos 8 caracteres.";
        }
    } else {
        document.querySelector("#msgErrorRegistro").innerHTML = "Las contraseñas no coinciden.";
    }
});

const btnAcceder = document.getElementById("btnAcceder");

btnAcceder.addEventListener("click", () => {
    const username = document.getElementById("usernameLogin").value;
    const password = document.getElementById("contraseñaLogin").value;
    const msgErrorLogin = document.querySelector("#msgErrorLogin");

    msgErrorLogin.innerHTML = "";

    if (username === "" || password === "") {
        msgErrorLogin.innerHTML = "Por favor, completa ambos campos.";
    } else if (password.length < 8) {
        msgErrorLogin.innerHTML = "La contraseña debe tener al menos 8 caracteres.";
    } else {
        alert("Acceso correcto.");
        window.location.href = "index.html";
        document.getElementById("usernameLogin").value = "";
        document.getElementById("contraseñaLogin").value = "";
        localStorage.setItem("logueado", "true");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var estaLogueado = localStorage.getItem('logueado');
    if (estaLogueado === 'true') {
        window.location.href = 'index.html';
    }
});