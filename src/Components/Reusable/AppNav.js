import React, {Component} from "react";
import firebase from 'firebase';
import {Link} from 'react-router-dom';

import '../../Styles/AppNavStyles.css';


class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    userSignOut() {
        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
            return console.log(`user: ${firebase.auth().currentUser.email} signed out`);
        }
        return alert('no user signed in')
    }

    render() {
        return (
            <div className=''>
                <header className=" mdl-layout__header navBar ">
                    <div className="mdl-layout__header-row navContentCont">
                        <i className="material-icons bookLogo">import_contacts</i>
                        <Link to='/learn/dashboard' className="mdl-navigation__link learnTextCont" href="">
                            <span className='learnText'>LEARN</span>
                        </Link>
                        <div className="mdl-layout-spacer centerLogoCont">
                            <img className='centerLogo' src='https://i.imgur.com/qYqmu8v.png' alt="blah"></img>
                        </div>
                        <nav className="mdl-navigation mdl-layout--large-screen-only content">
                            <span className='phxConsciousText phxConsciousTextCont'>@phxconscious</span>

                                <button id="demo-menu-lower-right"
                                        className="mdl-button mdl-js-button mdl-button--icon">
                                    <i className="material-icons accountCircleIcon">account_circle</i>
                                </button>
                                <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                                    htmlFor="demo-menu-lower-right">
                                    <Link className='linkTo' to='/profile'>
                                        <li className="mdl-menu__item">ACCOUNT</li>
                                    </Link>
                                    <li className="mdl-menu__item">FEEDBACK</li>
                                    <li onClick={this.userSignOut} className="mdl-menu__item">SIGN OUT</li>
                                </ul>

                        </nav>
                    </div>
                </header>
            </div>
        );
    }
}

export default AppNavbar;
