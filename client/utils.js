var axios = require('axios');


exports.setGameStatus = function(game, isCurrent) {
  axios.put('/api/games/currentGame', {game: game, current: isCurrent}).then(function(res) {
    console.log(res, 'good things?');
  }).catch(function(err) {
    console.log('error in client utils:', err);
  });
  return game;
};
