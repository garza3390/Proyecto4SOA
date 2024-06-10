import functions_framework
from flask import jsonify
import requests

@functions_framework.http
def login_user(request):
    request_json = request.get_json()
    email = request_json['email']
    password = request_json['password']

    # URL de la solicitud de inicio de sesión
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvPxGCNc-2uu7i8Bjj5xXQgCxtyPPCwdw'

    # Cuerpo de la solicitud de inicio de sesión
    data = {
        'email': email,
        'password': password,
        'returnSecureToken': True
    }

    try:
        # Realizar la solicitud POST para iniciar sesión
        response = requests.post(url, json=data)

        # Verificar si la solicitud fue exitosa
        if response.status_code == 200:
            # Extraer el token de autenticación del cuerpo de la respuesta
            auth_token = response.json()['idToken']
            return jsonify({'message': 'Inicio de sesion exitoso'}), 200
        else:
            # Si la solicitud no fue exitosa, imprimir el mensaje de error
            return jsonify({'error': 'Contraseña incorrecta'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 401