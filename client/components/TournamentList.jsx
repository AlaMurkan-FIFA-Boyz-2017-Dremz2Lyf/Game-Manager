var React = require('react');
var Player = require('./Player.jsx');

var TournamentList = (props) => {

  // Just like playerList, tourneyPlayersList will become and array of Player Components
    // with the name of that player, the movePlayer function, and it's index passed down as props
  var tourneyPlayersList = props.players.map(function(player, i) {
    return <Player name={player} click={props.click} index={i} />;
  });

  // and just like playerList again, we render that out in an unordered list
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
