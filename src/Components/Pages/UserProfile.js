import React, {Component} from 'react';
import '../../App.css';

import ConsciousCenter from '../Reusable/ConsciousCenter';
import Gradient from "../Reusable/Gradient";
import BlueAppBg from "../Reusable/BlueAppBg";
import GreenFormContainer from "../Reusable/GreenFormContainer";
import AppNavbar from "../Reusable/AppNav";

class UserProfile extends Component {
    render() {
        return (
            <div className="App">
                <AppNavbar/>
                <Gradient/>
                <BlueAppBg>
                    <GreenFormContainer/>
                </BlueAppBg>
                <Gradient/>
            </div>
        );
    }
}

export default UserProfile;
