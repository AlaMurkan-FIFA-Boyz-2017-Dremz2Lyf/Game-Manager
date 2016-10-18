var React = require('react');
var Player = require('./Player.jsx')

var AllPlayersList = (props) => (

  <div class="panel panel-default">
    <div class="panel-heading">Add Players</div>
    <div class="panel-body">
      <ul class="list-group">
        <li class="list-group-item">Scott</li>
        <li class="list-group-item">Elliot</li>
        <li class="list-group-item">Nick</li>
        <li class="list-group-item">Chris</li>
      </ul>
    </div>
  </div>


  <ul>
    {props.players.map(function(player, i){
      return <Player name={player} click={props.click} index={i} players={props.players}/>
    })}
  </ul>
)

module.exports = AllPlayersList;
