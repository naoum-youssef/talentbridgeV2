// server/utils/validators.js

const { isEmail, isURL, isMobilePhone, isStrongPassword } = require('validator');
const mongoose = require('mongoose');

/**
 * Validate if the value is a valid email address.
 * @param {string} email
 * @returns {boolean}
 */
function validateEmail(email) {
  return isEmail(email);
}

/**
 * Validate if the value is a strong password.
 * @param {string} password
 * @returns {boolean}
 */
function validatePassword(password) {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol
  return isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
}

/**
 * Validate if the value is a valid MongoDB ObjectId.
 * @param {string} id
 * @returns {boolean}
 */
function validateObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

/**
 * Validate if the value is a valid phone number (international format).
 * @param {string} phone
 * @returns {boolean}
 */
function validatePhone(phone) {
  return isMobilePhone(phone, 'any');
}

/**
 * Validate if the value is a valid URL.
 * @param {string} url
 * @returns {boolean}
 */
function validateURL(url) {
  return isURL(url);
}

/**
 * Validate if the value is a non-empty string.
 * @param {string} str
 * @returns {boolean}
 */
function validateNonEmptyString(str) {
  return typeof str === 'string' && str.trim().length > 0;
}

module.exports = {
  validateEmail,
  validatePassword,
  validateObjectId,
  validatePhone,
  validateURL,
  validateNonEmptyString,
};