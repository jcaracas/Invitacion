document.addEventListener("DOMContentLoaded", () => {

    const popupOverlay = document.getElementById("popupOverlay");
    const popupContent = document.getElementById("popupContent");

    // Bloquear scroll mientras el popup está activo
    document.body.style.overflow = "hidden";

    // Cerrar popup al hacer clic dentro del contenido
    popupContent.addEventListener("click", () => closePopup());

    // Cerrar al hacer clic fuera
    popupOverlay.addEventListener("click", (e) => {
        if (e.target === popupOverlay) closePopup();
    });

    function closePopup() {
        popupOverlay.classList.add("fadeOut");

        setTimeout(() => {
            popupOverlay.classList.add("hidden");
            document.body.style.overflow = "auto";
        }, 600); // duración de fadeOut
    }
});

// Abrir popup
document.getElementById("btn-ver-lista").addEventListener("click", async () => {
    const popup = document.getElementById("popup-lista");
    popup.style.display = "flex";

    await cargarRegalos();
});

// Cerrar popup
document.querySelector(".cerrar-popup-lista").addEventListener("click", () => {
    document.getElementById("popup-lista").style.display = "none";
});

// Cerrar haciendo click fuera
document.getElementById("popup-lista").addEventListener("click", e => {
    if (e.target.id === "popup-lista") {
        e.target.style.display = "none";
    }
});

// Consultar regalos desde backend
async function cargarRegalos() {
    const contenedor = document.getElementById("contenedor-regalos");
    const eventoId = document.getElementById("evento-id").dataset.id;

    contenedor.innerHTML = "<p>Cargando...</p>";

    try {
        const API_URL = "http://127.0.0.1:5000/api";
        const res = await fetch(`${API_URL}/regalos/evento/${eventoId}`);
        const data = await res.json();

        contenedor.innerHTML = "";

        data.forEach(regalo => {
            const div = document.createElement("div");
            div.classList.add("tarjeta-regalo");

            // 👉 ruta absoluta al backend
            const imagenUrl = `http://127.0.0.1:5000${regalo.imagen}`;

            div.style.backgroundImage = `url('${imagenUrl}')`;
            
            div.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <div class="contenido-regalo">
                            <h4 class="titulo">${regalo.titulo}</h4>

                            ${regalo.enlace ? `<a href="${regalo.enlace}" target="_blank" class="link">Ver link</a>` : ""}

                            <p class="estado">${regalo.estado}</p>

                            <button class="btn-seleccionar" data-id="${regalo.id}">
                                Seleccionar
                            </button>
                        </div>
                    </div>
                    <div class="card-back">
                        <h3>${regalo.titulo}</h3>
                        <p>${regalo.descripcion || "Un regalo muy especial 💝"}</p>
                        <button class="btn-confirmar">Confirmar</button>
                    </div>
                </div>
            `;
            // Flip
            div.querySelector(".btn-seleccionar")
                .addEventListener("click", () => {
                    div.classList.add("flip");
                });

            // Confirmar
            div.querySelector(".btn-confirmar")
                .addEventListener("click", () => confirmarRegalo(regalo.id));

            contenedor.appendChild(div);
        });

    } catch (error) {
        console.error(error);
        contenedor.innerHTML = "<p>Error al cargar la lista.</p>";
    }
}

function confirmarRegalo(id) {
    document.getElementById("popupRegalos").classList.add("hidden");
    document.getElementById("mensajeGracias").classList.remove("hidden");
}

function cerrarMensaje() {
    document.getElementById("mensajeGracias").classList.add("hidden");
}

