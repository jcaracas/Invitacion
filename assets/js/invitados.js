const codigo = localStorage.getItem("codigo") ;
const invitadosPorPagina = 5;
let paginaActual = 1;
let invitadosTotales = [];

async function obtenerInvitados() {
    try {
      const res = await fetch(`${API_URL}/invitados/evento/${codigo}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      invitadosTotales = await res.json();
      window.invitadosGlobal = invitadosTotales; // Guardar en variable global
      mostrarPagina(1); // Mostrar la primera página
    } catch (err) {
      alert("Error al cargar invitados");
      console.error(err);
    }
  }

document.getElementById("btn-descargar-excel").addEventListener("click", () => {
if (!window.invitadosGlobal || window.invitadosGlobal.length === 0) {
    alert("No hay invitados para exportar.");
    return;
}

// 1. Crear hoja con los datos
const ws = XLSX.utils.json_to_sheet(window.invitadosGlobal);

// 2. Crear el libro de Excel y agregar la hoja
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Invitados");

// 3. Exportar el archivo
XLSX.writeFile(wb, "lista_invitados.xlsx");
});


document.addEventListener("DOMContentLoaded", obtenerInvitados);


function mostrarPagina(pagina) {
  paginaActual = pagina;
  const inicio = (pagina - 1) * invitadosPorPagina;
  const fin = inicio + invitadosPorPagina;
  const invitadosPagina = invitadosTotales.slice(inicio, fin);

  const tbody = document.querySelector("#tabla-invitados tbody");
  tbody.innerHTML = "";

  invitadosPagina.forEach(inv => {
    const row = `<tr>
      <td>${inv.nombre}</td>
      <td>${inv.email}</td>
      <td>${inv.acompanantes}</td>
      <td>${inv.estado_confirmacion}</td>
      <td>${inv.comentario || ''}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
  // Actualizar botones y texto
  document.getElementById("paginaActual").textContent = `Página ${pagina}`;
  document.getElementById("btnAnterior").disabled = pagina === 1;
  document.getElementById("btnSiguiente").disabled = fin >= invitadosTotales.length;

}
// Eventos de paginación
document.getElementById("btnAnterior").addEventListener("click", () => {
    if (paginaActual > 1) {
      paginaActual--;
      mostrarPagina(paginaActual);
    }
  });
  
  document.getElementById("btnSiguiente").addEventListener("click", () => {
    if ((paginaActual * invitadosPorPagina) < invitadosTotales.length) {
      paginaActual++;
      mostrarPagina(paginaActual);
    }
  });

function generarPaginacion() {
  const totalPaginas = Math.ceil(invitadosTotales.length / invitadosPorPagina);
  const contenedor = document.getElementById("paginacion-invitados");
  contenedor.innerHTML = "";

  for (let i = 1; i <= totalPaginas; i++) {
    const item = document.createElement("li");
    item.className = `page-item ${i === paginaActual ? 'active' : ''}`;
    item.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    item.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarPagina(i);
    });
    contenedor.appendChild(item);
  }
}
// 

document.getElementById("btn-enviar-excel").addEventListener("click", async () => {

if (!codigo) {
    alert("Código de evento no disponible.");
    return;
}
const respuesta = await fetch(`${API_URL}/invitados/enviar-excel`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ codigo: codigo })
});

const data = await respuesta.json();
alert(data.mensaje || "Error al enviar");
});
