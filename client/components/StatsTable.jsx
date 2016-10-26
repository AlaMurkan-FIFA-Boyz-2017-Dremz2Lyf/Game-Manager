var StatLine = require('./StatLine.jsx');
var React = require('react');
var database = firebase.database();

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

  var testArray = [{name: 'calvin', gp: 3, won: 3, draw: 0, loss: 8, gd: -3, points: 8}, {name: 'brett', gp: 7, won: 4, draw: 8, loss: 3, gd: 7, points: 6}]
  var statLines = testArray.map(function(x) {
    return <StatLine playerStats={x}/>
  })

  return (
  <div className="panel panel-default">
    <div className="panel-heading">
    <h3>TABLE BRETT</h3>
    </div>
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
