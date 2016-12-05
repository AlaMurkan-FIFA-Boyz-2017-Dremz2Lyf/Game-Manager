const axios = require('axios');
const Promise = require('bluebird');

exports.create = function(modelName) {
  let Model;
  let route = `api/${modelName}`;

  methods = {
    all: function() {
      return axios.get(route)
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
