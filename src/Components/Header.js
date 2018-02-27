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
      <header id="headerContainer">
        <h4 id="title">Temp nav header</h4>
        <div className="navButton" >
          <Link to="/learn/dashboard" >LMS Dashboard
          </Link>
        </div>
      </header>
    )
  }
}

export default Header;
