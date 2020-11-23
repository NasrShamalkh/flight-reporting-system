const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String },
  pymentInfo: {
    cardNumber: Number,
    endDate: String
  }
});

module.exports = CustomerModel = mongoose.model(
  'CustomerModel',
  CustomerSchema
);
