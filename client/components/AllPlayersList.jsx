var React = require('react');
var Player = require('./Player.jsx');

var AllPlayersList = (props) => {

  var playerlist = props.players.map(function(player, i) {
    return;
    <li className="list-group-item">
    <Player name={player} click={props.click} index={i} players={props.players}/>
    </li>;
  });

  return (
    <div className="panel panel-default">
      <div className="panel-heading">Add Players</div>
      <div className="panel-body">
        <ul className="list-group">
          {playerList}
        </ul>
      </div>
    </div>
  );
};





module.exports = AllPlayersList;
