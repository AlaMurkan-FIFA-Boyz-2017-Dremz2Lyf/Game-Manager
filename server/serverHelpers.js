var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite3'
  }
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

  //

  return games;
};

exports.getTable = function(tourneyId) {
// Output:
// {
//   playerId:
//   gp:
//   won:
//   loss:
//   draw:
//   gd
// }

// Input:
// Games and players

// Created Players Array
knex('players')
.orderBy('id', 'asc')
.then(function(data, callback) {
  var playersArray = data.map(function(item) {
    return {
      id: item.id,
      wins: 0,
      losses: 0,
      draws: 0,
      gp: 0,
      gd: 0
    }
  })
});




  // if (tourneyId) {
  //   knex('games')
  //   .where('tournament_id', tourneyId)
  //   .then(function(data) {
  //     console.log(data);
  //   })
  // }

};
