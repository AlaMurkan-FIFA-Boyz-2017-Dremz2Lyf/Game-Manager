var StatLine = require('./StatLine')
var React = require('react');

var StatsTable = (props) => {

  var statLines = props.stats.map(function(player, index) {
    return <StatLine statsObj={player} key={index} />;
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
            <th>Loss</th>
            <th>Draw</th>
            <th>GD</th>
          </tr>
        </thead>

      </table>
    </div>
  </div>

  );
};

module.exports = StatsTable;