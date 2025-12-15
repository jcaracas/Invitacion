document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
  
    // Toggle menú responsive
    navbarToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('show');
    });
  
  });
  