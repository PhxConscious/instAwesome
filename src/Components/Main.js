import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './Forms/LandingPage';
import Dashboard from './LMS/Dashboard';


class Main extends React.Component{

  render(){
    return(
      <main>
        <Switch>
          <Route exact path="/" render={props => <LandingPage {...props} /> } />
          <Route exact path="/learn/dashboard" render={props => <Dashboard {...props}/> } />
        </Switch>

      </main>
    )
  }
}

export default Main;
