import React, {Component} from 'react';
import '../../App.css';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Gradient from "../Reusable/Gradient";
import BlueAppBg from "../Reusable/BlueAppBg";
import {Tab, Tabs, Grid, Cell} from 'react-mdl';
import Company from '../Forms/Company';
import ChangePassword from '../Forms/ChangePassword';
import OnTheWeb from "../Forms/OnTheWeb";
import PrimaryContact from "../Forms/PrimaryContact";
import CompanyInfo from "../Forms/CompanyInfo";


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
        const {companyInfo, userInfo} = this.props;

        // if not logged in, go to login to get user info
        if (userInfo.currentUser && !userInfo.currentUser.user_id) {
            return <Redirect to='/'/>
        }

        // user must have company to access anything but the createCompany tab
        let userHasCompany = false;
        if (companyInfo.companyList && companyInfo.companyList[0]) {
            userHasCompany = true;
        }

        // don't let users add more companies if they already have one create - for alpha version at least
        let isMaxOneCompany = true;
        if (companyInfo.companyList && companyInfo.companyList.length >= 1) {
            isMaxOneCompany = false;
            // don't let tab default to "createCompany" form
            this.state.activeTab === 0 ? this.setState({
                activeTab: 1
            }) : null;
        }

        return (
            <div className="App">
                <BlueAppBg>
                    <Tabs activeTab={this.state.activeTab}  onChange={(tabId) => this.setState({activeTab: tabId})}
                          ripple>
                        <Tab className={isMaxOneCompany ? "" : "hidden"}><span className="consciousBlueColor">Add Company</span></Tab>

                        <Tab className={userHasCompany ? "" : "hidden"}><span className="consciousBlueColor">Edit Company Info</span></Tab>
                        <Tab className={userHasCompany ? "" : "hidden"}><span className="consciousBlueColor">On The Web</span></Tab>
                        <Tab className={userHasCompany ? "" : "hidden"}><span className="consciousBlueColor">Primary Contact</span></Tab>
                        <Tab className={userHasCompany ? "" : "hidden"}><span className="consciousBlueColor">Change Password</span></Tab>
                    </Tabs>
                    <section className="tabSection">
                        <div style={{width: '80%', margin: 'auto', height: '1000px'}}>
                            <Grid className="demo-grid-ruler">
                                <Cell className={activeTab === 0 ? "" : "hidden"} col={12}><Company/></Cell>
                                <Cell className={activeTab === 1 && userHasCompany ? "" : "hidden"} col={12}><CompanyInfo/></Cell>
                                <Cell className={activeTab === 2 && userHasCompany ? "" : "hidden"} col={12}><OnTheWeb/></Cell>
                                <Cell className={activeTab === 3 && userHasCompany ? "" : "hidden"} col={12}><PrimaryContact/></Cell>
                                <Cell className={activeTab === 4 && userHasCompany ? "" : "hidden"} col={12}><ChangePassword/></Cell>
                            </Grid>
                        </div>
                        {/*<div className="content">Content for the tab: {this.state.activeTab}</div>*/}
                    </section>
                </BlueAppBg>
                <Gradient/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    companyInfo: state.companyInfo,
    userInfo: state.userProgress,
})

export default connect(mapStateToProps, null)(UserProfile);
