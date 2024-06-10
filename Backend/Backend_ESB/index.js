const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

/*
app.use((req, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'"
    );
    next();
  });
*/

// Ruta para obtener el horario
app.get('/horario', (req, res) => {
    try {
        // URL de la cloud function que proporciona el horario
        const functionUrl = 'https://us-central1-proyecto-3-soa.cloudfunctions.net/get-all-bookings-function';

        // Realizar la solicitud HTTP a la cloud function
        fetch(functionUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error al obtener el horario. Código de estado: ${response.status}`);
                }
            })
            .then(data => {
                // Devolver los datos del horario como respuesta JSON
                res.json(data);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error al obtener el horario' });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el horario' });
    }
});

// Ruta para agregar una reserva
app.post('/post-horario', (req, res) => {
    try {
        const { user, email, hora, dia, mes, anio, numero_personas } = req.body;

        if (!user || !email || !hora || !dia || !mes || !anio || !numero_personas) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const functionUrl = 'https://us-central1-proyecto-3-soa.cloudfunctions.net/booking-function';

        fetch(functionUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, email, hora, dia, mes, anio, numero_personas })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Error al agregar la reserva. Código de estado: ${response.status}`);
            }
        })
        .then(data => res.json(data))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar la reserva' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar la reserva' });
    }
});

// Ruta para actualizar una reserva
app.put('/put-horario', (req, res) => {
    try {
        const { user, email, hora, dia, mes, anio, numero_personas } = req.body;

        if (!user || !email || !hora || !dia || !mes || !anio || !numero_personas) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const functionUrl = 'https://us-central1-proyecto-3-soa.cloudfunctions.net/update-booking-function';

        fetch(functionUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, email, hora, dia, mes, anio, numero_personas })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Error al actualizar la reserva. Código de estado: ${response.status}`);
            }
        })
        .then(data => res.json(data))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar la reserva' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la reserva' });
    }
});

// Ruta para eliminar una reserva
app.delete('/delete-horario', (req, res) => {
    try {
        const { user, email, hora, dia, mes, anio } = req.body;

        if (!user || !email || !hora || !dia || !mes || !anio) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const functionUrl = 'https://us-central1-proyecto-3-soa.cloudfunctions.net/delete-booking-function';

        fetch(functionUrl, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, email, hora, dia, mes, anio })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Error al eliminar la reserva. Código de estado: ${response.status}`);
            }
        })
        .then(data => res.json(data))
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar la reserva' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la reserva' });
    }
});
app.get('/menu', (req, res) => {
    try {
        // URL de la cloud function que proporciona el horario
        const functionUrl = 'https://us-central1-frontend-cloud-function.cloudfunctions.net/function-1';

        // Realizar la solicitud HTTP a la cloud function
        fetch(functionUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error al obtener el menu. Código de estado: ${response.status}`);
                }
            })
            .then(data => {
                // Devolver los datos del horario como respuesta JSON
                res.json(data);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error al obtener el menu' });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el menu' });
    }
});

// Ruta para obtener recomendaciones de comida (versión 1)
app.get('/comida1', async (req, res) => {
    try {
        const value1 = req.query.value1;
        const value2 = req.query.value2;

        if (!value1 || !value2) {
            return res.status(400).json({ error: 'Debes proporcionar dos comidas.' });
        }

        const functionUrl = `https://us-central1-proyecto-3-soa.cloudfunctions.net/recommend_food_v2?value1=${value1}&value2=${value2}`;

        const response = await fetch(functionUrl);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener recomendaciones de comida (v1)' });
    }
});

// Ruta para obtener recomendaciones de comida (versión 2)
app.get('/comida2', async (req, res) => {
    try {
        const type = req.query.type;
        const value = req.query.value;

        if (!type || !value) {
            return res.status(400).json({ error: 'Debes proporcionar un tipo y un valor.' });
        }
    
        const functionUrl = `https://us-central1-proyecto-3-soa.cloudfunctions.net/recommend_food_v1?type=${type}&value=${value}`;

        const response = await fetch(functionUrl);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener recomendaciones de comida (v2)' });
    }
});

app.post('/feedback', async (req, res) => {
    try {
        // Obtén el texto del cuerpo de la solicitud
        const text = req.body.text;

        if (!text) {
            return res.status(400).json({ error: 'Debes proporcionar un texto para analizar el sentimiento.' });
        }

        const functionUrl = 'https://us-central1-proyecto-3-soa.cloudfunctions.net/feedback-feelings-function';

        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });

        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            throw new Error(`Error al obtener sentimiento. Código de estado: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el sentimiento' });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { user, email, password } = req.body;

        if (!user || !email || !password) {
            return res.status(400).json({ error: 'Debes proporcionar un usuario, email y contraseña.' });
        }

        const functionUrl = 'https://us-central1-proyecto-3-soa.cloudfunctions.net/register-function';

        const requestData = {
            user: user,
            email: email,
            password: password
        };

        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al realizar registro' });
    }
});

// Ruta para el inicio de sesión
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Debes proporcionar un email y una contraseña.' });
        }

        const functionUrl = 'https://us-central1-proyecto-3-soa.cloudfunctions.net/login-function';
        const requestData = { 
            email: email, 
            password:password 
        };

        
        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });
        

        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            const errorText = await response.text(); // Obtener el texto del error para más detalles
            console.error(`Error al realizar inicio de sesión. Código de estado: ${response.status}, mensaje: ${errorText}`);
            res.status(response.status).json({ error: 'Error al realizar inicio de sesión', details: errorText });
        }
    } catch (error) {
        console.error('Detalles del error de inicio de sesión:', error.message);
        res.status(500).json({ error: 'Error al realizar inicio de sesión' });
    }
});

// Ruta para eliminar cuenta
app.post('/remove', async (req, res) => {
    try {
        const { user, email, password } = req.body;

        if (!user || !email || !password) {
            return res.status(400).json({ error: 'Debes proporcionar un usuario, email y contraseña.' });
        }

        const functionUrl = 'https://us-central1-proyecto-3-soa.cloudfunctions.net/remove-account-function';

        const requestData = {
            user: user,
            email: email,
            password: password
        };

        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la cuenta' });
    }
});

// Ruta para recuperar cuenta
app.post('/recovery', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Debes proporcionar un usuario, email y contraseña.' });
        }

        const functionUrl = 'https://us-central1-proyecto-3-soa.cloudfunctions.net/reset-password-function';

        const requestData = {
            email: email
        };

        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al recuperar la cuenta' });
    }
});


app.get('/', (req, res) => {
    res.send('Backend running');
  });

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
