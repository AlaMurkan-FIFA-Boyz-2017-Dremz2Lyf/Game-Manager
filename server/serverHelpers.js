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
      var gameObj = {};
      gameObj.player1_id;
    });


  }

  //

  return games;
};
