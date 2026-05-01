const form = document.getElementById("formAlumno");
const lista = document.getElementById("listaAlumnos");
const inputId = document.getElementById("idAlumno");

let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
let editIndex = null;

// Reparar IDs
function repararIds() {
    let id = 1;
    alumnos.forEach(a => {
        if (!a.id) {
            a.id = id++;
        } else {
            id = Math.max(id, a.id + 1);
        }
    });
}
repararIds();

// Generar ID
function generarId() {
    if (alumnos.length === 0) return 1;
    return Math.max(...alumnos.map(a => a.id)) + 1;
}

// Mostrar ID en formulario
function actualizarId() {
    if (editIndex === null) {
        inputId.value = generarId();
    } else {
        inputId.value = alumnos[editIndex].id;
    }
}

// Capitalizar
function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

// Mostrar alumnos
function mostrarAlumnos() {
    lista.innerHTML = "";

    alumnos.forEach((a, i) => {
        const div = document.createElement("div");
        div.classList.add("alumno");

        div.innerHTML = `
            <div>
                <strong>${a.id} - ${a.nombre} ${a.apellido}</strong>
                <p>Edad: ${a.edad}</p>
                <p>${a.email}</p>
            </div>
            <div class="alumno-acciones">
                <button class="btn-modificar" onclick="editar(${i})">Modificar</button>
                <button class="btn-borrar" onclick="borrar(${i})">Borrar</button>
            </div>
        `;

        lista.appendChild(div);
    });
}

// Agregar / editar
form.addEventListener("submit", e => {
    e.preventDefault();

    const alumno = {
        nombre: capitalizar(document.getElementById("nombre").value),
        apellido: capitalizar(document.getElementById("apellido").value),
        edad: document.getElementById("edad").value,
        email: document.getElementById("email").value
    };

    if (editIndex === null) {
        alumno.id = generarId();
        alumnos.push(alumno);
    } else {
        alumno.id = alumnos[editIndex].id;
        alumnos[editIndex] = alumno;
        editIndex = null;
    }

    localStorage.setItem("alumnos", JSON.stringify(alumnos));
    form.reset();
    actualizarId();
    mostrarAlumnos();
});

// Editar
function editar(i) {
    const a = alumnos[i];

    document.getElementById("nombre").value = a.nombre;
    document.getElementById("apellido").value = a.apellido;
    document.getElementById("edad").value = a.edad;
    document.getElementById("email").value = a.email;

    editIndex = i;
    actualizarId();
}

// Borrar
function borrar(i) {
    if (confirm("¿Eliminar alumno?")) {
        alumnos.splice(i, 1);
        localStorage.setItem("alumnos", JSON.stringify(alumnos));
        mostrarAlumnos();
        actualizarId();
    }
}

// Inicializar
mostrarAlumnos();
actualizarId();


