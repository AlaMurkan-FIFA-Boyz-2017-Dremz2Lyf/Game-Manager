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
      console.log(games);
    })
    .catch(function(err) {
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
