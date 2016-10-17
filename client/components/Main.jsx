var React = require('react');
var ReactDOM = require('react-dom');

class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      data: 'HI'
    };
  }

  render() {
    return (
      <div> Hi There it was!!!!!!!!!!!</div>
    );
  }

}

module.exports = Main;
