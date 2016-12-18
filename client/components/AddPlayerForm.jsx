import React from 'react';
import utils from '../utils';
import player from '../models/player.js';

class CreatePlayerForm extends React.Component {

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
  addNewPlayer(e) {

    e.preventDefault();
    let newPlayer = {}

    newPlayer.username = utils.formatName(this.state.playerName);

    player.create(newPlayer).then(res => {
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
      throw error
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

module.exports = CreatePlayerForm;
