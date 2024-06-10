import json
from flask import jsonify, request
import functions_framework

# Función para cargar la base de datos desde el archivo JSON
def load_db():
    with open('db.json', 'r') as f:
        return json.load(f)

# Función para guardar la base de datos en el archivo JSON
def save_db(data):
    with open('db.json', 'w') as f:
        json.dump(data, f, indent=4)

# Función para obtener todas las horas disponibles
@functions_framework.http
def get_available_hours(request):
    db = load_db()
    return jsonify(db['semana'])