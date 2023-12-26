export { usuario, email, password, passwordDos, form, btnCrear, usuarios }

const obj = {
    usuario: "",
    email: "",
    password: "",
    passwordDos: "",
}

const usuario = document.querySelector("#usuario");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordDos = document.querySelector("#passwordDos");
const form = document.querySelector(".oculto");
const btnCrear = document.querySelector(".crear");
let usuarios = [];

usuario.addEventListener("input", validarUsuario);
email.addEventListener("input", validarEmail);
password.addEventListener("input", validarPassword);
passwordDos.addEventListener("input", validarPassword);
btnCrear.addEventListener('click', function () {
    const id = Date.now().toString();
    obj.id = id;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(obj);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    form.reset();

    location.reload();
});

function mensajeError(mensaje, input) {
    const alerta = input.nextElementSibling;
    if (alerta && alerta.classList.contains("error")) {
        alerta.remove();
    }

    const p = document.createElement("P");
    p.textContent = mensaje;
    p.classList.add("error");

    input.insertAdjacentElement('afterend', p);
}

function limpiarAlerta(input) {
    const alerta = input.nextElementSibling;
    if (alerta && alerta.classList.contains("error")) {
        alerta.remove();
    }
}

function validarUsuario(e) {
    if (e.target.value.trim() === "") {
        mensajeError(`El usuario: ${e.target.id} ya existe `, e.target);
    } else {
        obj[e.target.name] = e.target.value.trim().toLowerCase();
        limpiarAlerta(e.target);
    }
}

function validarEmail(e) {
    if (e.target.value.trim() === "") {
        mensajeError(`el ${e.target.id} no es correcto`, e.target);
    } else {
        if (!validarEmailCorrecto(e.target.value)) {
            mensajeError(`El formato del email no es valido`, e.target);
        } else {
            obj[e.target.name] = e.target.value.trim().toLowerCase();
            limpiarAlerta(e.target);
        }
    }
}

function validarEmailCorrecto(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return regex.test(email);
}

function validarPassword(e) {
    if (!password.value || !passwordDos.value || password.value !== passwordDos.value) {
        mensajeError("Las contraseñas no son iguales", e.target);
    } else {
        obj['password'] = password.value.trim().toLowerCase();
        obj['passwordDos'] = passwordDos.value.trim().toLowerCase();
        limpiarAlerta(password);
        limpiarAlerta(passwordDos);
        habilitarBtn(obj)
    }
}

function habilitarBtn(obj) {
    const objEstaCompleto = !Object.values(obj).includes("");

    if (objEstaCompleto) {
        btnCrear.disabled = false;
        btnCrear.style.opacity = 1;
    }

    console.log(obj)
}