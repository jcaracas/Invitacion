const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPauseBtn");
const volumeControl = document.getElementById("volumeControl");

/*window.addEventListener("load", () => {
    audio.play().catch(error => {
        console.log("Autoplay bloqueado por el navegador.");
    });
});*/

playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸️";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶️";
    }
});

