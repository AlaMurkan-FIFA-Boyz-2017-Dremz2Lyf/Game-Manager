var React = require('react');
var Game = require('./Game.jsx');
var GameStatsForm = require('./GameStatsForm.jsx');

var CurrentTournament = (props) => {

  var playersInTourney = {}; //Create an object that will assign IDs to names, in order to then pass that down to game components

  props.state.allPlayersList.forEach(function(player) {

    playersInTourney[player.id] = player.username;
  });

  // Use that object and props to map over the list of games and return a built out Game Component
  var gamesList = props.state.currentTournamentGames.map(function(game, index) {
    // Props to Ben here for his clever use of the object as a library.
    return  (
      <Game
        key={index}
        thisGame={game}
        activeGame={props.state.currentGame}
        setCurrentGame={props.setCurrentGame}
        player1_name={playersInTourney[game.player1_id]}
        player2_name={playersInTourney[game.player2_id]}
      />
    );
  });

  return (
    <div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>{props.state.currentTournament.tournament_name.toUpperCase()}</h3>
        </div>
        <div className="panel-body">
          <GameStatsForm currentGame={props.state.currentGame} updateGames={props.updateGames} />
          <ul className="list-group game">
            {gamesList}
          </ul>
        </div>
      </div>
    </div>
  );
};


module.exports = CurrentTournament;
