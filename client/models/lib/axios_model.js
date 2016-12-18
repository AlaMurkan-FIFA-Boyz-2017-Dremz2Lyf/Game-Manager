const axios = require('axios');

exports.create = function(route) {
  let Model = {};

  if (typeof route !== 'string') {
    throw new TypeError('Route must be a string', 'axios_model.js', 8)
  }

  const methods = {

    all: function() {
      return axios.get(route).then(res => {
        return res.data
      })
    },

    create: function(attrs) {
      return axios.post(route, attrs)
    },

    findById: function(attrs) {
      if (!!attrs.id && (typeof attrs.id === 'number' || Array.isArray(attrs.id))) {
        return axios.get(route, attrs)
      } else {
        throw new TypeError('findById requires an argument of an object with an id key. It\'s value may be a string or an array of IDs ', 'axios_model.js', 26)
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
