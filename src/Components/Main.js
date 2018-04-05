import React from 'react';
import {Switch, Route} from 'react-router-dom';

import LandingPage from './Pages/LandingPage';
import Dashboard from './LMS/Dashboard';
import RecoverUsernamePage from './Pages/RecoverUsernamePage';
import RecoverPasswordPage from './Pages/RecoverPasswordPage';
import UserProfile from "./Pages/UserProfile";
import SignUp from "./Pages/SignUp";
import Splash from "./Pages/Splash";
import ExpertDashboard from "./Pages/ExpertDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import Forum from "./Pages/Forum";
import Payment from "./Pages/Payment";
import AppNav from './Reusable/AppNav';
import Gradient from "./Reusable/Gradient";
import ChatLayout from "./Chat/ChatLayout";
import DataProvider from './Reusable/DataProvider';
import AuthRedirect from './Reusable/AuthRedirect';



class Main extends React.Component {

    render() {
        return (
            <div>
                <main>
                    <Switch>
                        {
                            // You could wrap these all in one <AuthRedirect ifLoggedIn={true} to={"/splash"} />
                            // if you prefixed the route with 'auth'.  You just need a base route that won't match
                            // any of the logged-in routes in the app.
                        }
                        <Route exact path="/" render={props =>
                            <AuthRedirect ifLoggedIn={true} to={"/splash"}>
                                <LandingPage {...props} />
                            </AuthRedirect>
                        }/>
                        <Route exact path="/signup" render={props =>
                            <AuthRedirect ifLoggedIn={true} to={"/splash"}>
                                <SignUp {...props}/>
                            </AuthRedirect>
                        }/>

                        {
                            // check for login and redirect if we are on any one of these routes
                        }
                        <Route render={props =>
                            <AuthRedirect ifLoggedIn={false} to={"/"}>
                                <DataProvider
                                    load={['setFirebaseId', 'getUserProgress', 'getCompanyList', 'getLmsContent']}
                                    waitFor={['userProgress.currentUser', 'currentValues']}>

                                    <AppNav>
                                        <Route exact path="/splash" render={props => <Splash {...props}/>}/>
                                        <Route exact path="/learn/dashboard" render={props => <Dashboard {...props}/>}/>
                                        <Route exact path="/forgotpassword"
                                               render={props => <RecoverPasswordPage {...props}/>}/>
                                        <Route exact path="/forgotusername"
                                               render={props => <RecoverUsernamePage {...props}/>}/>
                                        <Route exact path="/profile" render={props => <UserProfile {...props}/>}/>
                                        <Route exact path="/expert/dashboard" render={props => <ExpertDashboard {...props}/>}/>
                                        <Route exact path="/admin/dashboard" render={props => <AdminDashboard {...props}/>}/>
                                        <Route exact path="/forum" render={props => <Forum {...props}/>}/>
                                        <Route exact path="/payment" render={props => <Payment {...props}/>}/>
                                        <Route exact path="/chat" render={props => <ChatLayout {...props}/>}/>
                                    </AppNav>

                                </DataProvider>
                            </AuthRedirect>
                        } />

                    </Switch>
                </main>
            </div>
        )
    }
}

export default Main;
