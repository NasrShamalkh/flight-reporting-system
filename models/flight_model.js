const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  type: { type: String, required: true },
  vehicle: { type: String, required: true },
  pilot: { type: String, required: true }
});

module.exports = FlightModel = mongoose.model('FlightModel', FlightSchema);
