var React = require('react');

var Player = (props) => (
  <li onClick={function(){props.click(props.index, props.players)}}>{props.name}</li>
)

module.exports = Player;