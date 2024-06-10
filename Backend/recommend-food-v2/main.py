import flask
import json

def formaResponseList2(type1,type2,list):

    allValues = ["Plato Principal", "Bebida", "Postre"]

    if type1 == "maindishes":
        type1 = "Plato Principal"
    elif type1 == "drinks":
        type1 = "Bebida"
    elif type1 == "desserts":
        type1 = "Postre"

    if type2 == "maindishes":
        type2 = "Plato Principal"
    elif type2 == "drinks":
        type2 = "Bebida"
    elif type2 == "desserts":
        type2 = "Postre"

    allValues.remove(type1)
    allValues.remove(type2)

    dic = {}

    dic[type1] = list[0]
    dic[type2] = list[1]
    dic[allValues[0]] = list[2]

    return dic

def rec_function2(request: flask.Request) -> flask.Response:
    
    # Obtener parámetros de la URL
    
    value1 = request.args.get('value1')
    value2 = request.args.get('value2')
    value1 = value1.lower()
    value2 = value2.lower()

    try:
        # Abrir el archivo db.json y cargar su contenido
        with open("db.json", 'r') as file:
            
            data = json.load(file)
        file.close()

        
        type1 = None
        type2 = None

        mainDishes = data["maindishes"]
        drinks = data["drinks"]
        desserts = data["desserts"]

        mainDishesList = list(mainDishes.keys())
        drinksList = list(drinks.keys())
        dessertsList = list(desserts.keys())

        mainFoodKeys = mainDishesList + drinksList + dessertsList

        if value1 not in mainFoodKeys or value2 not in mainFoodKeys:
          response = "No ofrecemos recomendaciones para esa solicitud"
          return flask.Response(response, status = 400, mimetype="text/plain")
            
        

        if value1 in mainDishesList:
            type1 = "maindishes"
        elif value1 in drinksList:
            type1 = "drinks"
        elif value1 in dessertsList:
            type1 = "desserts"

        if value2 in mainDishesList:
            type2 = "maindishes"
        elif value2 in drinksList:
            type2 = "drinks"
        elif value2 in dessertsList:
            type2 = "desserts"

        if type1 == None:
          response = "No poseemos el primer platillo"
          return flask.Response(response,status = 400, mimetype="text/plain")
          
        if type2 == None:
          response = "No poseemos el segundo platillo"
          return flask.Response(response,status = 400, mimetype="text/plain")
          

        try:
            servRec1 = data[type1][value1]["combination"]
            servRec2 = data[type2][value2]["combination"]
            serviceRecommendation = []
            canCombinate = False
            for r in servRec1:
                if r in servRec2 and r.lower() != value1 and r.lower() != value2:
                    canCombinate = True
                    serviceRecommendation = [value1.capitalize(),value2.capitalize(),r]
                    serviceRecommendation = formaResponseList2(type1,type2,serviceRecommendation)
                    
                    
                    break
            if not canCombinate:
              response = "No encontramos una recomendación de acuerdo a esas dos entradas"
              return flask.Response(response,status = 400, mimetype="text/plain")
              
            return flask.jsonify(serviceRecommendation)
            # return flask.Response(serviceRecommendation, mimetype="text/plain")
            
        
        except:
          response = "No encontramos respuesta a esa solicitud"
          return flask.Response(response,status = 400, mimetype="text/plain")
          
    except FileNotFoundError:

        response = "El archivo db.json no fue encontrado."
        return flask.Response(response,status = 400, mimetype="text/plain")

    except json.JSONDecodeError:

        response = "El archivo db.json contiene datos inválidos en formato JSON."
        return flask.Response(response,status = 400, mimetype="text/plain")

