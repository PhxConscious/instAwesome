import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (<div className="App">
      <form className="basicForm" action="#">
        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1"></input>
          <label className="mdl-textfield__label" for="sample1">Username</label>
        </div>
        <br/>
        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1"></input>
          <label className="mdl-textfield__label" for="sample1">Password</label>
        </div>
        <br/>
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
          Submit
        </button>
      </form>

    </div>);
  }
}

export default App;
