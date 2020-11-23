const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateGetRequset(data) {
  let errors = {};
  data.date = !isEmpty(data.date) ? data.date : '';
  //validating our date
  if (Validator.isEmpty(data.date)) {
    errors.date = 'Date field is required';
  } else if (!Validator.isDate(data.date)) {
    errors.date = 'Date is invalid';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
