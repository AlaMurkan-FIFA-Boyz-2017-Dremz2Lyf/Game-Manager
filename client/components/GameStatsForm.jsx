var React = require('react');
var axios = require('axios');

//When the PUT has happened need to run a function that updates the state of current game score in 
//the Main currentGame state

//Need to show an error when a game hasn't been selected to update scores for. 

//Bugs
//If no game is clicked there won't be a current game and if you try to input scores it send you back to home. Not sure where this error need to be handled
//Error handling so it doesn't send the user back to the home page if they forget to click on the game they want to update with the scores
//Maybe want to auto set the first game to current so that there won't be an issue of the user forgetting to click the game to update and sending back to home


//Testing
//Multple games
//If user clicks on page outside of the games listed will it fuck up or will it remember which game the user clicked on last -->Remembers which game was clicked last

//Need to show the user which game is current with some styling so it is obvious. As of right now there is no feedback
//Fix styling for my form
//But I still need to handle the error in case we don't implement that

//Need an error if the user forgets to submit a score for one of the player otherwise it just shows nothing on that players side

class GameStatsForm extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      player_1_score: '',
      player_2_score: ''
    }
  }

  handleInputChangeHome(event) {
    this.setState({
      player_1_score: event.target.value
    })
  }

  handleInputChangeAway(event) {
    this.setState({
      player_2_score: event.target.value
    })
  }
      
  insertStats(event) {
    var self = this;
    var tourneyId = this.props.currentGame.tournament_id
    console.log('GAMESTATS TOURNEYID', this.props.currentGame.tournament_id)
    event.preventDefault();
    axios.put('/api/games', {
      id: self.props.currentGame.id,
      player1_score: this.state.player_1_score,
      player2_score: this.state.player_2_score
    })
    .then(function() {
      self.props.updateGameStats(tourneyId)
      self.setState({
        player_1_score: '',
        player_2_score: ''
      })
    })
    .catch(function(err) {
      res.status(500).send('Error Inserting Player Scores')
    })
}

  render() {
    return (

    <form className="form-inline" onSubmit={this.insertStats.bind(this)} >
          <div className="form-group">
            <label htmlFor="player1_id">Home</label>
            <input type="text"
              className="form-control player1-score"
              id="player1_id"
              value={this.state.player_1_score}
              onChange={this.handleInputChangeHome.bind(this)} 
              placeholder="Home Final Score" />
            
            <label htmlFor="player2_id" >Away</label>
            <input type="text"
              className="form-control player2-score" 
              id="player2_id"
              value={this.state.player_2_score}
              onChange={this.handleInputChangeAway.bind(this)} 
              placeholder="Away Final Score" /> 
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
    );    
  }
}


module.exports = GameStatsForm;


