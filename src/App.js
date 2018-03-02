import React, {Component} from 'react';
import Layout from './Components/Layout';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import Store from './redux/stores'

export const initGA = () => {
    console.log('GA INIT');
    ReactGA.initialize('')
};

export const logPageView = () => {
    ReactGA.set({page: window.location.pathname})
    ReactGA.pageview(window.location.pathname)
};

let store = new Store();

class App extends Component {
    componentDidMount() {
        initGA();
        logPageView();
    }

    render() {
      return(
        <Provider store={store}>
          <Layout />
        </Provider>

      )
    }
}

export default App;
