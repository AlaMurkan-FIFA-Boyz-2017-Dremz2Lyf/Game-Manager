var React = require('react');
// var axios = require('axios');

class StartTournament extends React.Component {

  constructor() {
    super();

    this.state = {
      tourneyName: '',
      error: null
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
      self.setState({
        error: null
      });
    })
    .catch(function(err) {
      self.setState({
        error: err
      });
    });

  }

  render() {


    var buttonClass = this.state.error ? 'btn btn-danger tourney-exists-btn' : 'btn btn-default';
    var buttonContent = this.state.error ? 'Whoops' : 'Create';

    return (
        <form className="form-inline" onSubmit={this.startTourney.bind(this)} autoComplete="off">
          <div className="form-group">
            <input type="text"
              className="form-control"
              id="tourneyName"
              placeholder="Tournament Name"
              onChange={this.handleInputChange.bind(this)} />
          </div>
          <button type="submit" className={buttonClass}>{buttonContent.toUpperCase()}</button>
          <p className="tourney-oops">{this.state.error}</p>
        </form>
      );
    // }

  }
}



module.exports = StartTournament;
