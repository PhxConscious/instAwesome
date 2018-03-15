import React, {Component} from 'react';
import '../../App.css';

import SignInForm from '../Forms/SignIn';
import UnderwaterWrapper from '../Reusable/UnderwaterWrapper';
import ShadowBox from '../Reusable/ShadowBox';
import ConsciousCenter from '../Reusable/ConsciousCenter';
import Gradient from "../Reusable/Gradient";
import AppNavbar from '../Reusable/AppNav';


class LandingPage extends Component {
    render() {
        return (
            <div className="App">
                <Gradient/>
                <UnderwaterWrapper>z
                    <ConsciousCenter/>
                    <ShadowBox>
                        <SignInForm/>
                    </ShadowBox>
                </UnderwaterWrapper>
                <Gradient/>
            </div>
        );
    }
}

export default LandingPage;
