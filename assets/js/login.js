// ======================
// NAVBAR RESPONSIVE
// ======================
const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');

if (navbarToggle && navbarMenu) {
  navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('show');
  });
}

// ======================
// UTILIDADES DE SESIÓN
// ======================
function getSesion() {
  return {
    token: localStorage.getItem("token") || sessionStorage.getItem("token"),
    tipoUsuario: localStorage.getItem("tipo_usuario") || sessionStorage.getItem("tipo_usuario")
  };
}

function cerrarSesion() {
  localStorage.clear();
  sessionStorage.clear();
  location.reload();
}

// ======================
// DOM READY
// ======================
document.addEventListener('DOMContentLoaded', () => {

  const API_URL = "https://webiinvitefront.onrender.com/api";

  // Guardar código del evento
  const codigoEvento = document.getElementById("evento-id")?.dataset?.id;
  if (codigoEvento) {
    localStorage.setItem("codigo", codigoEvento);
  }

  const { token, tipoUsuario } = getSesion();
  //console.log("Sesión actual:", { token, tipoUsuario });

  const overlay = document.getElementById("loginOverlay");
  const form = document.getElementById("loginForm");
  const errorText = document.getElementById("loginError");

  // ======================
  // BOTÓN CERRAR SESIÓN
  // ======================
  const logoutButton = document.getElementById("btn-cerrar-sesion");
  if (logoutButton) {
    logoutButton.addEventListener("click", cerrarSesion);
  }

  // ======================
  // SI YA ESTÁ LOGUEADO
  // ======================
  if (token && tipoUsuario) {
    if (overlay) overlay.style.display = "none";
    document.body.style.overflow = "auto";
    return; // 🔴 NO mostramos el login
  }

  // ======================
  // MOSTRAR POPUP LOGIN
  // ======================
  if (!overlay || !form) return;

  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";

  // ======================
  // MOSTRAR / OCULTAR PASSWORD
  // ======================
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      togglePassword.innerHTML = isPassword
        ? '<i class="fa-solid fa-eye-slash"></i>'
        : '<i class="fa-solid fa-eye"></i>';
    });
  }

  // ======================
  // LOGIN
  // ======================
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorText.textContent = "";

    const email = document.getElementById("email").value.trim();
    const contrasenia = passwordInput.value;
    const remember = document.getElementById("remember").checked;

    try {
      const res = await fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasenia })
      });

      const data = await res.json();

      if (!res.ok) {
        errorText.textContent = data.mensaje || "Credenciales inválidas";
        return;
      }

      // Guardar sesión
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("token", data.token);
      storage.setItem("tipo_usuario", data.user.tipo_usuario);

      document.dispatchEvent(new Event("sesion-iniciada"));

      // Cerrar popup
      overlay.style.display = "none";
      document.body.style.overflow = "auto";

      console.log("Login exitoso");

    } catch (error) {
      console.error(error);
      errorText.textContent = "Error al conectar con el servidor";
    }
  });
});
