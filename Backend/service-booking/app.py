from flask import Flask, request
from booking_function.main import booking
from delete_booking.main import delete_booking
from get_all_bookings.main import get_all_bookings
from update_booking.main import update_booking

app = Flask(__name__)
@app.route('/add-booking', methods=['POST'])
def add_booking_route():
    return add_booking(request)

@app.route('/booking', methods=['POST'])
def booking_route():
    return booking(request)

@app.route('/delete-booking', methods=['POST'])
def delete_booking_route():
    return delete_booking(request)

@app.route('/get-all-bookings', methods=['GET'])
def get_all_bookings_route():
    return get_all_bookings(request)

@app.route('/update-booking', methods=['POST'])
def update_booking_route():
    return update_booking(request)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
