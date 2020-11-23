const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String },
  paymentInfo: {
    cardNumber: Number,
    endDate: Date
  }
});

module.exports = CustomerModel = mongoose.model(
  'CustomerModel',
  CustomerSchema
);
