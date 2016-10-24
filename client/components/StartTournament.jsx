var React = require('react');
var axios = require('axios');

class StartTournament extends React.Component {

  constructor() {
    super();

    this.state = {
      tourneyName: '',
      noError: true
    };
  }

  handleInputChange(event) {
    this.setState({
      tourneyName: event.target.value
    });
  }

  startTourney(event) {
    var self = this;
    event.preventDefault();
    this.props.createTournament(this.state.tourneyName)
    .then(function(res) {
      '';
    })
    .catch(function(err) {
      self.setState({
        noError: false
      });
    });

  }

  render() {
    if (this.state.noError) {
      return (

        <form className="form-inline" onSubmit={this.startTourney.bind(this)} autoComplete="off">
          <div className="form-group">
            <input type="text"
              className="form-control"
              id="tourneyName"
              placeholder="Tournament Name"
              onChange={this.handleInputChange.bind(this)} />
          </div>
          <button type="submit" className="btn btn-default">CREATE!</button>
        </form>

      );
    } else {

      return (

        <form className="form-inline" onSubmit={this.startTourney.bind(this)} autoComplete="off">
          <div className="form-group">
            <input type="text"
              className="form-control"
              id="tourneyName"
              placeholder="Tournament Name"
              onChange={this.handleInputChange.bind(this)} />
          </div>
          <button type="submit" className="btn btn-danger tourney-exists-btn">TOURNAMENT EXISTS</button>
          <p className="tourney-oops">Tournament name already exists! Please try again!</p>
        </form>

      );
    }

  }
}



module.exports = StartTournament;
