import { usuario, usuarios } from "./crearCuenta.js";
import { formularioSession } from "./ocultarYmostrar.js";
export { usuario, usuarios, mensajeSession, iniciarSession };


const loginUsuario = document.querySelector("#usuarioSesion");
const loginPassword = document.querySelector("#passwordSesion");
const btnIniciar = document.querySelector(".iniciar");
const paginaPrincipal = document.querySelector(".ocultoPagina");
let usuariosLocal = JSON.parse(localStorage.getItem("usuarios"))

btnIniciar.addEventListener("click", (e) => {
    e.preventDefault()
    let usuario = loginUsuario.value;
    let password = loginPassword.value;

    let usuarioEncontrado = usuariosLocal.find(u => u.usuario === usuario);
    let passwordCorrecta = usuariosLocal.find(u => u.password === password);

    if (usuarioEncontrado && passwordCorrecta) {
        //ACA SE MUESTRA LA PAG 
        // console.log("Ambos coinciden")
        iniciarSession();
    } else if (usuarioEncontrado && !passwordCorrecta) {
        console.log("El usuario coincide, pero la contraseña no")
        mensajeSession(`Nombre de usuario o contraseña incorrecta`);
    } else if (!usuarioEncontrado && passwordCorrecta) {
        console.log("La contraseña coincide, pero el usuario no")
        mensajeSession(`Nombre de usuario o contraseña incorrecta`);
    } else {
        console.log("Ni el usuario ni la contraseña coinciden")
        mensajeSession(`Nombre de usuario o contraseña incorrecta`);
    }
})

function mensajeSession(mensaje) {
    const mensajeExistente = document.querySelector(".aviso");
    if (mensajeExistente) {
        mensajeExistente.remove()
    }

    const textoAviso = document.createElement("P");
    textoAviso.classList.add("aviso")
    textoAviso.textContent = mensaje;

    const formulario = document.querySelector(".formulario");

    formulario.insertBefore(textoAviso, btnIniciar)
}

function iniciarSession() {
    // ocultar inicio de sesion
    formularioSession.classList.remove("formulario");
    formularioSession.classList.add("oculto");

    // mostrar pag principal
    paginaPrincipal.classList.remove("ocultoPagina");
    paginaPrincipal.classList.add("pagVisible");

    document.body.style.backgroundImage = "url('../img/imgPagPrincipal.jpg')";
}