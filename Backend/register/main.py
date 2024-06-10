import functions_framework
from google.cloud import firestore
from firebase_admin import auth, initialize_app
from flask import jsonify

initialize_app()

# Inicializa el cliente de Firestore
db = firestore.Client(project='proyecto-3-soa', database='authentication-db')

@functions_framework.http
def register_user(request):
    request_json = request.get_json()

    # Verifica si se proporcionaron los datos necesarios
    if not request_json:
        return jsonify({'error': 'No se proporcionaron datos en la solicitud.'}), 400

    nickname = request_json['user']
    email = request_json['email']
    password = request_json['password']

    try:
        user = auth.create_user(
            email=email,
            password=password
        )

        # Realiza una consulta en la colección de usuarios para buscar un documento con el username proporcionado
        query = db.collection('users').where('email', '==', email).limit(1).get()

        if not query:
            # Agrega la entrada a la base de datos
            entry = db.collection('users').add(
                {
                    'user': nickname,
                    'email': email
                }
                )

        return jsonify({'message': 'Usuario registrado exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400