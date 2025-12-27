

/* Funcion para mostra el mapa con una direccion dada
function initMap() {
    var ubicacion = { lat: -33.37398147583008, lng: -70.73213958740234 }; // Coordenadas de Santiago, Chile (puedes cambiarlas)
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: ubicacion
    });
    var marker = new google.maps.Marker({
        position: ubicacion,
        map: map
    });
}*/
const API_URL = "https://webiinvitefront.onrender.com/api"; // Cambia esto a la URL de tu API
//const token = localStorage.getItem("token");

function abrirGoogleMaps() {
    // Dirección a buscar (ejemplo: Torre Eiffel, París)
    const direccion = "Pedro Riveros 1400 Quilicura, Santiago";
    
    // Codificar la dirección para URL
    const direccionCodificada = encodeURIComponent(direccion);
    
    // URL de Google Maps con la dirección
    const url = `https://www.google.com/maps?q=${direccionCodificada}`;
    
    // Abrir en una nueva pestaña
    window.open(url, "_blank");
}

//const calendar = document.getElementById("calendar");
//const monthYear = document.getElementById("monthYear");

// Define la fecha objetivo (Ajusta esta fecha de inico y fecha de termino)
const targetDate = new Date("2026-02-28T17:00:00");
const finDate = new Date("2026-02-28T23:00:00");

// Extraer fecha (YYYYMMDD)
const today = new Date();
const year = targetDate.getFullYear();
const month = targetDate.getMonth(); 
const specialDay = targetDate.getDate(); 
const fechaFormateada = `${specialDay}/${month+1}/${year}`;

document.getElementById("fecha").textContent = fechaFormateada;


const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

//monthYear.textContent = `${monthNames[month]} ${year}`;

const firstDay = new Date(year, month, 1).getDay(); // Día de la semana del primer día del mes
const lastDate = new Date(year, month + 1, 0).getDate(); // Último día del mes

/* Rellena espacios vacíos antes del primer día del mes
for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    calendar.appendChild(emptyCell);
}

// Genera los días del mes
for (let day = 1; day <= lastDate; day++) {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    dayElement.classList.add("day");

    if (day === specialDay) {
        dayElement.classList.add("highlight");
    }

    calendar.appendChild(dayElement);
}*/

/* JAVASCRIPT PARA VIDEO */
const video = document.getElementById("background-video");

/*/ Alternar reproducción del video con un clic (opcional)
video.addEventListener("click", () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
});*/




//JS para enviar invitacion a google calendar

