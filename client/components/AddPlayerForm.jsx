var React = require('react');
var axios = require('axios');

class Form extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      noError: true
    };
  }

  handleInputChange(event) {
    this.setState({
      playerName: event.target.value
    });
  }

  //When Add User Form is filled out this function will be called onSubmit. Prevents the page from
  //refreshing, posts the new user to the database, then displays this new user in the player list.
  //If the username already exists in the database it will display an error on the page.
  addNewPlayer(event) {
    var context = this;
    console.log(this.state);
    event.preventDefault();

    var playerName = this.state.playerName.toUpperCase();

    axios.post('/api/player', {
      username: playerName
    }).then(res => {
      context.setState({
        noError: true,
        playerName: ''
      });
      context.props.updatePlayers();
    }).catch(error => {
      console.log('Error in posting username', error);
      context.setState({
        noError: false,
        playerName: ''
      });
    });
  }

  render() {
    if (this.state.noError) {
      return (

        <form className="form-inline" onSubmit={this.addNewPlayer.bind(this)} autoComplete="off">
          <div className="form-group">
            <input type="text"
              className="form-control user-form"
              id="username"
              value={this.state.value}
              placeholder="Add User"
              onChange={this.handleInputChange.bind(this)} />
          </div>
          <button type="submit" className="btn btn-default">ADD</button>
        </form>

      );

    } else {
      return (

        <form className="form-inline" onSubmit={this.addNewPlayer.bind(this)} autoComplete="off">
          <div className="form-group">
            <input type="text"
              className="form-control user-form"
              id="username"
              value={this.state.value}
              placeholder="Please try again"
              onChange={this.handleInputChange.bind(this)} />
          </div>
          <button type="submit" className="btn btn-danger player-exists-btn">USER EXISTS</button>
          <p className="user-oops">Oops, that name is taken! Try again!</p>
        </form>

      );
    }
  }
}

module.exports = Form;
