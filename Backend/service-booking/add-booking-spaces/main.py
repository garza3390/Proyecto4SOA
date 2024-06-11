import functions_framework
from google.cloud import firestore
from flask import jsonify

def add_spaces(request):
    # Inicializa el cliente de Firestore
    db = firestore.Client(project='proyecto-3-soa', database='booking-db')

    request_json = request.get_json()

    # Verifica si se proporcionaron los datos necesarios
    if not request_json:
        return jsonify({'error': 'No se proporcionaron datos en la solicitud.'}), 400

    user = request_json['user']
    email = request_json['email']
    hora = request_json['hora']
    dia = request_json['dia']
    mes =request_json['mes']
    anio = request_json['anio']
    numero_personas = request_json['numero_personas']
    estado = request_json['estado']

    try:
        # Agrega la entrada a la base de datos
        entry = db.collection('reservas').add(
            {
                'user': user,
                'email': email,
                'hora': hora,
                'dia': dia,
                'mes': mes,
                'anio': anio,
                'numero_personas': numero_personas,
                'estado': estado
            }
            )

        return jsonify({'message': 'Espacio registrado exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400