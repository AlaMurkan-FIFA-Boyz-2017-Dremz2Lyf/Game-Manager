var React = require('react');

var StatLine = (props) => {
  var stats = props.playerStats;
  return (
    <tr>
      <td>{stats.playerId}</td><td>{stats.gp}</td><td>{stats.win}</td><td>{stats.draw}</td><td>{stats.loss}</td><td>{stats.gd}</td><td>{stats.points}</td>
    </tr>
  );
}; // Placeholders now in the tbodys, will be something like props.statsObj.

module.exports = StatLine;
