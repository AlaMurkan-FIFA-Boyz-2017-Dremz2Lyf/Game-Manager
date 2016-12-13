const axios = require('axios');

exports.create = function(route) {
  let Model = {};

  if (typeof route !== 'string') {
    throw new TypeError('Route must be a string', 'axios_model.js', 8)
  }

  const methods = {

    all: function() {
      return axios.get(route)
    },

    create: function(attrs) {
      return axios.post(route, attrs)
    },

    findById: function(attrs) {
      if (!!attrs.id && typeof attrs.id === 'number' ) {
        return axios.get(route, attrs)
      } else {
        throw new TypeError('Must pass an id and it must be a number', 'axios_model.js', 22)
      }
    },

    updateOne: function(attrs) {
      return axios.put(route, attrs)
    }

  }

  Model = Object.create(methods);

  Model.route = route;

  Model.methods = methods;


  return Model;
}
