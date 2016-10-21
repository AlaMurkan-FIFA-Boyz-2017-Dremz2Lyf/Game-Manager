var React = require('react');
var axios = require('axios');

class StartTournament extends React.Component {

  constructor() {
    super();

    this.state = {
      tourneyName: ''
    };
  }

  handleInputChange(event) {
    this.setState({
      tourneyName: event.target.value
    });
  }

  startTourney(event) {
    var context = this;
    event.preventDefault();
    this.props.create(this.state.tourneyName);
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.startTourney.bind(this)}>
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
  }
}

module.exports = StartTournament;
