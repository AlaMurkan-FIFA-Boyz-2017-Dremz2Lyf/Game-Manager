const axios = require('axios');
const Promise = require('bluebird');

exports.create = function(modelName, baseurl) {
  let Model;
  let route = `${baseurl}api/${modelName}`;

  const methods = {

    all: function() {
      return axios.get(route)
    },

    create: function(attrs) {
      return axios.post(route, attrs)
    },

    findBy: function(attrs) {
      return axios.get(route, attrs)
    },

    updateOne: function(attrs) {
      return axios.put(route, attrs)
    }

  }

  Model = Object.create(methods)
  Model.methods = methods

  Model.InvalidArgument = class InvalidArgument extends Error {
    constructor(message) {
      super(`${modelName}: ${message}`)
      this.type = `invalid_argument`
      this.meta = { model: modelName }
    }
  }

  return Model
}
