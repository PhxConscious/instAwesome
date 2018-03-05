import React from 'react';
import {Switch, Route} from 'react-router-dom';

import LandingPage from './Pages/LandingPage';
import Dashboard from './LMS/Dashboard';
import RecoverUsernamePage from './Pages/RecoverUsernamePage';
import RecoverPasswordPage from './Pages/RecoverPasswordPage';

class Main extends React.Component {

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path="/" render={props => <LandingPage {...props} />}/>
                    <Route exact path="/learn/dashboard" render={props => <Dashboard {...props}/>}/>
                    <Route exact path="/forgotpassword" render={props => <RecoverPasswordPage {...props}/>}/>
                    <Route exact path="/forgotusername" render={props => <RecoverUsernamePage {...props}/>}/>
                    <Route exact path="/profile" render={props => <RecoverUsernamePage {...props}/>}/>
                </Switch>
            </main>
        )
    }
}

export default Main;
