var React = require('react');
var Player = require('./Player.jsx');

var NewTournamentPlayers = (props) => {

  // Just like playerList, tourneyPlayersList will become and array of Player Components
    // with the name of that player, the movePlayer function, and it's index passed down as props
  var newTourneyPlayersList = props.players.map(function(player, index) {
    return <Player playerObj={player} click={props.click} index={index} key={index} />;
  });

  // and just like playerList again, we render that out in an unordered list
  return (
    <ul className="list-group">
      {newTourneyPlayersList}
    </ul>
  );
};

module.exports = NewTournamentPlayers;
