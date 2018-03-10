import React, {Component} from 'react';
import '../../App.css';
import firebase from 'firebase';
import {Redirect} from 'react-router-dom';

import Gradient from "../Reusable/Gradient";
import BlueAppBg from "../Reusable/BlueAppBg";
import GreenFormContainer from "../Reusable/GreenFormContainer";
import AppNavbar from "../Reusable/AppNav";
import axios from "axios/index";
import LandingPage from "./LandingPage";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {

    }

    render() {
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/'/>
        }
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