var React = require('react');
var Player = require('./Player.jsx');

var TournamentList = (props) => {
  var tourneyPlayersList = props.players.map(function(player, i) {
    return <Player name={player} click={props.click} index={i} players={props.players}/>;
  });

  return (
    <div className="panel panel-default">
      <div className="panel-heading">Tournament Players</div>
      <div className="panel-body">
        <ul className="list-group">
          {tourneyPlayersList}
        </ul>
      </div>
    </div>
  );
};

module.exports = TournamentList;
