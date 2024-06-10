const express = require('express');
const app = express();

app.use('/frontend', express.static(__dirname + '/views'));

const MainController = require('./controllers/mainController');

const mainController = new MainController();

app.get('/', mainController.getIndex.bind(mainController));
app.get('/login', mainController.getLogin.bind(mainController));
app.get("/menu", mainController.getMenu.bind(mainController));
app.get("/recomendation", mainController.getRecomendation.bind(mainController));
app.get("/reservations", mainController.getReservation.bind(mainController));
app.get("/reservations_admin", mainController.getReservation_admin.bind(mainController));
app.get("/feedback", mainController.getFeedback.bind(mainController));

exports.begin = app;

