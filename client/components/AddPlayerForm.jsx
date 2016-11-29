import React from 'react'
import axios from 'axios';
import utils from '../utils';

class Form extends React.Component {

  constructor() {
    super();

    this.state = {
      noError: true,
      playerName: ''
    };
  }

  handleInputChange(event) {
    this.setState({
      playerName: event.target.value
    });
  }

  // When Add User Form is filled out this function will be called onSubmit. Prevents the page from
    // refreshing, posts the new user to the database, then displays this new user in the player list.
  // If the username already exists in the database it will display an error on the page.
  addNewPlayer(event) {

    event.preventDefault();

    var playerName = utils.formatName(this.state.playerName);

    axios.post('/api/player', {
      username: playerName
    }).then(res => {
      this.setState({
        error: '',
        playerName: ''
      });
      this.props.updatePlayers();
    }).catch(error => {
      this.setState({
        error: 'Oops, that name is taken! Try again!',
        playerName: ''
      });
    });
  }

  render() {

    return (
        <form className="form-inline" onSubmit={this.addNewPlayer.bind(this)} autoComplete="off">
          <div className="form-group">
            <input type="text"
              className="form-control user-form"
              id="username"
              value={this.state.playerName}
              placeholder="Add User"
              onChange={this.handleInputChange.bind(this)} />
          </div>
          <button type="submit" className="btn btn-default">ADD</button>
          <p className="user-oops">{this.state.error}</p>
        </form>
      );
  }
}

module.exports = Form;
