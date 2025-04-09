function mostrarViajes() {
    let url = "/viajes";
    let ax = axios.create();
    ax.get(url).then(data => {
        let viajes = data.data.result.recordset;
        let html = `
            <div class="container mt-5">
                <h2><strong>Lista de Viajes Registrados</strong></h2>
                <img src="https://cdn-icons-png.flaticon.com/512/3079/3079591.png" alt="avión" width="50">
                <ul>
                    <li>Esta tabla muestra los <strong>detalles de cada vuelo</strong> registrados hasta el momento.</li>
                    <li>Los horarios están en formato de 24 horas.</li>
                </ul>
                <table class='table table-bordered table-hover'>
                    <tr class='table-primary'>
                        <th>Vuelo</th><th>Origen</th><th>Fecha Salida</th><th>Hora Salida</th>
                        <th>Destino</th><th>Fecha Llegada</th><th>Hora Llegada</th>
                    </tr>
        `;
        viajes.forEach(function (clt) {
            let fechaSalida = new Date(clt.fecha_salida).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
            let horaSalida = clt.hora_salida.substring(11, 16);
            let fechaLlegada = new Date(clt.fecha_llegada).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
            let horaLlegada = clt.hora_llegada.substring(11, 16);

            html += "<tr>";
            html += "<td>" + clt.id_viaje + "</td>";
            html += "<td>" + clt.ciudad_origen + "</td>";
            html += "<td>" + fechaSalida + "</td>";
            html += "<td>" + horaSalida + "</td>";
            html += "<td>" + clt.ciudad_destino + "</td>";
            html += "<td>" + fechaLlegada + "</td>";
            html += "<td>" + horaLlegada + "</td>";
            html += "</tr>"
        });
        html += "</table></div>";
        document.getElementById("contenido").innerHTML = html;
    }).catch(error => {
        console.log(error);
    });
}



function mostrarFormularioAltaPasajero() {
    let html = `
        <div class="container mt-5">
            <h2>Registrar Nuevo Pasajero</h2>
            <form id="formAltaPasajero">
                <div class="mb-3">
                    <label for="correo" class="form-label">Correo:</label>
                    <input type="email" class="form-control" id="correo" name="correo" required>
                </div>
                <div class="mb-3">
                    <label for="nombres" class="form-label">Nombres:</label>
                    <input type="text" class="form-control" id="nombres" name="nombres" required>
                </div>
                <div class="mb-3">
                    <label for="apellidos" class="form-label">Apellidos:</label>
                    <input type="text" class="form-control" id="apellidos" name="apellidos" required>
                </div>
                <div class="mb-3">
                    <label for="edad" class="form-label">Edad:</label>
                    <input type="number" class="form-control" id="edad" name="edad" required>
                </div>
                <div class="mb-3">
                    <label for="ciudad" class="form-label">Ciudad:</label>
                    <input type="text" class="form-control" id="ciudad" name="ciudad" required>
                </div>
                <button type="submit" class="btn btn-primary me-2">Registrar Pasajero</button>
                <button type="button" class="btn btn-secondary" id="btnLimpiarPasajero">Limpiar</button>
            </form>
        </div>
    `;
    document.getElementById("contenido").innerHTML = html;

    document.getElementById("formAltaPasajero").addEventListener("submit", function (event) {
        event.preventDefault();
        altaPasajero();
    });

    document.getElementById("btnLimpiarPasajero").addEventListener("click", function () {
        document.getElementById("formAltaPasajero").reset();
    });
}




function altaPasajero() {
    let url = "/pasajeros";
    let ax = axios.create();

    let correo = document.getElementById("correo").value;
    let nombres = document.getElementById("nombres").value;
    let apellidos = document.getElementById("apellidos").value;
    let edad = document.getElementById("edad").value;
    let ciudad = document.getElementById("ciudad").value;

    ax.post(url, {
        correo: correo,
        nombres: nombres,
        apellidos: apellidos,
        edad: edad,
        ciudad: ciudad
    }).then(response => {
        alert("Pasajero registrado exitosamente");
        document.getElementById("formAltaPasajero").reset();
    }).catch(error => {
        console.log(error);
        alert("Hubo un error al registrar el pasajero");
    });
}




