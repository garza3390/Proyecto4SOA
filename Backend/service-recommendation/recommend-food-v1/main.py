import flask
import json

def formaResponseList(type,list):
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

def rec_function1(request: flask.Request) -> flask.Response:
    
    # Obtener parámetros de la URL
    
    type = request.args.get('type')
    value = request.args.get('value')
    type = type.lower()
    value = value.lower()

    try:
        # Abrir el archivo db.json y cargar su contenido
        with open("db.json", 'r') as file:
            
            data = json.load(file)
        file.close()

        
        if type not in ["maindishes","drinks","desserts"]:
            response = 'Ese tipo de entrada no existe'
            return flask.Response(response,status=400, mimetype="text/plain")
            


        mainDishes = data["maindishes"]
        drinks = data["drinks"]
        desserts = data["desserts"]

        mainFoodKeys = list(mainDishes.keys()) + list(drinks.keys()) + list(desserts.keys())

        if value not in mainFoodKeys:
            response = 'No ofrecemos recomendaciones para esa solicitud'
            return flask.Response(response, status = 400, mimetype="text/plain")
            
    
        try:
            serviceRecommendation = data[type][value]["combination"] + [value.capitalize()]
            serviceRecommendation = formaResponseList(type,serviceRecommendation)
        
            # return HttpResponse(serviceRecommendation, content_type='application/json')
            return flask.jsonify(serviceRecommendation)

            # return flask.Response(serviceRecommendation, mimetype="text/plain")
    
        except:
            response = 'Parece que estas combinando mal el tipo y el plato'
            return flask.Response(serviceRecommendation, status = 400, mimetype="text/plain")
            
        
    except FileNotFoundError:

        response = "El archivo db.json no fue encontrado."
        return flask.Response(response, status = 400, mimetype="text/plain")

    except json.JSONDecodeError:

        response = "El archivo db.json contiene datos inválidos en formato JSON."
        return flask.Response(response, status = 400, mimetype="text/plain")