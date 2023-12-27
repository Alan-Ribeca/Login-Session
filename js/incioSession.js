import { usuario, usuarios, email, validarEmail } from "./crearCuenta.js";
import { formularioSession, strongCrear } from "./ocultarYmostrar.js";
export { usuario, usuarios, mensajeSession, iniciarSession };

const loginUsuario = document.querySelector("#usuarioSesion");
const loginPassword = document.querySelector("#passwordSesion");
const btnIniciar = document.querySelector(".iniciar");
const paginaPrincipal = document.querySelector(".ocultoPagina");
const formulario = document.querySelector(".formulario");
const olvido = document.querySelector(".olvido");
const h2 = document.querySelector(".iniciarSesion");
const p = document.querySelector(".cuenta");
let usuariosLocal = JSON.parse(localStorage.getItem("usuarios"));

btnIniciar.addEventListener("click", (e) => {
    e.preventDefault()
    let usuario = loginUsuario.value;
    let password = loginPassword.value;

    if (usuariosLocal === null) {
       mensajeSession("Usuario no registrado");
        return;
    }

    let usuarioEncontrado = usuariosLocal.find(u => u.usuario === usuario);
    let passwordCorrecta = usuariosLocal.find(u => u.password === password);

    if (usuarioEncontrado && passwordCorrecta) {
        iniciarSession();
    } else if (usuarioEncontrado && !passwordCorrecta) {
        mensajeSession("Nombre de usuario o contraseña incorrecta");
    } else if (!usuarioEncontrado && passwordCorrecta) {
        mensajeSession("Nombre de usuario o contraseña incorrecta");
    } else {
        mensajeSession("Nombre de usuario o contraseña incorrecta");
    }
})



olvido.addEventListener("click", () => {
    h2.innerHTML = "Recuperar cuenta";
    btnIniciar.innerHTML = "Enviar";

    loginUsuario.style.display = "none";
    loginPassword.style.display = "none";
    olvido.style.visibility = "hidden";
    p.style.display = "none";

    let email = document.createElement('input');
    email.type = 'email';
    email.name = 'email';
    email.placeholder = 'Email';
    email.className = 'inputEmail';
    email.addEventListener("input", validarEmail)
    formulario.insertBefore(email, document.querySelector('.olvido'));

    btnIniciar.addEventListener("click", (e) => {
        e.preventDefault();

        if (localStorage.getItem('usuarios') === null) {
            mensajeSession("Usuario no registrado")
            p.style.display = "block"
            return;
        }
    
        let usuarioEncontrado = usuariosLocal.find(u => u.email === email.value);

        if (usuarioEncontrado) {
            mensajeSession("Recibiste instrucciones por email.")
        } else {
            mensajeSession("Email no registrado");
        }
    })
})


function mensajeSession(mensaje) {
    const mensajeExistente = document.querySelector(".aviso");
    if (mensajeExistente) {
        mensajeExistente.remove()
    }

    const textoAviso = document.createElement("P");
    textoAviso.classList.add("aviso")
    textoAviso.textContent = mensaje;

    formulario.insertBefore(textoAviso, btnIniciar)
}

function iniciarSession() {
    // ocultar inicio de sesion
    formularioSession.classList.remove("formulario");
    formularioSession.classList.add("oculto");

    // mostrar pag principal
    paginaPrincipal.classList.remove("ocultoPagina");
    paginaPrincipal.classList.add("pagVisible");

    const urlImagen = "https://alan-ribeca.github.io/Login-Session/img/imgPagPrincipal.jpg";
    document.body.style.backgroundImage = "url('" + urlImagen + "')";
}