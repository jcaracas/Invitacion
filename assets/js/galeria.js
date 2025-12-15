const API_URL = "http://127.0.0.1:5000/api"; // Cambia esto a la URL de tu API
const GALLERY_LIMIT = 10; // Límite de fotos por galería
const token = localStorage.getItem('token'); // Obtener token de autenticación
const codigo = localStorage.getItem('codigo'); // Obtener código del evento

if (!token) {
    alert('Por favor, inicia sesión para acceder a la galería');            
    window.location.href = '/index'; // Redirigir a la página de inicio de sesión si no hay token
}

function toggleFavorito(button, id) {
    const icon = button.querySelector('.icon');
    const esFavorito = icon.textContent === '★';

    fetch(`${API_URL}/galeria/favorito/${id}`, {
        method: 'PUT',
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
        if (res.ok) {
            icon.textContent = !esFavorito ? '★' : '☆';
            icon.style.color = !esFavorito ? '#FFD700' : '#A6785D';
        }
    });
}

function eliminarImagen(button, id) {
    if (confirm("¿Seguro que quieres eliminar esta imagen?")) {
        console.log(id);
        fetch(`${API_URL}/galeria/delete/${id}`, {
            method: 'DELETE',
            headers: { 
                'authorization': `Bearer ${token}`,
                'Accept': 'application/json' // Asegúrate de que la API acepte este encabezado
             } // Agregar token de autenticación  
        })
        .then(res => {
            if (res.ok) {
                // Elimina visualmente
                button.closest('.gallery-item').remove();
            } else {
                alert("No se pudo eliminar la imagen.");
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('photos');
    const previewContainer = document.getElementById('previewContainer');
    const uploadBtn = document.getElementById('uploadBtn');
    const galleryGrid = document.getElementById('galleryGrid');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentImages = [];
    let currentIndex = 0;
    
    // Cargar galería al iniciar
    loadGallery();
    
    // Manejar selección de archivos
    fileInput.addEventListener('change', function(e) {
        previewContainer.innerHTML = '';
        
        if (this.files.length > GALLERY_LIMIT) {
            alert('Por favor, selecciona un máximo de 10 fotos');
            this.value = '';
            return;
        }
        
        Array.from(this.files).forEach(file => {
            if (!file.type.match('image.*')) {
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(event) {
                const previewThumb = document.createElement('img');
                previewThumb.src = event.target.result;
                previewThumb.className = 'preview-thumbnail';
                previewContainer.appendChild(previewThumb);
            }
            
            reader.readAsDataURL(file);
        });
    });
    
    // Manejar envío del formulario
    uploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (fileInput.files.length === 0) {
            alert('Por favor, selecciona al menos una foto');
            return;
        }
        
        uploadBtn.disabled = true;
        uploadBtn.textContent = 'Subiendo...';
        
        try {
            const formData = new FormData();
            Array.from(fileInput.files).forEach(file => {
                formData.append('photos', file);
            });
            
            const response = await fetch(`${API_URL}/galeria/upload/${codigo}`, {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${token}`, // Agregar token de autenticación
                    'Accept': 'application/json'
                },
                body: formData
            });

            console.log("Codigo de respuesta",response.status);

            if (!response.ok) {
                const errorText = await response.text(); // <- útil para ver errores HTML
                throw new Error(`Error al subir las fotos: ${errorText}`);
            }
                    
            const result = await response.json();
            console.log('Respuesta del servidor:', result);

            alert('Fotos subidas correctamente');
            fileInput.value = '';
            previewContainer.innerHTML = '';
            loadGallery();
        } catch (error) {
            if (error instanceof SyntaxError) {
                console.error('Error de sintaxis al parsear JSON:', error.message);
            } else {
                console.error('Error inesperado:', error.message);
            }
            alert('Hubo un error al subir las fotos catch');
        } finally {
            uploadBtn.disabled = false;
            uploadBtn.textContent = 'Subir Fotos';
        }
    });
    
    // Cargar galería desde el servidor
    async function loadGallery() {
        try {
            const response = await fetch(`${API_URL}/galeria/${codigo}`, {
                method: 'GET',
                headers: {  
                    'authorization': `Bearer ${token}`, // Agregar token de autenticación
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Error al cargar la galería');
            }
            
            const fotos = await response.json();
            currentImages = fotos;
            renderGallery(fotos);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    // Renderizar galería
    function renderGallery(images) {
        galleryGrid.innerHTML = '';
    
        images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
    
            // Imagen
            const img = document.createElement('img');
            img.src = `http://127.0.0.1:5000/uploads/galeria/${image.imagen_url}`;
            img.alt = `Foto de la boda ${index + 1}`;
            img.className = 'gallery-img';
            img.dataset.index = index;
            img.addEventListener('click', function () {
                openModal(parseInt(this.dataset.index));
            });
    
            // Contenedor de acciones (favorito + eliminar)
            const actions = document.createElement('div');
            actions.className = 'gallery-actions';
    
            // Botón favorito
            const favButton = document.createElement('button');
            favButton.className = 'btn-favorito';
            favButton.innerHTML = `<span class="icon">${image.favorito ? '★' : '☆'}</span>`;
            favButton.addEventListener('click', function (e) {
                e.stopPropagation(); // No abre el modal
                toggleFavorito(this, image.id);
            });
    
            // Botón eliminar
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn-borrar';
            deleteButton.innerHTML = '<span class="icon"><i class="fa-solid fa-trash-can"></i></span>';
            deleteButton.addEventListener('click', function (e) {
                e.stopPropagation(); // No abre el modal
                eliminarImagen(this, image.id);
            });
    
            // Añadir botones a contenedor
            actions.appendChild(favButton);
            actions.appendChild(deleteButton);
    
            // Armar la tarjeta
            galleryItem.appendChild(img);
            galleryItem.appendChild(actions);
    
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    // Abrir modal con la imagen seleccionada
    function openModal(index) {
        currentIndex = index;
        modal.style.display = 'block';
        modalImg.src = `http://127.0.0.1:5000/uploads/galeria/${currentImages[index].imagen_url}`;
    }
    
    // Cerrar modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Navegación del carrusel
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        modalImg.src = `http://127.0.0.1:5000/uploads/galeria/${currentImages[currentIndex].imagen_url}`;
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        modalImg.src = `http://127.0.0.1:5000/uploads/galeria/${currentImages[currentIndex].imagen_url}`;
    });
    
    // Cerrar al hacer clic fuera de la imagen
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
                modalImg.src = `http://127.0.0.1:5000/uploads/galeria/${currentImages[currentIndex].imagen_url}`;
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % currentImages.length;
                modalImg.src = `http://127.0.0.1:5000/uploads/galeria/${currentImages[currentIndex].imagen_url}`;
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });
});