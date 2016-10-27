var StatLine = require('./StatLine.jsx');
var React = require('react');
const firebase = require("firebase/app");
const db = require('./../../firebaseinitialize.js');

var StatsTable = (props) => {

  // var self = this;

  // var playersArr = [];
  // usersRef.once('value', function(snapshot) {
  //   snapshot.forEach(function(childSnapshot) {
  //     playersArr.push({
  //       username: childSnapshot.key,
  //       data: childSnapshot.val()
  //     });
  //   });
  // }).then(function () {
  //   console.log(playersArr);
  //   // So within a .then we can set the state to the players array
  //   self.setState({
  //     // Adds the players from the db not already in a tourney to allPlayersList
  //     allPlayersList: playersArr
  //   });
  // });

    // var statLines = props.table.map(function(playerStats, index) {
  //   return <StatLine playerStats={playerStats} key={index} />;
  // });

  // var testArray = [{name: 'christian', gp: 3, won: 3, draw: 0, loss: 8, gd: -3, points: 8}, {name: 'zach', gp: 4, won: 7, draw: 3, loss: 3, gd: 6, points: 8}, {name: 'calvin', gp: 3, won: 3, draw: 0, loss: 8, gd: -3, points: 8}, {name: 'brett', gp: 7, won: 4, draw: 8, loss: 3, gd: 7, points: 6}]
  var statLines = props.table.map(function(user, i) {
    return <StatLine playerStats={user} key={i}/>
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
