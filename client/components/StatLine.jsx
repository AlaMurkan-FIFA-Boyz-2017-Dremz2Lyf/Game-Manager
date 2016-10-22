var React = require('react');

var StatLine = (props) => (
  <tr> <tbody>Id</tbody> <tbody>GP</tbody> <tbody>Wins</tbody> <tbody>Losses</tbody> <tbody>Draws</tbody> <tbody>GD</tbody> </tr>
); // Placeholders now in the tbodys, will be something like props.statsObj.

module.exports = StatLine;