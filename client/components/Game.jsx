var React = require('react');

var Game = (props) => (
  <li className="list-group-item">{props.player1_name} : {props.gameObj.player1_score} {props.player2_name} : {props.gameObj.player2_score}</li>  
); //Need to add in a click, also hold off on the way we're getting names for now

module.exports = Game;