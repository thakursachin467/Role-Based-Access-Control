const validator = require('validator');
const _ = require('lodash');

module.exports = function validateLoginUser(data) {
    let errors = {};

    data.email = !_.isEmpty(data.email) ? data.email : '';
    data.password = !_.isEmpty(data.password) ? data.password : '';


    if (!validator.isEmail(data.email)) {
        errors.email = 'Please enter a valid email';
    }
    if (validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password is Incorrect';
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
};