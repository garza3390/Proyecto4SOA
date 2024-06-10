import functions_framework
from google.cloud import firestore
from flask import jsonify

# Inicializa el cliente de Firestore
db = firestore.Client(project='proyecto-3-soa', database='authentication-db')

@functions_framework.http
def db_manager(request):
    # Obtén los datos de la solicitud
    request_json = request.get_json()

    # Verifica si se proporcionaron los datos necesarios
    if not request_json:
        return jsonify({'error': 'No se proporcionaron datos en la solicitud.'}), 400

    # Extrae los datos de la solicitud
    name = request_json['name']
    last_name = request_json['last_name']
    nickname = request_json['nickname']

    try:
        # Agrega la entrada a la base de datos
        # En este ejemplo, asumimos que tienes una colección llamada 'entries' en tu base de datos
        # y que cada entrada tiene un campo 'content'
        user = db.collection('users').add(
            {
                'name': name,
                'last_name': last_name,
                'nickname': nickname
            }
            )
        
        # Devuelve la ID de la entrada recién creada en la respuesta
        return jsonify({'message': 'Entrada agregada correctamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500