import React, {Component} from 'react';
import '../../App.css';
import {Grid, Cell} from 'react-mdl';

import UnderwaterWrapper from '../Reusable/UnderwaterWrapper';
import ShadowBox from '../Reusable/ShadowBox';
import Gradient from "../Reusable/Gradient";
import RecoverPassword from '../Forms/RecoverPassword';

class RecoverPasswordPage extends Component {
    render() {
        return (
            <div className="App">
                <Gradient/>
                <UnderwaterWrapper>
                    <div className='pageCont'>
                        <Grid className='pageCont'>
                            <Cell col={6} offsetDesktop={3} tablet={12} phone={12}>
                                <ShadowBox>
                                    <RecoverPassword/>
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

export default RecoverPasswordPage;

