/*JS para enviar invitacion a google calendar */

document.getElementById("addToCalendar").addEventListener("click", function() {
    // Configura los detalles del evento
    const titleGC = encodeURIComponent("Matrimonio de Jose y Naikar");
    const detailsGC= encodeURIComponent("No olvides asistir a nuestro Matrimonio.");
    const locationGC = encodeURIComponent("Santiago, Chile");
    
    // Fecha y hora en formato UTC (Ajusta según tu zona horaria)
    const startDate = "20250325T180000Z"; // 25 de marzo 2025, 18:00 UTC
    const endDate = "20250325T240000Z";   // 25 de marzo 2025, 24:00 UTC

    // URL de Google Calendar con los parámetros del evento
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titleGC}&details=${detailsGC}&location=${locationGC}&dates=${startDate}/${endDate}`;

    // Abrir en una nueva pestaña
    window.open(googleCalendarUrl, "_blank");
});

//fin Google Calendar