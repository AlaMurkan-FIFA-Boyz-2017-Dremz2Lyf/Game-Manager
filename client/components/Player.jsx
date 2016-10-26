var React = require('react');

var Player = (props) => (
  <li className="list-group-item" onClick={function() { props.click(props.playerObj, props.index); }}>{props.playerObj.username}</li>  //Note, need to include prop for total score
);

module.exports = Player;
