const path = require('path');

class MainController {
  constructor() {}

  getIndex(req, res) {
    res.sendFile(path.resolve(__dirname, '../views/index.html'));
  }

  getLogin(req, res) {
    res.sendFile(path.resolve(__dirname, '../views/login.html'));
  }

  getMenu(req, res) {
    res.sendFile(path.resolve(__dirname, '../views/menu.html'));
  }

  getRecomendation(req, res) {
    res.sendFile(path.resolve(__dirname, '../views/recomendation.html'));
  }

  getReservation(req, res) {
    res.sendFile(path.resolve(__dirname, '../views/reservations.html'));
  }

  getReservation_admin(req, res) {
    res.sendFile(path.resolve(__dirname, '../views/reservations_admin.html'));
  }

  getFeedback(req, res) {
    res.sendFile(path.resolve(__dirname, '../views/feedback.html'));
  }
}

module.exports = MainController;