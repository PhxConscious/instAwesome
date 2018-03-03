import React, {Component} from 'react';
import '../../App.css';

import SignInForm from './SignIn';
import UnderwaterWrapper from '../Reusable/UnderwaterWrapper';
import ShadowBox from '../Reusable/ShadowBox';
import ConsciousCenter from '../Reusable/ConsciousCenter';
import Checkout from "../Reusable/Checkout";
import Gradient from "../Reusable/Gradient";


class LandingPage extends Component {
    render() {
        return (
            <div className="App">
                <Gradient/>
                <UnderwaterWrapper>
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
