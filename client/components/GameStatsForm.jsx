var React = require('react');
var axios = require('axios');


class GameStatsForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      player1_score: '',
      player2_score: ''
    };
  }

  handleInputChangeHome(event) {
    this.setState({
      player1_score: event.target.value
    });
  }

  handleInputChangeAway(event) {
    this.setState({
      player2_score: event.target.value
    });
  }

  insertStats(event) {
    event.preventDefault();

    var tourneyId = this.props.currentGame.tournament_id;
    var p1Score = this.state.player1_score;
    var p2Score = this.state.player2_score;

    if (p1Score === '' || p2Score === '') {
      console.log(p1Score);
      this.setState({
        error: 'Did you forget Something?'
      });
    } else {
      axios.put('/api/games', {
        id: this.props.currentGame.id,
        player1_score: this.state.player1_score,
        player2_score: this.state.player2_score,
        status: 'disabled'
      })
      .then(res => {
        this.props.updateGames(tourneyId);
        this.setState({
          player1_score: '',
          player2_score: '',
          error: null
        });
      })
      .catch(function(err) {
        res.status(500).send('Error Inserting Player Scores');
      });
    }
  }


  render() {
    return (

      <form className="form-inline" onSubmit={this.insertStats.bind(this)} autoComplete="off">
        <div className="row">

          <div className="col-xs-7">
            <div className="form-group form-group-sm">
            <input type="text"
              className="form-control player1-score col-xs-2"
              id="player1_id"
              value={this.state.player1_score}
              onChange={this.handleInputChangeHome.bind(this)}
              placeholder="Home" />

            <input type="text"
              className="form-control player2-score col-xs-2"
              id="player2_id"
              value={this.state.player2_score}
              onChange={this.handleInputChangeAway.bind(this)}
              placeholder="Away" />
            </div>
          </div>

          <div className="col-xs-3 whoops">
            <p className="">{this.state.error}</p>
          </div>

          <div className="col-xs-2">
            <button type="submit" className="btn btn-default btn-xs">END GAME</button>
          </div>

        </div>

      </form>
    );
  }
}


module.exports = GameStatsForm;
