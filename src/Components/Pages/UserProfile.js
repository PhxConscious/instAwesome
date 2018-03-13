import React, {Component} from 'react';
import '../../App.css';
import firebase from 'firebase';
import {Redirect} from 'react-router-dom';

import Gradient from "../Reusable/Gradient";
import BlueAppBg from "../Reusable/BlueAppBg";
import GreenFormContainer from "../Reusable/GreenFormContainer";
import axios from "axios/index";
import LandingPage from "./LandingPage";
import { Tab, Tabs, Grid, Cell } from 'react-mdl';
import Company from '../Forms/Company';
import ChangePassword from '../Forms/ChangePassword';
import OnTheWeb from "../Forms/OnTheWeb";
import PrimaryContact from "../Forms/PrimaryContact";


class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            activeTab: 0
        }
    }


    render() {
        const {redirect, activeTab} = this.state;
        if (redirect) {
            return <Redirect to='/'/>
        }
        return (
            <div className="App">
                <Gradient/>
                <BlueAppBg>
                  <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                    <Tab>Company</Tab>
                    <Tab>On The Web</Tab>
                    <Tab>Primary Contact</Tab>
                    <Tab>Change Password</Tab>
                  </Tabs>
                  <section>
                    <div style={{width: '80%', margin: 'auto',  height:'1000px'}}>
                      <Grid className="demo-grid-ruler">
                          <Cell className={activeTab === 0 ? "" : "hidden"} col={12}><Company/></Cell>
                          <Cell className={activeTab === 1 ? "" : "hidden"} col={12}><OnTheWeb/></Cell>
                          <Cell className={activeTab === 2 ? "" : "hidden"} col={12}><PrimaryContact/></Cell>
                          <Cell className={activeTab === 3 ? "" : "hidden"} col={12}><ChangePassword/></Cell>
                      </Grid>
                    </div>
                    <div className="content">Content for the tab: {this.state.activeTab}</div>
                  </section>
                </BlueAppBg>
                <Gradient/>
            </div>
        );
    }
}

export default UserProfile;