function mostrarFormularioAltaViaje() {
    let urlCiudades = "/nuevo-viaje/ciudades";
    let urlPasajeros = "/nuevo-viaje/pasajeros";
    let ax = axios.create();

    Promise.all([ax.get(urlCiudades), ax.get(urlPasajeros)])
        .then(responses => {
            let ciudades = responses[0].data.result.recordset;
            let pasajeros = responses[1].data.result.recordset;

            let html = `
                <div class="container mt-5">
                    <h2>Registrar Nuevo Viaje</h2>
                    <form id="formAltaViaje">
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="viajeRedondo">
                            <label class="form-check-label" for="viajeRedondo"><strong>Viaje redondo</strong></label>
                        </div>
                        <div class="mb-3">
                            <label for="pasajero" class="form-label">Pasajero:</label>
                            <select class="form-select" id="pasajero" name="pasajero" required>`;
            pasajeros.forEach(pasajero => {
                html += `<option value="${pasajero.id_pasajero}">${pasajero.nombre_completo}</option>`;
            });
            html += `    </select>
                        </div>
                        <div class="mb-3">
                            <label for="ciudad_origen" class="form-label">Ciudad Origen:</label>
                            <select class="form-select" id="ciudad_origen" name="ciudad_origen" required>`;
            ciudades.forEach(ciudad => {
                html += `<option value="${ciudad.id_ciudad}">${ciudad.nombre}</option>`;
            });
            html += `    </select>
                        </div>
                        <div class="mb-3">
                            <label for="ciudad_destino" class="form-label">Ciudad Destino:</label>
                            <select class="form-select" id="ciudad_destino" name="ciudad_destino" required>`;
            ciudades.forEach(ciudad => {
                html += `<option value="${ciudad.id_ciudad}">${ciudad.nombre}</option>`;
            });
            html += `    </select>
                        </div>
                        <div class="mb-3">
                            <label for="fecha_salida" class="form-label">Fecha Salida:</label>
                            <input type="date" class="form-control" id="fecha_salida" name="fecha_salida" required>
                        </div>
                        <div class="mb-3">
                            <label for="hora_salida" class="form-label">Hora Salida:</label>
                            <input type="time" class="form-control" id="hora_salida" name="hora_salida" required>
                        </div>
                        <div id="camposLlegada">
                            <div class="mb-3">
                                <label for="fecha_llegada" class="form-label">Fecha Regreso:</label>
                                <input type="date" class="form-control" id="fecha_llegada" name="fecha_llegada">
                            </div>
                            <div class="mb-3">
                                <label for="hora_llegada" class="form-label">Hora Regreso:</label>
                                <input type="time" class="form-control" id="hora_llegada" name="hora_llegada">
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Registrar Viaje</button>
                    </form>
                </div>`;

            document.getElementById("contenido").innerHTML = html;

            // Ocultar campos de llegada por defecto
            document.getElementById("camposLlegada").style.display = "none";

            // Activar/desactivar campos de regreso según checkbox
            document.getElementById("viajeRedondo").addEventListener("change", function () {
                let mostrar = this.checked;
                document.getElementById("camposLlegada").style.display = mostrar ? "block" : "none";

                // Campos requeridos solo si es redondo
                document.getElementById("fecha_llegada").required = mostrar;
                document.getElementById("hora_llegada").required = mostrar;
            });

            document.getElementById("formAltaViaje").addEventListener("submit", function (event) {
                event.preventDefault();
                registrarViaje();
            });
        }).catch(error => {
            console.error(error);
        });
}




function registrarViaje() {
    let form = document.getElementById("formAltaViaje");
    let data = {
        id_pasajero: form.pasajero.value,
        id_ciudad_origen: form.ciudad_origen.value,
        id_ciudad_destino: form.ciudad_destino.value,
        fecha_salida: form.fecha_salida.value,
        hora_salida: form.hora_salida.value + ":00",
        fecha_llegada: form.fecha_llegada.value,
        hora_llegada: form.hora_llegada.value + ":00"
    };

    let url = "/nuevo-viaje";
    axios.post(url, data)
        .then(response => {
            alert("Viaje registrado exitosamente");
            mostrarViajes(); // Opcional, para actualizar la lista de viajes
        })
        .catch(error => {
            console.error(error);
            alert("Error al registrar el viaje");
        });
}

