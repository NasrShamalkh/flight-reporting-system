const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true }
});

module.exports = GuestModel = mongoose.model('GuestModel', GuestSchema);
