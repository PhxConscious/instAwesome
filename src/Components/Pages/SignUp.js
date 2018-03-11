import React, {Component} from 'react';
import '../../App.css';

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
                    <SignUpForm/>
                </BlueAppBg>
                <Gradient/>
            </div>
        );
    }
}

export default UserProfile;
