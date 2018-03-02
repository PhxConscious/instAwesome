import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/HeaderStyles.css'

class Header extends React.Component {

  render(){
    return(
      <div id="headerEmptyBlock">
        <header id="headerContainer">
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
