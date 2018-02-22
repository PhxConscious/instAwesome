import React, {Component} from 'react';
import './App.css';
import ReactGA from 'react-ga';

import SignInForm from './Components/Forms/SignInForm';
import ContactInfo from './Components/Forms/ContactInfo';
import CompanyInfo from './Components/Forms/CompanyInfo';
import ChangePassword from './Components/Forms/ChangePassword';
import SignUpForm from './Components/Forms/SignUpForm';
import RecoverUsername from './Components/Forms/RecoverUsername';
import RecoverPassword from './Components/Forms/RecoverPassword';
import AppNavbar from './Components/Reusable/AppNav';
import UnderwaterWrapper from './Components/Reusable/UnderwaterWrapper';

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
        return (
            <div className="App">
                <UnderwaterWrapper/>
                <AppNavbar/>
                <ChangePassword/>
                <SignInForm/>
                <RecoverPassword/>
                <RecoverUsername/>
                <SignUpForm/>
                <ContactInfo/>
                <CompanyInfo/>
            </div>);
    }
}

export default App;
