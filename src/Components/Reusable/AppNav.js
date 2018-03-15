import React, {Component} from "react";
import firebase from 'firebase';
import {Link, Redirect} from 'react-router-dom';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import '../../Styles/AppNavStyles.css';
import {connect} from "react-redux";
import {getUserProgress} from "../../redux/actions/userProgress";

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            email: ''
        }
    }

    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };

    userSignOut = () => {
      const { cookies } = this.props;
      if (firebase.auth().currentUser) {
          firebase.auth().signOut()
          console.log(`user: ${firebase.auth().currentUser.email} signed out, cookie: ${cookies.get('hash')} was removed`);
          cookies.remove('hash')
      } else {
          alert('no user signed in')
      }
    };

    render() {

        let { userInfo } = this.props;

        const {redirect} = this.state;

        return (
            <header className="">
                <div className="mdl-layout__header-row navContentCont">
                    <i className="material-icons bookLogo">import_contacts</i>
                    <Link to={userInfo ? '/learn/dashboard' : '/'} className="mdl-navigation__link learnTextCont" href="">
                        <span className='learnText'>LEARN</span>
                    </Link>
                    <div className="mdl-layout-spacer centerLogoCont">
                        <img className='centerLogo' src='https://i.imgur.com/qYqmu8v.png' alt="blah"/>
                    </div>
                    <nav className="mdl-navigation mdl-layout--large-screen-only content">
                        <div className='rightSideLogoCont'>
                            <span className='phxConsciousText phxConsciousTextCont'>{userInfo ? userInfo.user_email : "" }</span>
                        </div>
                            <button id="demo-menu-lower-right"
                                    className="mdl-button mdl-js-button mdl-button--icon">
                                <i className="material-icons accountCircleIcon">account_circle</i>
                            </button>
                            <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                                htmlFor="demo-menu-lower-right">
                                <Link className='linkTo' to='/profile'>
                                    <li className="mdl-menu__item">ACCOUNT</li>
                                </Link>
                                <Link className='linkTo' to='/feedback'>
                                    <li className="mdl-menu__item">FEEDBACK</li>
                                </Link>
                                <Link className='linkTo' to='/expertdashboard'>
                                    <li className="mdl-menu__item">EXPERT ONLY</li>
                                </Link>
                                <li onClick={this.userSignOut} className="mdl-menu__item">SIGN OUT</li>
                            </ul>
                    </nav>
                </div>
            </header>
        );


    }
}

const mapStateToProps = state => ({
    currentValues: state.currentValues,
    userInfo: state.userProgress.currentUser
});


export default withCookies(connect(mapStateToProps, null)(AppNavbar));
