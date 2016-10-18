var React = require('react');
var Player = require('./Player.jsx');

var NewTournamentPlayers = (props) => {

  // Just like playerList, tourneyPlayersList will become and array of Player Components
    // with the name of that player, the movePlayer function, and it's index passed down as props
  var newTourneyPlayersList = props.players.map(function(player, i) {
    return <Player playerObj={player} click={props.click} index={i} />;
  });

  // and just like playerList again, we render that out in an unordered list
  return (
    <div className="panel panel-default">
      <div className="panel-heading">New Tournament Players</div>
      <div className="panel-body">
        <ul className="list-group">
          {newTourneyPlayersList}
        </ul>
      </div>
    </div>
  );
};

module.exports = NewTournamentPlayers;
