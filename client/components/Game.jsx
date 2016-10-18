var React = require('react');

var Game = (props) => (
  <li className="list-group-item">{props.player1_name} : {props.player1_score} {props.player2_name} : {props.player2_score}</li>  
);

module.exports = Game;