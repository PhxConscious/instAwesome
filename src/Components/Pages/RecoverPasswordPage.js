import React, {Component} from 'react';
import '../../App.css';

import UnderwaterWrapper from '../Reusable/UnderwaterWrapper';
import ShadowBox from '../Reusable/ShadowBox';
import ConsciousCenter from '../Reusable/ConsciousCenter';
import Gradient from "../Reusable/Gradient";
import RecoverPassword from '../Forms/RecoverPassword';


class RecoverPasswordPage extends Component {
    render() {
        return (
            <div className="App">
                <Gradient/>
                <UnderwaterWrapper>
                    <ConsciousCenter/>
                    <ShadowBox>
                        <RecoverPassword/>
                    </ShadowBox>
                </UnderwaterWrapper>
                <Gradient/>
            </div>
        );
    }
}

export default RecoverPasswordPage;
