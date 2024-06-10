import functions_framework
from google.cloud import firestore
from flask import jsonify

def update_booking(request):
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

    try:
        # Construye la consulta
        query = db.collection('reservas')

        # Agrega cada condición a la consulta si el valor no es nulo
        if hora:
            query = query.where('hora', '==', hora)
        if dia:
            query = query.where('dia', '==', dia)
        if mes:
            query = query.where('mes', '==', mes)
        if anio:
            query = query.where('anio', '==', anio)

        # Limita los resultados a 1
        query = query.limit(1)

        # Ejecuta la consulta
        result = query.get()

        # Verifica si se encontró algún documento
        if not result:
            return jsonify({'error': 'Reserva no encontrada.'}), 404

        # Obtiene el primer documento encontrado
        reserva_doc = result[0]

        # Verifica el estado del documento
        estado_reserva = reserva_doc.get('estado')

        # Obtiene la referencia al documento de la reserva
        reserva_ref = db.collection('reservas').document(reserva_doc.id)

        # Modifica los datos de la reserva en Firestore
        reserva_ref.update({
                'user': user,
                'email': email,
                'hora': hora,
                'dia': dia,
                'mes': mes,
                'anio': anio,
                'numero_personas': numero_personas,
                'estado': "Reservado"
            })

        return jsonify({'message': 'El espacio de reserva ha sido actualizado.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400