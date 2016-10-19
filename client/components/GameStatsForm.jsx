var React = require('react');

//Need the username for each playerID to show up next to their score input form so we know which user yo uare inputting the score
//for ---> need to look up how this works online

//Need state for each players score
//Handle input change for the form box for each player. As it is updated the Virtual-DOM will then have access to the data in the form

//On submit of the form update the state of the game progress to reflect completion?
//When all games have a score set state of tournament to complete
//Post the data to the games database with the scores for each player_id
//Update state so that the next game in the list is now the current game. --> this is why I probably need the function to be 
//in Main.jsx so it has access to the game state. Pass the function down as a prop through main.

class StatsForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      player_1_score: '',
      player_2_score: ''
    }
  }

  handleInputChange(event) {
    this.setState({
      player_1_score: event.target.valueP1,
      player_2_score: event.target.valueP2
    })
  }

  render() {
    return (

    <form className="form-inline" >
          <div className="form-group">
            <label htmlFor="player1_id">Home</label>
            <input type="text"
              className="form-control player1-score"
              id="player1_id"
              value={this.state.player_1_score}
              onChange={this.handleInputChange.bind(this)} 
              placeholder="Home Final Score" />
            
            <label htmlFor="player2_id" >Away</label>
            <input type="text"
              className="form-control player2-score" 
              id="player2_id"
              value={this.state.player_2_score}
              onChange={this.handleInputChange.bind(this)} 
              placeholder="Away Final Score" /> 
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
    );    
  }



}


module.exports = StatsForm;