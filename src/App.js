import React, {Component} from 'react';
import './App.css';

import SignUpForm from "./Components/Reusable/SignUpForm";
import Checkout from './Components/Reusable/Checkout';
import LoginForm from './Components/Reusable/LoginForm'

class App extends Component {
  render() {
    return (
        <div className="App">
          <SignUpForm/>
            <Checkout
                name={'The Road to learn React'}
                description={'Only the Book'}
                amount={1}
            />
            <br/>
            <LoginForm/>
        </div>);
  }
}

export default App;
