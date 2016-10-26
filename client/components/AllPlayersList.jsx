var React = require('react');
var Player = require('./Player.jsx');

var AllPlayersList = (props) => {
  // playerList will become and array of Player Components with the name of that player,
    // the movePlayer function, and it's index passed down as props
  var playerList = props.players.map(function(player, index) {
      return <Player playerObj={player} click={props.click} index={index} key={index} />;
    });

  // render those out inside an unordered list
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h4>ADD PLAYERS TO TOURNAMENT</h4>
      </div>
      <div className="panel-body">
        <ul className="list-group">
          {playerList}
        </ul>
      </div>
    </div>
  );
};





module.exports = AllPlayersList;
