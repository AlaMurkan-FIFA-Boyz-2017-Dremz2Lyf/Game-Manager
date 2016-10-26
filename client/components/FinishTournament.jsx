var React = require('react');
var ReactDOM = require('react-dom');

var FinishTournament = (props) => (
  <div className="well">
    <button
      type="button"
      className="btn btn-primary btn-block"
      onClick={function() { props.finish(); }} >
        Finish Tournament
      </button>
  </div>
);



module.exports = FinishTournament;
