export { strongCrear, btnCrear, formularioSession }

const strongCrear = document.querySelector(".nuevaCuenta");
const formularioCrear = document.querySelector(".oculto");
const formularioSession = document.querySelector(".formulario");
const btnCrear = document.querySelector(".crear");

strongCrear.addEventListener("click", () => {
    // ocultar form session
    formularioSession.classList.remove("formulario");
    formularioSession.classList.add("oculto");

    // mostrar form crear
    formularioCrear.classList.remove("oculto");
    formularioCrear.classList.add("crearCuenta");
})

btnCrear.addEventListener("click", (e) => {
    e.preventDefault()

    // ocultar form crear
    formularioCrear.classList.remove("crearCuenta");
    formularioCrear.classList.add("oculto");

    // mostrar form session
    formularioSession.classList.remove("oculto");
    formularioSession.classList.add("formulario")
})