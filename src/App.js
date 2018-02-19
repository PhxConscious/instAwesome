import React, {Component} from 'react';
import './App.css';
import ReactGA from 'react-ga';

import SignInForm from './Components/Forms/SignInForm';
import ContactInfo from './Components/Forms/ContactInfo';
import CompanyInfo from './Components/Forms/CompanyInfo';
import ChangePassword from './Components/Forms/ChangePassword';

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
            <SignInForm/>
            <ContactInfo/>
            <CompanyInfo/>
            <ChangePassword/>
        </div>);
  }
}

export default App;
