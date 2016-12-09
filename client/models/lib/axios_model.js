const axios = require('axios');
const Promise = require('bluebird');

exports.create = function(url) {
  let Model;

  if (typeof url !== 'string') {
    return {name: 'Invalid Argument', message: 'Route must be a string'}
  }

  const methods = {

    all: function() {
      return axios.get(url)
    },

    create: function(attrs) {
      return axios.post(url, attrs)
    },

    findBy: function(attrs) {
      return axios.get(url, attrs)
    },

    updateOne: function(attrs) {
      return axios.put(url, attrs)
    }

  }

  Model = Object.create(methods)
  Model.methods = methods

  return Model
}
