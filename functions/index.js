const functions = require('firebase-functions');
const admin = require('firebase-admin');

const getFormStructure = require('./getFormStructure');
const saveFormData = require('./saveFormData');

admin.initializeApp(functions.config().firebase);

module.exports = {
  getFormStructure,
  saveFormData,
};
