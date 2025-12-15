//codigo para la agenda
// Define la fecha objetivo (Ajusta esta fecha)
const targetDate = new Date("2025-03-24T17:00:00");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const messageElement = document.getElementById("message");

function updateCountdown() {
    const now = new Date();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
        daysElement.textContent = "0";
        hoursElement.textContent = "0";
        minutesElement.textContent = "0";
        messageElement.textContent = "¡Ya el Evento Comenzo!";
        return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;


    // Cambia el mensaje según el tiempo restante
    if (days <= 1) {
        messageElement.textContent = "¡Hoy es el día!";
    } else if (days <= 5) {
        messageElement.textContent = "Ya falta muy poco, ¡prepárate!";
    } else if (days <= 15) {
        messageElement.textContent = "Quedan pocos días";
    } else {
        messageElement.textContent = "Solo Faltan...";
    }
}

// Actualiza el contador cada segundo
setInterval(updateCountdown, 1000);

// Ejecuta la función al cargar la página
updateCountdown();