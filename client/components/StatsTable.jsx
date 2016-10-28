var StatLine = require('./StatLine.jsx');
var React = require('react');

//var database = firebase.database();

var StatsTable = (props) => {

//   getStats(sortBy) {
//     return firebase.database().ref('/users').once('value')
//       .then(snapshot) {

//       }
//   }

//   return firebase.database().ref('/users/' + userId).once('value')
//     .then(function(snapshot) {
//       var username = snapshot.val().username;
// });

  // var statLines = props.table.map(function(playerStats, index) {
  //   return <StatLine playerStats={playerStats} key={index} />;
  // });

// need to make table column headers sort on click
  return (
  <div className="panel panel-default">
    <div className="panel-body">
      <table className="table">
        <thead>
          <tr>
            <th>Player</th>
            <th>GP</th>
            <th>Won</th>
            <th>Draw</th>
            <th>Loss</th>
            <th>GD</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {statLines}
        </tbody>
      </table>
    </div>
  </div>

  );
};

module.exports = StatsTable;
