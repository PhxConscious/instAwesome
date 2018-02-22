import React, {Component} from "react";
import firebase from 'firebase';

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
            <div className='navBarOuterContainer'>
                <div className="mdl-layout mdl-js-layout">
                    <header className="mdl-layout__header navBar">
                        <div className="mdl-layout__header-row navContentCont">
                            <i className="material-icons bookLogo">import_contacts</i>
                            <a className="mdl-navigation__link" href="">
                                <span className='learnText'>LEARN</span>
                            </a>
                            <div className="mdl-layout-spacer centerLogoCont">
                                <img className='centerLogo' src='https://i.imgur.com/qYqmu8v.png'></img>
                            </div>
                            <nav className="mdl-navigation mdl-layout--large-screen-only content">
                                <span className='phxConsciousText'>@phxconscious</span>
                                <a className="mdl-navigation__link" href="#">
                                    <button id="demo-menu-lower-right"
                                            className="mdl-button mdl-js-button mdl-button--icon">
                                        <i class="material-icons accountCircleIcon">account_circle</i>
                                    </button>
                                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                                        htmlFor="demo-menu-lower-right">
                                        <li className="mdl-menu__item">ACCOUNT</li>
                                        <li className="mdl-menu__item">FEEDBACK</li>
                                        <li onClick={this.userSignOut} className="mdl-menu__item">SIGN OUT</li>
                                    </ul>
                                </a>
                            </nav>
                        </div>
                    </header>
                    <div className="mdl-layout__drawer mdl-layout--small-screen-only">
                        <span className="mdl-layout-title">Title</span>
                        <nav className="mdl-navigation ">
                            <a className="mdl-navigation__link" href="">Link</a>
                        </nav>
                    </div>
                    <main className="mdl-layout__content">
                        <div className="page-content "></div>
                    </main>
                </div>
            </div>
        );
    }
}

export default AppNavbar;
