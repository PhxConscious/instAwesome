import React, {Component} from 'react';
import '../../App.css';
import {Grid, Cell} from 'react-mdl';

import SignInForm from '../Forms/SignIn';
import UnderwaterWrapper from '../Reusable/UnderwaterWrapper';
import ShadowBox from '../Reusable/ShadowBox';
import ConsciousCenter from '../Reusable/ConsciousCenter';
import Gradient from "../Reusable/Gradient";

class LandingPage extends Component {
    render() {
        return (
            <div className="App">
                <UnderwaterWrapper>
                    <div className='pageCont'>
                        <Grid className='pageCont'>
                            <Cell col={6} offsetDesktop={3} tablet={12} phone={12}>
                                <ShadowBox>
                                    <SignInForm/>
                                </ShadowBox>
                            </Cell>
                        </Grid>
                    </div>
                </UnderwaterWrapper>
                <Gradient/>
            </div>
        );
    }
}

export default LandingPage;

