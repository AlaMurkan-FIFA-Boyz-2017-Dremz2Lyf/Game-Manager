var React = require('react');
var Game = require('./Game.jsx');

var CurrentTournament = (props) => {
	var playersInTourney = {} //Create an object that will assign IDs to names, in order to then pass that down to game components
	props.tourneyPlayersListforEach(function(player){
		playersInTourney[player.id] = player.username
	})
	var gamesList = props.currentTournamentGames.map(function(game, gameIndex){
		return <Game gameObj={game} gameIndex={gameIndex} player1_name={playersInTourney[game.player1_name]} player2_name={playersInTourney[game.player2_name]}/> //Passing along player names to display in matchups
	}) //Will want to add in a click

	return (
    <div className="panel panel-default">
      <div className="panel-heading">{props.tournamentName}</div>
      <div className="panel-body">
        <ul className="list-group">
          {gamesList}
        </ul>
      </div>
    </div>
  );
}


module.exports = CurrentTournament;