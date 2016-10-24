var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite3'
  },
  useNullAsDefault: true
});

exports.createGamesForTourney = function(tourneyId, playersInTourneyList) {
  // games array will be returned by this function
  var games = [];

  // while there is more than one player in the tourneyPlayersList,
  while (playersInTourneyList.length > 1) {

    // shift the first item off and hold it with our nextPlayer variable
    var nextPlayer = playersInTourneyList.shift();

    // then forEach player left in there, create a game with the nextPlayer
      // and push that game into the games array
    playersInTourneyList.forEach(function(playerObj) {

      // this will be the object pushed into the games array
      var gameObj = {};

      // set the needed values for the game object
      gameObj.player1_id = nextPlayer.id;
      gameObj.player2_id = playerObj.id;
      gameObj.tournament_id = tourneyId;

      // push into the games array
      games.push(gameObj);
    });
  }
  return games;
};

exports.getTable = function(tourneyId) {

  return knex('games').where('tournament_id', tourneyId)
    .then(function(games) {

      var standingsObj = games.reduce(function(standings, currGame) {
        // collect the player ids for this game
        var p1 = currGame.player1_id;
        var p2 = currGame.player2_id;

        // If player 1 and player 2 already have keys on the standings object, increment their games played.
          // Otherwise create the new stats object and count the first game.
        standings[p1] ? standings[p1].gp++ : standings[p1] = {gp: 1, win: 0, loss: 0, draw: 0, gd: 0, points: 0};
        standings[p2] ? standings[p2].gp++ : standings[p2] = {gp: 1, win: 0, loss: 0, draw: 0, gd: 0, points: 0};

        // Collect the scores for each player for this game.
        var p1Score = currGame.player1_score;
        var p2Score = currGame.player2_score;

        // Using Math.abs gives us a positive number always, we add this to the winner's Goal Differential,
          // and subtract it from the loser's GD
        var goalDiff = Math.abs(p1Score - p2Score);

        // This monstrosity of a nested ternary operation handles the accumulation of points and wins/losses/draws
          // First it checks if the game was a draw, if it was we have all the info we need to finish setting everything.
        p1Score === p2Score ? (
          standings[p1].draw++, standings[p2].draw++, standings[p1].points += 1, standings[p2].points += 1
          // If the game wasn't a draw, we go about finding a winner and setting the data we need.
        ) : p1Score > p2Score ? (
          standings[p1].win++, standings[p2].loss++, standings[p1].points += 3, standings[p1].gd += goalDiff, standings[p2].gd -= goalDiff
        ) : (
          standings[p2].win++, standings[p1].loss++, standings[p2].points += 3, standings[p1].gd -= goalDiff, standings[p2].gd += goalDiff
        );

        return standings;
      }, {});

      var standingsArray = [];
      for (key in standingsObj) {
        standingsObj[key].playerId = key;
        standingsArray.push(
          standingsObj[key]
        );
      }
      return standingsArray;
    }).catch(function(err) {
      throw err;
    });
};

exports.setGameStatus = function(req, res) {

  // create the object to pass into the knex update
  var updateStatus = {};

  // The 'current' key on the body will be a boolean. True means set to active, false means set back to created.
  req.body.current ? updateStatus.status = 'active' : updateStatus.status = 'created';

  // Query the database for the correct game, and update it with the object we made above.
  knex('games').where('id', req.body.game.id).update(updateStatus).then(function(response) {
    res.status(201);
  }).catch(function(err) {
    res.status(500).send('err', err);
    console.log('Error getting game with id of:' + req.body.game.id, err);
  });
};
