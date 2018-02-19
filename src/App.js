import React, {Component} from 'react';
import './App.css';
import ReactGA from 'react-ga';

import ContactInfo from './Components/Forms/ContactInfo'

export const initGA = () => {
    console.log('GA INIT');
    ReactGA.initialize('')
};

export const logPageView = () => {
    ReactGA.set({page:window.location.pathname})
    ReactGA.pageview(window.location.pathname)
};



class App extends Component {
    componentDidMount() {
        initGA();
        logPageView();
    }
  render() {
    return (
        <div className="App">
            <ContactInfo/>
        </div>);
  }
}

export default App;
