var React = require('react');
var axios = require('axios');


class GameStatsForm extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      player_1_score: '',
      player_2_score: ''
    };
  }

  handleInputChangeHome(event) {
    this.setState({
      player_1_score: event.target.value
    });
  }

  handleInputChangeAway(event) {
    this.setState({
      player_2_score: event.target.value
    });
  }

  insertStats(event) {
    var self = this;
    var tourneyId = this.props.currentGame.tournament_id;
    event.preventDefault();
    axios.put('/api/games', {
      id: self.props.currentGame.id,
      player1_score: this.state.player_1_score,
      player2_score: this.state.player_2_score,
      status: 'disabled'
    })
    .then(function() {
      self.props.updateGames(tourneyId);
      self.setState({
        player_1_score: '',
        player_2_score: ''
      });
    })
    .catch(function(err) {
      res.status(500).send('Error Inserting Player Scores');
    });
  }
            // <label htmlFor="player1_id">Home</label>
            // <label htmlFor="player2_id" >Away</label>

  render() {
    return (

    <form className="form-inline" onSubmit={this.insertStats.bind(this)} autoComplete="off">
          <div className="form-group form-group-sm">
            <input type="text"
              className="form-control player1-score col-xs-2"
              id="player1_id"
              value={this.state.player_1_score}
              onChange={this.handleInputChangeHome.bind(this)}
              placeholder="Home Final Score" />

            <input type="text"
              className="form-control player2-score col-xs-2"
              id="player2_id"
              value={this.state.player_2_score}
              onChange={this.handleInputChangeAway.bind(this)}
              placeholder="Away Final Score" />
          </div>
          <button type="submit" className="btn btn-default btn-xs">END GAME</button>
        </form>
    );
  }
}


module.exports = GameStatsForm;
