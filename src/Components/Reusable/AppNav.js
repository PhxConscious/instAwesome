import React, {Component} from "react";
import firebase from 'firebase';
import {Link, Redirect} from 'react-router-dom';

import '../../Styles/AppNavStyles.css';
import UserProfile from "../Pages/UserProfile";
import axios from "axios/index";


class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            email: ''
        }
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        if (firebase.auth().currentUser) {
            axios.get('http://localhost:8080/users/' + firebase.auth().currentUser.uid)
                .then(res => {
                    this.setState({email: res.data.user_email})
                    console.log(res.data)
                });
        } else {
            return null
        }
    };

    userSignOut = () => {
        if (firebase.auth().currentUser) {
            firebase.auth().signOut()
                .then(() => {
                    this.setState({redirect: true})
                });
            return console.log(`user: ${firebase.auth().currentUser.email} signed out`);
        } else {
            alert('no user signed in')
        }
    };

    displayEmail = () => {
        if (firebase.auth().currentUser) {
            return <p className='learnText'>{firebase.auth().currentUser.email}</p>
        }
    };

    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/'/>;
        }

        return (
            <div className=''>
                <header className=" mdl-layout__header navBar ">
                    <div className="mdl-layout__header-row navContentCont">
                        <i className="material-icons bookLogo">import_contacts</i>
                        <Link to='/learn/dashboard' className="mdl-navigation__link learnTextCont" href="">
                            <span className='learnText'>LEARN</span>
                        </Link>
                        <div className="mdl-layout-spacer centerLogoCont">
                            <img className='centerLogo' src='https://i.imgur.com/qYqmu8v.png' alt="blah"/>
                        </div>
                        <nav className="mdl-navigation mdl-layout--large-screen-only content">
                            <span className='phxConsciousText phxConsciousTextCont'>{this.state.email}</span>

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