document.getElementById("addToCalendar").addEventListener("click", function() {
    // Configura los detalles del evento
    const titleGC = encodeURIComponent("Matrimonio de Juan y Nahir");
    const detailsGC= encodeURIComponent("No olvides asistir a nuestro Matrimonio.");
    const locationGC = encodeURIComponent("Santiago, Chile");
    
    // Fecha y hora en formato UTC (Ajusta según tu zona horaria)
    const startDate = targetDate.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z"; // fecha declarada en el inicio
    const endDate = finDate.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";//Extraer fecha formato (YYYYMMDD)
    
    

    // URL de Google Calendar con los parámetros del evento
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titleGC}&details=${detailsGC}&location=${locationGC}&dates=${startDate}/${endDate}`;

    // Abrir en una nueva pestaña
    window.open(googleCalendarUrl, "_blank");
});

//fin Google Calendar*/


// Define la fecha objetivo (Ajusta esta fecha) - INICIO CONTADOR

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const messageElement = document.getElementById("message");

function updateCountdown() {
    const now = new Date();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
        daysElement.textContent = "0";
        hoursElement.textContent = "0";
        minutesElement.textContent = "0";
        secondsElement.textContent = "0";
        messageElement.textContent = "¡Ya el Evento Comenzo!";
        return;
    }
    

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;

    // Cambia el mensaje según el tiempo restante
    if (days <= 0) {
        messageElement.textContent = "¡Hoy es el día!";
    } else if (days <= 5) {
        messageElement.textContent = "Ya falta muy poco, ¡prepárate!";
    } else if (days <= 15) {
        messageElement.textContent = "Quedan pocos días";
    } else {
        messageElement.textContent = "Falta Poco!";
    }
}

// Actualiza el contador cada segundo
setInterval(updateCountdown, 1000);

// Ejecuta la función al cargar la página
updateCountdown();

//FIN DEL CONTADOR DE FECHA

//INICIO REPRODUCTOS DE AUDIO
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPauseBtn");
const volumeControl = document.getElementById("volumeControl");
const bars = document.querySelector(".freq-bars");
const dalePlay = document.getElementById("dalePlay");

/*window.addEventListener("load", () => {
    audio.play().catch(error => {
        console.log("Autoplay bloqueado por el navegador.");
    });
});
*/
playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.classList.add("pausando");
        bars.classList.add("active");
        dalePlay.style.display = "none";
    } else {
        audio.pause();
        playPauseBtn.classList.remove("pausando");
        bars.classList.remove("active");
        dalePlay.style.display = "block";
    }
});

document.querySelectorAll('.card-container').forEach(container => {
    container.addEventListener('click', () => {
      container.querySelector('.card').classList.toggle('flipped');
    });
  });
  
// FIN REPRODUCTOR DE AUDIO
const navbar = document.getElementById('navbar');
const loginButton = document.getElementById('btn-login-flotante');
const indexmenu = document.getElementById('indexmenu');
const geleriamenu = document.getElementById('galeriamenu');
const confirmacionesMenu = document.getElementById('confirmamenu');
let paginaActual = 1;
let totalPaginas = 1;

/*/ Función para mostrar u ocultar elementos según sesión
function actualizarUIporSesion() {
    const token = localStorage.getItem("token"); // Valor por defecto null
    const tipoUsuario = localStorage.getItem("tipo_usuario"); // Valor por defecto "invitado"
    
    
        if (!token || !tipoUsuario) {
            navbar.style.display = "none";
            //loginButton.style.display = "inline-block";
            return;
        }
        if (token && tipoUsuario && typeof tipoUsuario === "string" && tipoUsuario !== "Invitado") {
            navbar.style.display = "flex";
            galeriamenu.style.display = "flex";
            confirmacionesMenu.style.display = "flex";
            indexmenu.style.display = "flex";
            //loginButton.style.display = "none";
            loadFavoritas();
            return;
        } 
        if (token && tipoUsuario && typeof tipoUsuario === "string" && tipoUsuario === "Invitado") {
            navbar.style.display = "flex";
            //loginButton.style.display = "none";
            loadFavoritas();
        }  
         
}*/

function randomRotation() {
    return (Math.random() * 10 - 5).toFixed(2); // entre -5 y +5 grados
}

function obtenerLimitePorDispositivo() {
    const ancho = window.innerWidth;

    if (ancho <= 768) {
        return 4; // Móviles
    } else if (ancho <= 1024) {
        return 6; // Tablets
    } else {
        return 8; // PC
    }
}

/*async function loadFavoritas(pagina = 1) {
    const token = localStorage.getItem("token");
    const codigo = localStorage.getItem("codigo"); // Obtener el código del evento desde localStorage
    const limit = obtenerLimitePorDispositivo(); // 🟢 aquí se define cuántas cargar

    if (token) {
        document.getElementById('galeriaFavoritas').style.display = 'block';    
        try {
            const response = await fetch(`${API_URL}/galeria/favoritas/${codigo}?page=${pagina}&limit=${limit}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}` //
                    }
        });
            if (!response.ok) throw new Error('Error al cargar favoritas');
            const favoritas = await response.json();
            renderFavoritas(favoritas);
        } catch (error) {
            console.error("Error al obtener favoritas:", error);
        }
    }
}*/

function renderFavoritas(images) {
    const container = document.getElementById('favoritasGrid');
    container.innerHTML = '';

    if (!images.favoritas || images.favoritas.length === 0) {
        container.innerHTML = '<p style="text-align: center;">No tienes fotos favoritas aún.</p>';
        document.getElementById('favoritasGrid').classList.remove('oculto');
        return;
    }

    images.favoritas.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'foto-favorita';
        
        // Asignamos propiedades CSS personalizadas para el efecto de apilamiento
        item.style.setProperty('--random-rotation', Math.random());
        item.style.setProperty('--random-x', Math.random() * 2 - 1); // Entre -1 y 1
        item.style.setProperty('--random-y', Math.random() * 2 - 1);
        item.style.setProperty('--stack-offset', index % 5); // Para el efecto de apilamiento
        
        // Rotación inicial (manteniendo tu función original)
        item.style.transform = `rotate(${randomRotation()}deg)`;

        const img = document.createElement('img');
        img.src = `http://127.0.0.1:5000/uploads/galeria/${image.imagen_url}`;
        img.alt = 'Imagen favorita';

        const botones = document.createElement('div');
        botones.className = 'botones-accion';

        const descargarBtn = document.createElement('button');
        descargarBtn.innerHTML = `
            <button class="btn-descargar" onclick="descargarImagen('http://127.0.0.1:5000/uploads/galeria/${image.imagen_url}')">
           
            <i class="fas fa-download icono-btn"></i>
            </button>
        `;

        botones.appendChild(descargarBtn);
        item.appendChild(img);
        item.appendChild(botones);
        container.appendChild(item);

    });

    // Actualiza paginación
    paginaActual = images.currentPage;
    totalPaginas = images.totalPages;

    actualizarControlesPaginacion();
    document.getElementById('favoritasGrid').classList.remove('oculto');
}

