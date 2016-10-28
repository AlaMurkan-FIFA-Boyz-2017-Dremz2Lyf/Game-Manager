var StatLine = require('./StatLine.jsx');
var React = require('react');

//var database = firebase.database();

var StatsTable = (props) => {

  var statLines = props.table.map(function(user, i) {
    return <StatLine playerStats={user} key={i} />;
  });


  return (
  <div className="panel panel-default">
    <div className="panel-body">
      <table className="table">
        <thead>
          <tr>
            <th onClick={function() {console.log('click')}}>Player</th>
            <th>Games<br/>Played</th>
            <th>Wins</th>
            <th>Draws</th>
            <th>Losses</th>
            <th>Goal<br/>Differential</th>
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
