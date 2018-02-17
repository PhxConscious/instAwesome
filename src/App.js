import React, {Component} from 'react';
import './App.css';
import ReactGA from 'react-ga';

import SignUpForm from "./Components/Reusable/SignUpForm";
import Checkout from './Components/Reusable/Checkout';
import LoginForm from './Components/Reusable/LoginForm'

export const initGA = () => {
    console.log('GA INIT');
    ReactGA.initialize('UA-114277239-1')
};

export const logPageView = () => {
    ReactGA.set({page:window.location.pathname})
    ReactGA.pageview(window.location.pathname)
}



class App extends Component {
    componentDidMount() {
        initGA();
        logPageView();
    }
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
