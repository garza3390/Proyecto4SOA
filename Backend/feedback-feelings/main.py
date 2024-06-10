import flask
import json
from google.cloud import language_v1

def feedback_feelings_function(request: flask.Request) -> flask.Response:
  # Obtener parámetros de la URL
  request_json = request.get_json()

  if request_json and 'text' in request_json:
	  text = request_json['text'].lower()
  else:
	  return flask.jsonify({"error": "No text provided"}), 400

  client = language_v1.LanguageServiceClient()

  # Available types: PLAIN_TEXT, HTML
  document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)

  response = client.analyze_sentiment(document=document)

  # Get overall sentiment of the input document

  score = response.document_sentiment.score if hasattr(response.document_sentiment, 'score') else None
  magnitude = response.document_sentiment.magnitude if hasattr(response.document_sentiment, 'magnitude') else None
  
  emocion = ""

  if score < -0.70:
    emocion = "Molesto"
  elif score < -0.20 and score > -0.70:
    emocion = "Triste"
  elif score < 0.20 and score > -0.20:
    emocion = "Serio"
  elif score < 0.70 and score > 0.20:
    emocion = "Comodo"
  else:
    emocion = "Feliz"

  dir_response = {
    "emocion": emocion,
    "score": score
  } 

  return flask.jsonify(dir_response)