var React = require('react');

var Player = (props) => (
  <li onClick={function(){props.click(props.index, props.players)}}>{props.name}</li>  //Note, need to include prop for total score
)

module.exports = Player;