var React = require('react');
var Tournament = require('./Tournament.jsx');

var OngoingTournamentsList = (props) => {
  // Create Tournament components out of each ongoing tournaments object
  console.log(props)
  var tourneyList = props.tourneys.map(function(tourney, index) {
    return <Tournament tourneyObj={tourney} click={props.click} index={index} key={index} />;
  });
  
  // Render each Tournament component out inside an unordered list
  return (
  <div className="row">
    <div className="col-xs-1">
    </div>
    <div className="col-xs-5">
      <div className="panel panel-default">
        <div className="panel-heading">Tournaments in Progress</div>
        <div className="panel-body">
          <form className="form-inline">
          </form>
          <ul className="list-group">
            {tourneyList}
          </ul>
        </div>
      </div>
    </div>
  </div>
  );
};


module.exports = OngoingTournamentsList;