var React = require('react');
var ReactDOM = require('react-dom');

class Main extends React.component {

  constructor() {
    super();
    this.state = {
      data: 'HI'
    };
  }

  render() {
    return (
      <div> Hi </div>
    );
  }

}

module.exports = Main;
