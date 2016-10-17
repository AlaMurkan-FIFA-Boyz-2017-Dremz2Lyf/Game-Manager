var React = require('react');

class Form extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }
  }

  handleInputChange(event) {
    // this.props.handleNewUser(event.target.value);
    this.setState({
      value: event.target.value
    });
  }

  addNewPlayer: function() {
    axios.post('/api/player', {
      username: this.state.value
    })
  }

  render() {
    return (
      <div className="user-search">
        <input 
          className="user-form"
          type="text"
          value={this.state.value}
          onChange={this.handleInputChange.bind(this)} />
          <button></button>
      </div>    
    );
  }
}  

module.exports = Form;