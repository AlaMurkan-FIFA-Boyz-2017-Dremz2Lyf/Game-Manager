var React = require('react');

class Form extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleInputChange(event) {
    // this.props.handleNewUser(event.target.value);
    this.setState({
      value: event.target.value
    });
  }

  addNewPlayer() {
    axios.post('/api/player', {
      username: this.state.value
    });
  }

  render() {
    return (

      <form className="form-inline">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text"
          className="form-control user-form"
          id="username"
          value={this.state.value}
          onChange={this.handleInputChange.bind(this)} />
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>

    );
  }
}

module.exports = Form;
