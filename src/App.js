import React, {Component} from 'react';
import Layout from './Components/Layout';
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
        <Layout />
      )
    }
}

export default App;
