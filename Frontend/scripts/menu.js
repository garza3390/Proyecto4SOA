// Función para obtener el nombre de usuario del Local Storage
function getLoggedInUserName() {
    return localStorage.getItem('username');
  }
  
  // Función para obtener los datos de la API
  function obtenerDatosAPI(url, callback) {
    fetch(url)
      .then(response => response.json())
      .then(data => callback(data))
      .catch(error => console.error('Error al obtener los datos de la API:', error));
  }

  // Función para generar la lista de platos
  function generarListaPlatos(platos, contenedorId) {
    var ul = document.getElementById(contenedorId);
    platos.forEach(function(plato) {
      var li = document.createElement("li");
      li.textContent = plato;
      ul.appendChild(li);
    });
  }

  // URL de la API
  var apiUrl = "https://us-central1-proyecto-3-soa.cloudfunctions.net/backend/menu";

  // Llamar a la función para obtener los datos de la API y generar las listas de platos
  obtenerDatosAPI(apiUrl, function(data) {
    generarListaPlatos(data.desserts, "postres");
    generarListaPlatos(data.drinks, "bebidas");
    generarListaPlatos(data.maindishes, "platos_principales");
  });