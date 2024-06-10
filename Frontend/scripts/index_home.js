// Función para obtener el nombre de usuario del Local Storage
function getLoggedInUserName() {
    return localStorage.getItem('username');
  }

  // Función para mostrar el nombre de usuario en la página
  function displayUserName() {
    const userInfoContainer = document.getElementById('user-info');
    const loginLink = document.getElementById('login-link');
    const username = getLoggedInUserName();
    if (username) {
      userInfoContainer.textContent = username;
      loginLink.style.display = 'none';
    } else {
      userInfoContainer.textContent = '';
      loginLink.style.display = 'block';
    }
  }

  function cerrarSesion() {
    localStorage.removeItem("username");
    window.location.href = "/";
  }

  function toggleLogoutButton() {
    const logoutButton = document.getElementById("logout-button");
    const isLoggedIn = getLoggedInUserName() !== null;

    if (isLoggedIn) {
      logoutButton.style.display = "block";
    } else {
      logoutButton.style.display = "none";
    }
  }

  // Llamar a la función para mostrar el nombre de usuario al cargar la página
  window.onload = function() {
    displayUserName();
    toggleLogoutButton();
  };
  