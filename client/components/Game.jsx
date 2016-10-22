var React = require('react');


var Game = (props) => {


  return (
    <li className={'list-group-item ' + props.thisGame.status} onClick={function() { props.click(props.thisGame, props.activeGame); }}>
      <span className="player1">{props.player1_name}</span>
      <span className="score">
        <span className="player1_score">{props.thisGame.player1_score}</span>
        -
        <span className="player2_score">{props.thisGame.player2_score}</span>
      </span>
      <span className="player2">{props.player2_name}</span>
    </li>
  );
};

module.exports = Game;
