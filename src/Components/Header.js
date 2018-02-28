import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import '../Styles/HeaderStyles.css'

class Header extends React.Component {
  onClick(){
    console.log("clicked")
  }
  render(){
    return(
      <div id="headerEmptyBlock">
        <header id="headerContainer" onClick={this.onClick}>
          <h4 id="title">Temp nav header</h4>
          <div className="navButton" >
            <Link onClick={this.onClick} to="/learn/dashboard" >LMS Dashboard
            </Link>
          </div>
          <div className="navButton" >
            <Link onClick={this.onClick} to="/" >Landing Page
            </Link>
          </div>
        </header>
      </div>
    )
  }
}

export default Header;