function actualizarControlesPaginacion() {
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    const paginaInfo = document.getElementById('pagina-actual');
  
    paginaInfo.textContent = `Página ${paginaActual} de ${totalPaginas}`;
  
    prevBtn.classList.toggle('oculto', paginaActual <= 1);
    nextBtn.classList.toggle('oculto', paginaActual >= totalPaginas);
  }
  
  /*/ Eventos
  document.getElementById('btn-prev').addEventListener('click', () => {
    if (paginaActual > 1) loadFavoritas(paginaActual - 1);
  });
  
  document.getElementById('btn-next').addEventListener('click', () => {
    if (paginaActual < totalPaginas) loadFavoritas(paginaActual + 1);
  });*/
  
  function descargarImagen(url) {
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = url.split("/").pop();
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
  }


// Fin del script de galería

document.addEventListener("DOMContentLoaded", () => {
    //actualizarUIporSesion(); // Llama a la función al cargar la página
    const codigo = document.getElementById("evento-id")?.dataset?.id;
    localStorage.setItem("codigo", codigo); // Guardar el código del evento en localStorage
    
    const logoutButton = document.getElementById("btn-cerrar-sesion");

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("tipo_usuario");
            //actualizarUIporSesion();
            console.log("Sesión cerrada", localStorage.getItem("tipo_usuario"));
        });
    }

    const loginModal = document.getElementById('modal-login');
    const loginForm = document.getElementById('formulario-login-flotante');
    const cerrarModalBtn = document.querySelector('.cerrar-modal-login');

    /*/ Mostrar modal login
    loginButton.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });*/

    /*/ Cerrar modal
    cerrarModalBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('usuario-flotante').value;
        const contrasenia = document.getElementById('contrasena-flotante').value;


        try {
            const response = await fetch(`${API_URL}/usuarios/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, contrasenia })
            });

            if (!response.ok) throw new Error('Login inválido');
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("tipo_usuario", data.user.tipo_usuario);
                actualizarUIporSesion();
                console.log("Sesión iniciada", localStorage.getItem("codigo"));
                // Cierra el modal, etc...
              }

            // Ocultar login modal e ícono
            loginModal.style.display = 'none';
            //loginButton.style.display = 'none';



            // Mostrar botón cerrar sesión
            logoutButton.style.display = 'inline-block';

        } catch (error) {
            alert("Error de login: " + error.message);
        }
    });*/

    /*/ Cerrar sesión
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tipo_usuario');

        //navbar.style.display = 'none';
        logoutButton.style.display = 'none';
        //loginButton.style.display = 'inline-block';
    });
    //loadFavoritas(); Cargar favoritas al inicio*/

});

// Fin del script loguin

document.getElementById("form-confirmar-asistencia").addEventListener("submit", async function(e) {
    e.preventDefault();
  
    const nombre = document.getElementById("nombreInvitado").value.trim();
    const email = document.getElementById("emailInvitado").value.trim();
    const acompanantes = document.getElementById("asistentes").value.trim(); 
    const estado_confirmacion = document.getElementById("respuesta").value;
    const comentario = document.getElementById("comentario").value.trim();
    const cerrarModalRes = document.querySelector('.cerrar-modal');
    const codigo = localStorage.getItem("codigo"); // Obtener el código del evento desde localStorage
  
    // Obtener el código de evento desde la etiqueta meta
    
  
    if (!codigo) {
      alert("No se pudo obtener el código del evento. Contacta al organizador.");
      return;
    }
    
  
    try {
      const response = await fetch(`${API_URL}/invitados/respuesta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          email,
          codigo: codigo,  // este es el campo que debe manejar el backend
          estado_confirmacion,
          acompanantes,
          comentario
        })
      });
      
      let data = {};
      try {
        data = await response.json();
      } catch (e) {
        console.warn("Respuesta sin JSON válido:", e);
      }
      if (response.status === 409) {
        // Manejo especial para el conflicto (ya respondió)
        alert(data.mensaje);
        this.reset();
        return;
      }
      if (!response.ok) {
        throw new Error(data.mensaje || "Error al enviar la respuesta.");
      }else {
        //alert("Respuesta enviada con éxito.");
        if (estado_confirmacion.toLowerCase() === "rechazado") {
          document.getElementById("noFormPopup").style.display = "flex";
          setTimeout(function() {
                document.getElementById("noFormPopup").style.display = "none";
            }, 10000);// se agrega tiempo para que se cierre automaticamente
        this.reset(); // Limpia el formulario
        }   else {
            
          document.getElementById("successPopup").style.display = "flex";
          setTimeout(function() {
                document.getElementById("successPopup").style.display = "none";
            }, 5000);// se agrega tiempo para que se cierre automaticamente
            this.reset(); // Limpia el formulario
        }
        
        
      }
      
    } catch (error) {
      console.error("Error no se pudo enviar:", error);
      alert("Ocurrió un error al enviar tu respuesta. Inténtalo nuevamente.");
    }

    cerrarModalRes.addEventListener('click', () => {    
        document.getElementsByClassName("popup")[0].style.display = "none";
    });
    
  });
  
  window.addEventListener("resize", () => {
    // Opcional: recarga solo si cambia el tipo de dispositivo
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(() => {
        //loadFavoritas(1); // Reinicia en página 1
    }, 500);
});
