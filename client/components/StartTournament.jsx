var React = require('react');
var axios = require('axios');

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

  startTourney(e) {
    e.preventDefault();
    this.props.createTournament(this.state.tourneyName).then(res => {
      this.setState({
        error: null
      });
    }).catch(err => {
      this.setState({
        error: err.response.data.message
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
  }
}

module.exports = StartTournament;
