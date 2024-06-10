import functions_framework
from google.cloud import firestore
from firebase_admin import auth, initialize_app
from flask import jsonify

initialize_app()

# Inicializa el cliente de Firestore
db = firestore.Client(project='proyecto-3-soa', database='authentication-db')

@functions_framework.http
def delete_account(request):
    request_json = request.get_json()

    # Verifica si se proporcionaron los datos necesarios
    if not request_json:
        return jsonify({'error': 'No se proporcionaron datos en la solicitud.'}), 400

    nickname = request_json['user']
    email = request_json['email']
    password = request_json['password']

    try:
        # Busca el usuario por su email en la colección de usuarios de Firestore
        query = db.collection('users').where('email', '==', email).limit(1).get()

        # Verifica si se encontró algún usuario con ese email
        if len(query) > 0:
            user_doc = query[0]
            # Obtiene la referencia al documento del usuario
            user_ref = db.collection('users').document(user_doc.id)
            # Elimina el usuario de Firebase Authentication
            user = auth.get_user_by_email(email)
            auth.delete_user(user.uid)
            # Elimina el documento del usuario de Firestore
            user_ref.delete()
        
        return jsonify({'message': 'Cuenta eliminada exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400