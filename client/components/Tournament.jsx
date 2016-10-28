var React = require('react');

var Tournament = (props) => (
<<<<<<< 53d61247a26e5a2dd38811031059263c20d06065
  <li className="list-group-item" onClick={function() { props.click(props.index, props.tourneyObj.tourneyId); }}>{props.tourneyObj.data.tourneyName}</li>
=======
  <li className="list-group-item" onClick={function() { props.click(props.index, props.tourneyObj.tourneyId); }}>{props.tourneyObj.tournament_name}</li>
>>>>>>> dual database set up for players working
);

module.exports = Tournament;
