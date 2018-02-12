import React, {Component} from 'react';
import './App.css';
import LoginForm from "./Components/Reusable/LoginForm";

class App extends Component {
  render() {
    return (
        <div className="App">
          <LoginForm/>
        </div>);
  }
}

export default App;
