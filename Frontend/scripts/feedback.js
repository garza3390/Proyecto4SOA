// Función para obtener el nombre de usuario del Local Storage
function getLoggedInUserName() {
    return localStorage.getItem('username');
  }

  // Función para mostrar el nombre de usuario en la página
  function displayUserName() {
    const userInfoContainer = document.getElementById('user-info');
    const username = getLoggedInUserName();
    if (username) {
      userInfoContainer.textContent = 'Bienvenido, ' + username;
    }
  }

  // Llamar a la función para mostrar el nombre de usuario al cargar la página
  window.onload = function() {
    displayUserName();
  };

  // Función para mostrar el emoji según la emoción
  function mostrarEmojiSegunEmocion(score) {
      let emocion = "";
      
      if (score < -0.70) {
          emocion = "Molesto";
      } else if (score < -0.20) {
          emocion = "Triste";
      } else if (score < 0.20) {
          emocion = "Serio";
      } else if (score < 0.70) {
          emocion = "Comodo";
      } else {
          emocion = "Feliz";
      }

      // Mapeo de emociones a emojis
      const emojis = {
          "Molesto": '😡',
          "Triste": '😢',
          "Serio": '😐',
          "Comodo": '😊',
          "Feliz": '😄'
      };

      return emojis[emocion] || emojis["Serio"]; // Si no se encuentra la emoción, se muestra el emoji neutro
  }

  // Función para analizar el sentimiento del comentario
  function analizarSentimiento() {
    const opinion = document.getElementById('opinion').value;
    //const apiUrl = 'https://us-central1-proyecto-3-soa.cloudfunctions.net/backend/feedback';
    const apiUrl = 'https://us-central1-proyecto-3-soa.cloudfunctions.net/backend/feedback';
    // Objeto con la información de la solicitud
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: opinion })
    };

    // Realizar la solicitud fetch al API
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Una vez que se recibe la respuesta JSON del API
            const score = data.score; // Obtener el valor de score del JSON
            const emoji = mostrarEmojiSegunEmocion(score); // Calcular el emoji correspondiente
            mostrarEmoji(emoji); // Mostrar el emoji en la interfaz
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            // Mostrar un mensaje de error al usuario
            alert('Hubo un error al procesar su solicitud. Por favor, inténtelo de nuevo más tarde.');
        });
  }

  // Función para mostrar el emoji en la interfaz
  function mostrarEmoji(emoji) {
    const emojiDisplay = document.getElementById('emoji-display');
    emojiDisplay.textContent = emoji;
  }

  // Obtener el botón y añadir un event listener para generar y mostrar el emoji al hacer clic
  const generateButton = document.getElementById('generate-button');
  generateButton.addEventListener('click', analizarSentimiento);
  