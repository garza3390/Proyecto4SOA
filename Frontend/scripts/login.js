// Función para enviar solicitudes al backend
// Función para enviar solicitudes al backend
async function sendRequest(url, data) {
    try {
        const token = localStorage.getItem('token'); // Obtener el token JWT del Local Storage
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Agregar el token JWT en el encabezado 'Authorization'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        alert('Error en la solicitud: ' + error.message);
    }
}


/*
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    
    if (username === "user@mail.com" && password === "pass") {
        localStorage.setItem("username", username);
        console.log("Inicio de sesión exitoso. Usuario:", username);
        alert("Inicio de sesión exitoso. Bienvenido, " + username);
        window.location.href = "/frontend/";
    } 
    else if (username === "admin@mail.com" && password === "pass") {
        localStorage.setItem("username", username);
        console.log("Inicio de sesión exitoso. Usuario:", username);
        alert("Inicio de sesión exitoso. Bienvenido, " + username);
        window.location.href = "/frontend/reservations_admin";
    }
    else {
        console.log("Credenciales incorrectas. Usuario:", username);
        alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
});
*/

document.getElementById("login-form").addEventListener("submit", async function(event) {
        event.preventDefault();
        const emailLogin = document.getElementById("email").value;
        const passwordLogin = document.getElementById("password").value;

        try {
            
            // Objeto de datos para enviar en la solicitud POST
            const data = { email: emailLogin, password: passwordLogin };

            // Realizar la solicitud utilizando fetch
            const response = await sendRequest("https://us-central1-proyecto-3-soa.cloudfunctions.net/backend/login", data);

            // Verificar el estado de la respuesta
            if (response && response.token) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("username", emailLogin);
                console.log("Inicio de sesión exitoso. Usuario:", emailLogin);

                alert("Inicio de sesión exitoso. Bienvenido " + emailLogin);

                if (emailLogin === "admin@mail.com") {
                    window.location.href = "/reservations_admin";
                } else {
                    window.location.href = "/";
                }
            } else {
                // Si la solicitud no fue exitosa, mostrar un mensaje de error
                console.error('Error en la solicitud:', response.statusText);
                alert('No está registrado: ' + response.statusText);
            }
        } catch (error) {
            // Manejar errores de red u otros errores
            console.error('Error:', error);
            alert('Error: ' + error.message);
        }
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
    });



// Función para cerrar ventanas emergentes
function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Función para validar el formato del correo electrónico
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}


document.getElementById("register-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const newUsername = document.getElementById("new-username").value;
    const newEmail = document.getElementById("new-email").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmNewPassword = document.getElementById("confirm-new-password").value;

    if (!validateEmail(newEmail)) {
        alert("Formato de correo electrónico no válido");
        return;
    }

    if (newPassword !== confirmNewPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    const data = { user: newUsername, email: newEmail, password: newPassword };
    const result = await sendRequest("https://us-central1-proyecto-3-soa.cloudfunctions.net/backend/register", data);

    if (result) {
        console.log("Registro exitoso:", result);
        alert("Registro exitoso");
        document.getElementById("register-popup").style.display = "none";
    }

    document.getElementById("new-username").value = "";
    document.getElementById("new-email").value = "";
    document.getElementById("new-password").value = "";
    document.getElementById("confirm-new-password").value = "";
});

document.getElementById("register-link").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("register-popup").style.display = "flex";
});

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
});

document.getElementById("forgot-password").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("forgot-password-popup").style.display = "flex";
});

document.getElementById("password-recovery-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const emailRecovery = document.getElementById("email_recovery").value;
    
   

    const data = { email: emailRecovery };
    const result = sendRequest("https://us-central1-proyecto-3-soa.cloudfunctions.net/backend/recovery", data);

    if (result) {
        console.log("Eliminación de cuenta exitosa:", result);
        alert("Se ha enviado un correo a ", emailRecovery);
        document.getElementById("forgot-password-popup").style.display = "none";
    }
    document.getElementById("delete-username").value = "";

});

document.getElementById("delete-link").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("delete-popup").style.display = "flex";
});

document.getElementById("delete-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const deleteUsername = document.getElementById("delete-username").value;
    const deleteEmail = document.getElementById("delete-email").value;
    const deletePassword = document.getElementById("delete-password").value;
    const confirmDeletePassword = document.getElementById("confirm-delete-password").value;

    if (deletePassword !== confirmDeletePassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    const data = { user: deleteUsername, email: deleteEmail, password: deletePassword };
    const result = sendRequest("https://us-central1-proyecto-3-soa.cloudfunctions.net/backend/remove", data);

    if (result) {
        console.log("Eliminación de cuenta exitosa:", result);
        alert("Cuenta eliminada exitosamente");
        document.getElementById("delete-popup").style.display = "none";
    }
    document.getElementById("delete-username").value = "";
    document.getElementById("delete-email").value = "";
    document.getElementById("delete-password").value = "";
    document.getElementById("confirm-delete-password").value = "";
});
