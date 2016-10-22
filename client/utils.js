var axios = require('axios');


exports.setGameStatus = function(game, isCurrent) {
  return axios.put('/api/game/currentGame', {game: game, current: isCurrent}).then(function(res) {
    return res;
  }).catch(function(err) {
    console.log('error in client utils:', err);
  });
};
