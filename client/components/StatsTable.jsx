var StatLine = require('./StatLine.jsx');
var React = require('react');

var StatsTable = (props) => {

  var statLines = props.table.map(function(playerStats, index) {
    return <StatLine playerStats={playerStats} key={index} />;
  });

  return (
  <div className="panel panel-default">
    <div className="panel-heading">
    <h3>TABLE</h3>
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
