var React = require('react');

var Tournament = (props) => (
  <li className="list-group-item" onClick={props.click.bind(this, props.tourneyObj)}>{props.tourneyObj.tournament_name}</li>
);

module.exports = Tournament;
