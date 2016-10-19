var React = require('react');
var Game = require('./Game.jsx');

var CurrentTournament = (props) => {
  var playersInTourney = {}; //Create an object that will assign IDs to names, in order to then pass that down to game components

  props.currentTournament.forEach(function(player) {

    playersInTourney[player.id] = player.username;
  });
  var gamesList = props.currentTournamentGames.map(function(game, gameIndex) {
    return <Game gameObj={game} gameIndex={gameIndex} click={props.setCurrentGame} player1_name={playersInTourney[game.player1_id]} player2_name={playersInTourney[game.player2_id]}/>; //Passing along player names to display in matchups
  }); //Will want to add in a click

  return (
    <div>

      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3>{props.currentTournament.tournament_name}</h3>
          </div>
          <div className="panel-body">
            <ul className="list-group game">
              {gamesList}
            </ul>
        </div>
        </div>
       </div>
    </div>
  );
};


module.exports = CurrentTournament;
