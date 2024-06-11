from flask import Flask, request, jsonify, Response
import json

app = Flask(__name__)

def formaResponseList(type, list):
    dic = {}
    if type == "maindishes":
        dic["Plato Principal"] = list[2]
        dic["Bebida"] = list[0]
        dic["Postre"] = list[1]
    elif type == "drinks":
        dic["Plato Principal"] = list[0]
        dic["Bebida"] = list[2]
        dic["Postre"] = list[1]
    elif type == "desserts":
        dic["Plato Principal"] = list[0]
        dic["Bebida"] = list[1]
        dic["Postre"] = list[2]
    return dic

@app.route('/recommendation', methods=['GET'])
def rec_function1():
    type = request.args.get('type')
    value = request.args.get('value')
    if not type or not value:
        return Response('Faltan parámetros en la solicitud', status=400, mimetype="text/plain")

    type = type.lower()
    value = value.lower()

    try:
        with open("db.json", 'r') as file:
            data = json.load(file)
        
        if type not in ["maindishes", "drinks", "desserts"]:
            return Response('Ese tipo de entrada no existe', status=400, mimetype="text/plain")

        mainDishes = data["maindishes"]
        drinks = data["drinks"]
        desserts = data["desserts"]

        mainFoodKeys = list(mainDishes.keys()) + list(drinks.keys()) + list(desserts.keys())

        if value not in mainFoodKeys:
            return Response('No ofrecemos recomendaciones para esa solicitud', status=400, mimetype="text/plain")

        try:
            serviceRecommendation = data[type][value]["combination"] + [value.capitalize()]
            serviceRecommendation = formaResponseList(type, serviceRecommendation)
            return jsonify(serviceRecommendation)
        except KeyError:
            return Response('Parece que estas combinando mal el tipo y el plato', status=400, mimetype="text/plain")

    except FileNotFoundError:
        return Response("El archivo db.json no fue encontrado.", status=400, mimetype="text/plain")
    except json.JSONDecodeError:
        return Response("El archivo db.json contiene datos inválidos en formato JSON.", status=400, mimetype="text/plain")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
