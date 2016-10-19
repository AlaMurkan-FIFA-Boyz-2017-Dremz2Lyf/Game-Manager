var React = require('react');
var axios = require('axios');

//When the PUT has happened need to run a function that updates the state of current game score in 
//the Main currentGame state

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
    event.preventDefault();
    console.log('PROPS:', this.props.currentGame)
    axios.put('/api/games', {
      id: self.props.currentGame.id,
      player1_score: this.state.player_1_score,
      player2_score: this.state.player_2_score
    })
    .then(function() {
      self.setState({
        player_1_score: '',
        player_2_score: ''
      })
    })
    .catch(function(err) {
      console.log('ERROR in PUT request')
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


