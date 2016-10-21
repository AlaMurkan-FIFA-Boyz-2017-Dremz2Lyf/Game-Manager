var React = require('react');

// var Game = (props) => (
//   <li className="list-group-item">{props.player1_name} : {props.player1_score} {props.player2_name} : {props.player2_score}</li>
// );

var Game = (props) => (
	<li className="list-group-item "/* + {props.status}*/ onClick={function() { props.click(props.gameIndex); }}>
	  <span className="player1">{props.player1_name}</span>
	  <span className="score">
	    <span className="player1_score">{props.gameObj.player1_score}</span>
	     -
	    <span className="player2_score">{props.gameObj.player2_score}</span>
	  </span>
	  <span className="player2">{props.player2_name}</span>
    </li>
);

module.exports = Game;
