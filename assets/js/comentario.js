document.addEventListener('DOMContentLoaded', () => {
const token = localStorage.getItem('token'); // Asegúrate que exista el token

// Función para cargar los últimos 5 mensajes estilo burbuja
async function cargarMensajes() {
  try {
    const res = await fetch('/api/mensajes', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const mensajes = await res.json();

    const contenedor = document.querySelector('.chat-grid');
    contenedor.innerHTML = ''; // limpia antes de cargar

    mensajes.forEach(m => {
      const burbuja = document.createElement('div');
      burbuja.className = `chat-bubble ${getRandomBubbleClass()}`;

      burbuja.innerHTML = `
        <strong>${m.nombre?.toLowerCase()}</strong>
        <div>${m.comentario || ''}</div>
        <div class="chat-meta">${formatearFecha(m.updatedAt)}</div>
        <div class="chat-actions">
          <button onclick="toggleLike('${m.id}')">👍 ${m.likes || 0}</button>
          <button onclick="toggleFavorito('${m.id}')">
            ${m.favorito ? '⭐' : '☆'}
          </button>
        </div>
      `;
      contenedor.appendChild(burbuja);
    });

  } catch (err) {
    console.error('Error al cargar mensajes:', err);
  }
}

// Like a comentario (tabla like_comentario)
function toggleLike(invitadoId) {
  fetch(`/api/likes/like/${invitadoId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(() => cargarMensajes())
    .catch(err => console.error('Error al dar like:', err));
}

// Marcar como favorito (campo favorito en tabla invitados)
function toggleFavorito(invitadoId) {
  fetch(`/api/likes/favorito/${invitadoId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(() => cargarMensajes())
    .catch(err => console.error('Error al marcar favorito:', err));
}

// Utilidades
function getRandomBubbleClass() {
  const clases = ['chat-teal', 'chat-yellow', 'chat-purple', 'chat-red'];
  return clases[Math.floor(Math.random() * clases.length)];
}

function formatearFecha(fecha) {
  if (!fecha) return '';
  const date = new Date(fecha);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

});
  