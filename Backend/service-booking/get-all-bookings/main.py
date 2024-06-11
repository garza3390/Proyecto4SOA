import functions_framework
from google.cloud import firestore
from flask import jsonify

def get_all_bookings(request):
    # Inicializa el cliente de Firestore
    db = firestore.Client(project='proyecto-3-soa', database='booking-db')

    try:
        # Realiza la consulta para obtener todos los documentos en la colección 'reservas'
        query = db.collection('reservas').get()

        # Lista para almacenar los resultados
        bookings = []

        # Itera sobre los documentos obtenidos y los agrega a la lista
        for doc in query:
            bookings.append(doc.to_dict())

        return jsonify({'bookings': bookings}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
