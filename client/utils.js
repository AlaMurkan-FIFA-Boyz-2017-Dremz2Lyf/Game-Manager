var axios = require('axios');


exports.getFirstUnplayed = function(games) {
  // reduce the games array down to one object, that object will have up to three keys.
    // Created, active, or disabled. Each key points to an array of games.
  var organizedGames = games.reduce(function(prevGame, currGame) {
    prevGame[currGame.status] ? prevGame[currGame.status].push(currGame) : prevGame[currGame.status] = [currGame];
    return prevGame;
  }, {});

  if (!organizedGames.created) {
    return null;
  }

  // Then we take the first game from the active list (if we have one), otherwise we take the first game from the Created list
  var firstUnplayed = organizedGames.active ? organizedGames.active[0] : organizedGames.created[0] || null;

  return firstUnplayed;
};

exports.getAllPlayers = function(state) {
    // axios rocks and makes nice promise based calls to the server for us.
  return axios.get('/api/player')
      .then(function(playerData) {
        var tourneyPlayerIds = state.tourneyPlayersList.map(function(tourneyPlayer) {
          return tourneyPlayer.id; //Returns a list of players already in the tourney
        });
        var notAdded = playerData.data.filter(function(player) {
          return tourneyPlayerIds.indexOf(player.id) === -1; //Returns a list of players not in the tourney from the db
        });

        return notAdded;
      })
      .catch(function(err) {
        // Handle any errors here.
        console.log('Error in getting players from the DB:', err);
      });
};

// This function makes a call for all tournaments from the server and adds them to the state.
exports.getOngoingTournaments = function() {
  return axios.get('/api/tournaments')
    .catch(function(err) {
      // Handle any errors here
      console.log('Error in getting tourneys from the DB', err);
    });
};

exports.updateGameStatus = function(toBeActive, currentActive) {
  return Promise.all([
    axios.put('/api/games', toBeActive),
    axios.put('/api/games', currentActive)
  ]);
};


exports.getGamesByTourneyId = function(tourneyId) {
  return axios.get('/api/games', {
    params: {
      tournament_id: tourneyId
    }
  }).then(function(response) {
    console.log(response, 'response in getGamesByTourneyId');
    // Then if the games post and get were successful, we set currentTournament to true,
      // and add the array of game objects to the state.
    var games = response.data;
    var nextGame = exports.getFirstUnplayed(games);
    if (nextGame) {
      nextGame.status = 'active';
    }
    return {games: games, nextGame: nextGame};
  }).catch(err => {
    return err;
  });
};
