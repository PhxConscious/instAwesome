import React, { Component } from 'react';
import '../../App.css';

import SignInForm from './SignIn';
import ContactInfo from './ContactInfo';
import CompanyInfo from './CompanyInfo';
import ChangePassword from './ChangePassword';
import SignUpForm from './SignUp';
import RecoverUsername from './RecoverUsername';
import RecoverPassword from './RecoverPassword';
import AppNavbar from '../Reusable/AppNav';
import UnderwaterWrapper from '../Reusable/UnderwaterWrapper';
import ShadowBox from '../Reusable/ShadowBox';
import ConsciousCenter from '../Reusable/ConsciousCenter';
import GreenFormContainer from '../Reusable/GreenFormContainer';
import OnTheWeb from './OnTheWeb';
import Checkout from "../Reusable/Checkout";


class LandingPage extends Component {
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

export default LandingPage;
