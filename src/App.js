import React, {Component} from 'react';
import LandingPage from './Components/Forms/LandingPage';
import ReactGA from 'react-ga';

export const initGA = () => {
    console.log('GA INIT');
    ReactGA.initialize('')
};

export const logPageView = () => {
    ReactGA.set({page: window.location.pathname})
    ReactGA.pageview(window.location.pathname)
};


class App extends Component {
    componentDidMount() {
        initGA();
        logPageView();
    }

    render() {
      return(
        <LandingPage />
      )
    }
}

export default App;
