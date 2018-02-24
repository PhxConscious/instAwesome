import React, {Component} from 'react';
import './App.css';
import ReactGA from 'react-ga';

import SignInForm from './Components/Forms/SignIn';
import ContactInfo from './Components/Forms/ContactInfo';
import CompanyInfo from './Components/Forms/CompanyInfo';
import ChangePassword from './Components/Forms/ChangePassword';
import SignUpForm from './Components/Forms/SignUp';
import RecoverUsername from './Components/Forms/RecoverUsername';
import RecoverPassword from './Components/Forms/RecoverPassword';
import AppNavbar from './Components/Reusable/AppNav';
import UnderwaterWrapper from './Components/Reusable/UnderwaterWrapper';
import BlueAppBG from './Components/Reusable/BlueAppBg';
import ShadowBox from './Components/Reusable/ShadowBox';
import ConsciousCenter from './Components/Reusable/ConsciousCenter';
import GreenFormContainer from './Components/Reusable/GreenFormContainer';
import OnTheWeb from './Components/Forms/OnTheWeb';
import Checkout from "./Components/Reusable/Checkout";

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
                {/*<BlueAppBG/>*/}
                <UnderwaterWrapper/>
                <AppNavbar/>
                <GreenFormContainer/>
                <ConsciousCenter/>
                <ShadowBox>
                    <OnTheWeb/>
                    <Checkout/>
                </ShadowBox>
                <ShadowBox>
                    <CompanyInfo/>
                </ShadowBox>
                <ShadowBox>
                    <SignInForm/>
                </ShadowBox>
                <ShadowBox>
                    <ChangePassword/>
                </ShadowBox>
                <ShadowBox>
                    <SignUpForm/>
                </ShadowBox>
                <ShadowBox>
                    <RecoverPassword/>
                </ShadowBox>
                <ShadowBox>
                    <RecoverUsername/>
                </ShadowBox>
                <ShadowBox>
                    <ContactInfo/>
                </ShadowBox>
            </div>);
    }
}

export default App;