var React = require('react');
var axios = require('axios');

class Form extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      noError: true
    };
  }

  handleInputChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  //When Add User Form is filled out this function will be called onSubmit. Prevents the page from
  //refreshing, posts the new user to the database, then displays this new user in the player list.
  //If the username already exists in the database it will display an error on the page. 
  addNewPlayer(event) {
    var self = this;
    event.preventDefault()
    axios.post('/api/player', {
      username: this.state.value
    }).then(function(){
      self.state.noError = true;
      self.state.value = '';
      self.props.getAllPlayers();
    }).catch(function(error){
      console.log('ERROR!')
      self.state.noError = false;
      self.state.value = '';
      self.props.getAllPlayers();
    })
  }

  render() {
    if(this.state.noError) {
      return (

        <form className="form-inline" onSubmit={this.addNewPlayer.bind(this)}>
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

    } else {
      return (
      
        <form className="form-inline" onSubmit={this.addNewPlayer.bind(this)} className="error">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text"
              className="form-control user-form"
              id="username"
              value={this.state.value}
              onChange={this.handleInputChange.bind(this)} />
          </div>
          <button type="submit" className="btn btn-default">ERROR SUBMIT</button>
        </form>

      )
    }
  }
}

module.exports = Form;
