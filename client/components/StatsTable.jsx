var StatLine = require('./StatLine.jsx');
var React = require('react');

var StatsTable = (props) => {

  var statLines = props.table.map(function(user, i) {
    return <StatLine playerStats={user} key={i}/>

  })


  // handleClick() {
  //   // return players objects sorted by column name property
  // }


  return (
  <div className="panel panel-default">
    <div className="panel-heading">
    </div>
    <div className="panel-body">
      <table className="table">
        <thead>
          <tr>
            <th>Player</th>
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
