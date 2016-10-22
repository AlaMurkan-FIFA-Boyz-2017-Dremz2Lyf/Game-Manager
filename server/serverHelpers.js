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

knex('players')
.orderBy('id', 'asc')
.then(function(data) {
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

  knex('games')
  .then(function(data) {
    data.forEach(function(item) {
    var diff = Math.abs(item.player1_score - item.player2_score);
    var winner;
    var loser;
    var draw1;
    var draw2;
    
    if(item.player1_score === item.player2_score) {
        draw1 = item.player1_id;
        draw2 = item.player2_id;
        
        playersArray.forEach(function(item) {
            if(item.id === draw1 || item.id === draw2) {
                item.draws += 1;
                item.gp += 1;
            }
        }) 
    }
    else if(item.player1_score > item.player2_score) {
        winner = item.player1_id;
        loser = item.player2_id;
        
        playersArray.forEach(function(item) {
            if(item.id === winner) {
                item.wins++;
                item.gp++;
                item.gd += diff;
            } 
            if(item.id === loser) {
                item.losses++;
                item.gp++;
                item.gd -= diff;
            }
            
        })
        
    } else {
        winner = item.player2_id;
        loser = item.player1_id;
        
        playersArray.forEach(function(item) {
            if(item.id === winner) {
                item.wins++;
                item.gp++;
                item.gd += diff;
            } 
            if(item.id === loser) {
                item.losses++;
                item.gp++;
                item.gd -= diff;
            }
        })
    }
    
    
    
      });
    console.log(playersArray);
    });

  });
};
