const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  customer_id: { type: String, required: true },
  guests_ids: { type: Array },
  flight_id: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  extraBaggage: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  totalPayment: { type: Number, required: true }
});

module.exports = RecordModel = mongoose.model('RecordModel', RecordSchema);
