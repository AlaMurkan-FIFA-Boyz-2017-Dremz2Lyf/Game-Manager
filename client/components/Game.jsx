var React = require('react');


var Game = (props) => {


  return (
    <li className={'list-group-item ' + props.thisGame.status} onClick={function() { props.setCurrentGame(props.thisGame, props.activeGame); }}>
      <div className="row">
        <div className="player1 col-xs-4">{props.player1_name}</div>
        <div className="score col-xs-4">
          <span className="player1_score">{props.thisGame.player1_score}</span>
          -
          <span className="player2_score">{props.thisGame.player2_score}</span>
        </div>
        <div className="player2 col-xs-4">{props.player2_name}</div>
      </div>
    </li>
  );
};

module.exports = Game;
