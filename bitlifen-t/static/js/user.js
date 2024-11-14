function actualizarActividades() {
    const ritmoCardiaco = parseInt(document.getElementById("ritmoCardiaco").value);
    const oxigenoSangre = parseInt(document.getElementById("oxigenoSangre").value);

    const ejercicioIntenso = document.getElementById("ejercicioIntenso");
    const caminarAireLibre = document.getElementById("caminarAireLibre");
    const trabajoEstresante = document.getElementById("trabajoEstresante");
    const descansar = document.getElementById("descansar");

    if (ritmoCardiaco > 100 || oxigenoSangre < 90) {
        ejercicioIntenso.innerHTML = `<i class="bi bi-x-circle text-danger-dark"></i> No Recomendado`;
        caminarAireLibre.innerHTML = `<i class="bi bi-dash-circle text-warning-dark"></i> Con Precaución`;
        trabajoEstresante.innerHTML = `<i class="bi bi-x-circle text-danger-dark"></i> No Recomendado`;
        descansar.innerHTML = `<i class="bi bi-check-circle text-success-dark"></i> Altamente Recomendado`;
    } else if (ritmoCardiaco >= 60 && ritmoCardiaco <= 100 && oxigenoSangre >= 95) {
        ejercicioIntenso.innerHTML = `<i class="bi bi-check-circle text-success-dark"></i> Recomendado`;
        caminarAireLibre.innerHTML = `<i class="bi bi-check-circle text-success-dark"></i> Recomendado`;
        trabajoEstresante.innerHTML = `<i class="bi bi-dash-circle text-warning-dark"></i> Con Precaución`;
        descansar.innerHTML = `<i class="bi bi-check-circle text-success-dark"></i> Recomendado`;
    } else {
        ejercicioIntenso.innerHTML = `<i class="bi bi-dash-circle text-warning-dark"></i> Requiere Evaluación`;
        caminarAireLibre.innerHTML = `<i class="bi bi-check-circle text-success-dark"></i> Recomendado`;
        trabajoEstresante.innerHTML = `<i class="bi bi-dash-circle text-warning-dark"></i> Requiere Evaluación`;
        descansar.innerHTML = `<i class="bi bi-check-circle text-success-dark"></i> Recomendado`;
    }
}

function agregarActividad(event) {
    event.preventDefault(); // Prevenir la recarga de la página

    const nuevaActividad = document.getElementById("nuevaActividad").value;
    const nuevoRitmo = parseInt(document.getElementById("nuevoRitmo").value);
    const nuevoOxigeno = parseInt(document.getElementById("nuevoOxigeno").value);

    const tablaActividades = document.getElementById("tablaActividades");
    let clasificacion, icono;

    if (nuevoRitmo > 100 || nuevoOxigeno < 90) {
        clasificacion = "No Recomendado";
        icono = `<i class="bi bi-x-circle text-danger"></i>`;
    } else if (nuevoRitmo >= 60 && nuevoOxigeno >= 95) {
        clasificacion = "Recomendado";
        icono = `<i class="bi bi-check-circle text-success"></i>`;
    } else {
        clasificacion = "Con Precaución";
        icono = `<i class="bi bi-exclamation-circle text-warning"></i>`;
    }

    const nuevaFila = `
        <tr>
            <td>${nuevaActividad}</td>
            <td>${nuevoRitmo}</td>
            <td>${nuevoOxigeno}</td>
            <td>${icono} ${clasificacion}</td>
        </tr>
    `;
    tablaActividades.insertAdjacentHTML("beforeend", nuevaFila);

    // Limpiar campos del formulario
    document.getElementById("nuevaActividad").value = "";
    document.getElementById("nuevoRitmo").value = "";
    document.getElementById("nuevoOxigeno").value = "";
}
