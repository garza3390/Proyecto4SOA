const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    function getLoggedInUserName() {
      return localStorage.getItem('username');
    }

    // Función para cerrar sesión
    function cerrarSesion() {
      localStorage.removeItem("username");
      window.location.href = "/";
    }

    // Función para enviar solicitudes al backend
    async function sendRequest(url, data) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        if (!response.ok) {
          throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return await response.json();
      } catch (error) {
        console.error('Error:', error);
        alert('Error en la solicitud: ' + error.message);
      }
    }

    function displayUserName() {
      const userInfoContainer = document.getElementById('user-info');
      const username = getLoggedInUserName();
      if (username) {
        userInfoContainer.textContent = username;
      } else {
        userInfoContainer.textContent = '';
      }
    }

    function setDefaultEmail() {
      const emailInput = document.getElementById('email');
      const storedEmail = localStorage.getItem('email');
      if (storedEmail) {
        emailInput.value = storedEmail;
      }
    }

    window.onload = function() {
      displayUserName();
      setDefaultEmail();
    };

    async function loadCalendar() {
  const monthSelect = document.getElementById('month-select').value;
  const yearSelect = document.getElementById('year-select').value;

  try {
    const response = await fetch('https://us-central1-proyecto-3-soa.cloudfunctions.net/get-all-bookings-function');
    const data = await response.json();
    const bookings = data.bookings;

    const daysInMonth = new Date(yearSelect, monthNames.indexOf(monthSelect) + 1, 0).getDate();
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = ''; 

    for (let day = 1; day <= daysInMonth; day++) {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'day';
      dayDiv.innerHTML = `<h3>${day}</h3>`;
      dayDiv.onclick = () => showBookings(day, monthSelect, yearSelect, bookings); 
      calendar.appendChild(dayDiv);
    }

  } catch (error) {
    console.error('Error:', error);
    alert('Error al cargar las reservas: ' + error.message);
  }
}


    function loadHours(day, month, year, bookings) {
      const hourContainer = document.getElementById('hour-container');
      const hoursDiv = document.getElementById('hours');
      hoursDiv.innerHTML = ''; // Clear previous hours

      const dayBookings = bookings.filter(booking => 
        booking.dia === day &&
        booking.mes === month &&
        booking.anio === parseInt(year)
      );

      dayBookings.forEach(booking => {
        const hourDiv = document.createElement('div');
        hourDiv.className = `hour ${booking.estado === 'Disponible' ? 'available' : 'booked'}`;
        hourDiv.innerHTML = `<span>${booking.hora}</span><span>${booking.estado}</span>`;
        hoursDiv.appendChild(hourDiv);
      });

      hourContainer.style.display = 'block';
    }

    // Agregar evento de envío de formulario
    document.getElementById('booking-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const user = document.getElementById('user').value;
      const persons = document.getElementById('persons').value;
      const date = new Date(document.getElementById('date').value);
      const time = document.getElementById('time').value;

      const bookingData = {
        user: user,
        email: email,
        hora: time,
        dia: date.getDate()+1,
        mes: monthNames[date.getMonth()],
        anio: date.getFullYear(),
        numero_personas: parseInt(persons),
        estado: "Reservado"
      };

      try {
        const response = await sendRequest('https://us-central1-proyecto-3-soa.cloudfunctions.net/add-booking-spaces-function', bookingData);
        alert('Reserva agregada exitosamente');
        document.getElementById('email').value = "";
        document.getElementById('user').value = "";
        document.getElementById('persons').value = "";
        document.getElementById('date').value = "";
        document.getElementById('time').value = "";

        loadCalendar(); // Refresh the calendar
      } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar la reserva: ' + error.message);
      }
      
    });

    function showBookings(day, month, year, bookings) {
      const bookingDetails = document.getElementById('booking-details');
      const detailsDiv = document.getElementById('details');
      detailsDiv.innerHTML = ''; // Limpiar detalles anteriores

      // Obtener el nombre de usuario logueado
      const loggedInUserName = getLoggedInUserName();

      // Filtrar las reservas para el día seleccionado y el usuario logueado
      const userBookings = bookings.filter(booking => 
        booking.dia === day &&
        booking.mes.toLowerCase() === month.toLowerCase() &&
        booking.anio === parseInt(year) &&
        booking.user === loggedInUserName
      );

      // Verificar si hay reservas para el día seleccionado
      if (userBookings.length === 0) {
        detailsDiv.innerHTML = '<p>No hay reservas para este día.</p>';
      } else {
        // Mostrar los detalles de las reservas para el día seleccionado y el usuario logueado
        userBookings.forEach(booking => {
          const bookingDiv = document.createElement('div');
          bookingDiv.className = `hour ${booking.estado === 'Disponible' ? 'available' : 'booked'}`;
          bookingDiv.innerHTML = `
          <input type="text" id="hora" value="${booking.hora}" placeholder="Hora">
          <input type="text" id="estado" value="${booking.estado}" placeholder="Estado">
          <input type="text" id="usuario" value="${booking.user || 'N/A'}" placeholder="Usuario">
          <input type="email" id="correo" value="${booking.email || 'N/A'}" placeholder="Correo electrónico">
          <input type="number" id="numPersonas" value="${booking.numero_personas}" placeholder="Número de Personas">
          <button onclick="editarReserva('${booking.id}')">Editar</button>
          <button onclick="eliminarReserva('${booking.id}')">Eliminar</button>
          `;
          detailsDiv.appendChild(bookingDiv);
        });
      }

      // Mostrar los detalles de la reserva
      bookingDetails.style.display = 'block';
    }


    async function editarReserva(id) {
      // Obtener los nuevos valores de los campos de entrada
      const hora = document.getElementById('hora').value;
      const estado = document.getElementById('estado').value;
      const usuario = document.getElementById('usuario').value;
      const correo = document.getElementById('correo').value;
      const numPersonas = document.getElementById('numPersonas').value;

      // Crear el objeto con los datos de la reserva actualizados
      const bookingData = {
        hora: hora,
        estado: estado,
        user: usuario,
        email: correo,
        numero_personas: parseInt(numPersonas)
      };

      try {
        
        //const response = await sendRequest(`https://us-central1-proyecto-3-soa.cloudfunctions.net/backend/put-horario/${id}`, {
        
        const response = await sendRequest(`https://us-central1-proyecto-3-soa.cloudfunctions.net/update-booking-function/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookingData)
        });
        alert('Reserva actualizada exitosamente');
        loadCalendar(); // Recargar el calendario después de actualizar la reserva
      } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar la reserva: ' + error.message);
      }
    }

async function eliminarReserva(id) {
  try {
    //const response = await sendRequest(`https://us-central1-proyecto-3-soa.cloudfunctions.net/backend/delete-horario/${id}`, {
    
    const response = await sendRequest(`https://us-central1-proyecto-3-soa.cloudfunctions.net/delete-booking-function/${id}`, {
      method: 'DELETE'
    });
    alert('Reserva eliminada exitosamente');
    loadCalendar(); // Recargar el calendario después de eliminar la reserva
  } catch (error) {
    console.error('Error:', error);
    alert('Error al eliminar la reserva: ' + error.message);
  }
}
