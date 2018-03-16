import React, {Component} from 'react';
import '../../App.css';
import {Grid, Cell} from 'react-mdl';

import Gradient from "../Reusable/Gradient";
import BlueAppBg from "../Reusable/BlueAppBg";
import AppNavbar from "../Reusable/AppNav";
import SignUpForm from "../Forms/SignUp";

class UserProfile extends Component {
    render() {
        return (
            <div className="App">
                <Gradient/>
                <BlueAppBg>
                    <Grid className='pageCont'>
                        <Cell col={8} offsetDesktop={2} tablet={12} phone={12}>
                            <SignUpForm/>
                        </Cell>
                    </Grid>
                </BlueAppBg>
                <Gradient/>
            </div>
        );
    }
}

export default UserProfile;
