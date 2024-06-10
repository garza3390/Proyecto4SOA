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

   function getLoggedInUserName() {
      return localStorage.getItem('username');
  }

  // Función para redirigir según el tipo de usuario
  function redirectToReservationPage() {
      // Obtener el nombre de usuario del almacenamiento local
      const username = localStorage.getItem('username');
      
      // Verificar si el nombre de usuario es "admin"
      const isAdmin = username === 'admin';

      // Determinar la URL de la página de reservas correspondiente
      const reservationPage = isAdmin ? '/reservations_admin' : '/reservations';

      // Redirigir a la página de reservas correspondiente
      window.location.href = reservationPage;
  }
  
  function toggleSwitch(button) {
    const resultadoTexto = document.getElementById("resultadoTexto");
    resultadoTexto.textContent = " --- Aquí se mostrará la recomendación --- ";

    const columna1 = document.getElementById('columna1');
    const columna2 = document.getElementById('columna2');

    if (button.classList.contains('checked')) {
      columna1.style.display = 'block';
      columna2.style.display = 'none';
    } else {
      columna1.style.display = 'none';
      columna2.style.display = 'block';
    }

    button.classList.toggle('checked');
  }

  function obtenerRecomendacion_2_values() {
    const value1 = document.getElementById("value1Input").value;
    const value2 = document.getElementById("value2Input").value;
  
    let apiUrl_2_values = `https://us-central1-proyecto-3-soa.cloudfunctions.net/backend/comida1?value1=${value1}&value2=${value2}`;
  
    
    fetch(apiUrl_2_values)
      .then(response => {
        if (!response.ok) {
          alert('Error al obtener los datos');
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        mostrarRespuesta(data);
      })
      .catch(error => {
        alert(error);
        console.error('Error:', error);
      });
    
    document.getElementById("value1Input").value = "";
    document.getElementById("value2Input").value = "";
  }

  function obtenerRecomendacion_type_value() {
    const value = document.getElementById("valueInput").value;
    const type = document.getElementById("typeInput").value;    

    let apiUrl_type_value = `https://us-central1-proyecto-3-soa.cloudfunctions.net/backend/comida2?type=${type}&value=${value}`;    

    fetch(apiUrl_type_value)
      .then(response => {
        if (!response.ok) {
          alert('Error al obtener los datos');
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        mostrarRespuesta(data);
      })
      .catch(error => {
        alert(error);
        console.error('Error:', error);
      });

    document.getElementById("typeInput").value = "";
    document.getElementById("valueInput").value = "";
  }

  function mostrarRespuesta(data) {
    const resultadoTexto = document.getElementById("resultadoTexto");
    resultadoTexto.textContent = ""; 

    const platoPrincipal = data['Plato Principal'];
    const bebida = data['Bebida'];
    const postre = data['Postre'];

    const textoResultado = `*Plato Principal: ${platoPrincipal}   *Bebida: ${bebida}   *Postre: ${postre}`;

    resultadoTexto.textContent = textoResultado;
  }

  // Función para mostrar u ocultar el enlace de reservaciones dependiendo del estado de inicio de sesión
  function toggleReservationLink() {
    const reservationsLink = document.getElementById("reservations-link");
    const isLoggedIn = getLoggedInUserName() !== null;

    if (isLoggedIn) {
      reservationsLink.style.display = "block";
    } else {
      reservationsLink.style.display = "none";
    }
  }

  // Función para obtener el nombre de usuario que ha iniciado sesión
  function getLoggedInUserName() {
    return localStorage.getItem("username");
  }

  // Función para redirigir a la página de reservaciones
  function redirectToReservationPage() {
    const username = getLoggedInUserName();
    const isAdmin = username === "admin";
    const reservationPage = isAdmin ? "/reservations_admin" : "/reservations";
    window.location.href = reservationPage;
  }

  // Llamada a la función de inicialización cuando se carga la página
  window.onload = function() {
    toggleReservationLink();
    toggleLogoutButton();
  };
  