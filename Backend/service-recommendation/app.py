from flask import Flask, request
from recommend-food-v1.main import rec_function1
from recommend-food-v2.main import rec_function2

app = Flask(__name__)
@app.route('/rec_function1', methods=['GET'])
def rec_function1():
    return rec_function1(request)

@app.route('/rec_function2', methods=['GET'])
def rec_function2():
    return rec_function2(request)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
