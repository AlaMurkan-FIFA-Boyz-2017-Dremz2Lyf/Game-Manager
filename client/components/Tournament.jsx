var React = require('react');

var Tournament = (props) => (
  <li className="list-group-item" onClick={function() { props.click(props.index, props.tourneyObj.tourneyId); }}>{props.tourneyObj.tournament_name}</li>
);

module.exports = Tournament;
