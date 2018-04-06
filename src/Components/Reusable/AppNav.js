import React, {Component} from "react";
import firebase from 'firebase';
import {Link} from 'react-router-dom';
import {Grid, Cell} from 'react-mdl'
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
import '../../Styles/AppNavStyles.css';
import {connect} from "react-redux";
import {userLogout} from "../../redux/actions/currentValues";
import Gradient from "./Gradient";

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    userSignOut = () => {
        const {cookies} = this.props;
        if (firebase.auth().currentUser) {
            console.log(`user: ${firebase.auth().currentUser.email} signed out, cookie: ${cookies.get('firebase_id')} was removed`);
            this.props.userLogout();
            cookies.remove('firebase_id')
            firebase.auth().signOut()
            // @TODO clear out current and user values here
            // reset store
        } else {
            alert('no user signed in')
        }
    };

    isUserExpert = () => {
        if (this.props.userInfo && this.props.userInfo.isExpert) {
            return (
                <Link className='linkTo mdl-navigation__link mdl-menu__item' to='/expert/dashboard'>
                    <div className='expertAdminTabs'>
                        EXPERT ONLY
                    </div>
                </Link>
            )
        }
        return;
    };

    isUserAdmin = () => {
        if (this.props.userInfo && this.props.userInfo.isAdmin) {
            return (
                <Link className='linkTo mdl-navigation__link mdl-menu__item' to='/admin/dashboard'>
                    <div className='expertAdminTabs'>
                        ADMIN ONLY
                    </div>
                </Link>
            )
        }
        return;
    };

    render() {

        let {userInfo} = this.props;

        return (
            <div className="mdl-layout mdl-js-layout">
                <div className="mdl-layout__drawer mdl-layout--small-screen-only drawerIcon">
                    {/*<span className="mdl-layout-title">Title</span>*/}
                    <nav className="mdl-navigation ">
                        <Link to='/profile' className="mdl-navigation__link" href="">ACCOUNT</Link>
                        <Link to={userInfo ? '/learn/dashboard' : '/'}
                              className="mdl-navigation__link disabled-link">LEARN</Link>

                        {this.isUserExpert()}
                        {this.isUserAdmin()}

                        <Link className='mdl-navigation__link' to='/forum'>FORUM</Link>
                        <Link className='mdl-navigation__link' to='/' onClick={this.userSignOut}>
                            SIGN OUT
                        </Link>
                    </nav>
                </div>

                <div className="page-content">
                    <Grid className="navContentCont">
                        <Cell className='leftCol' col={4} hideTablet={true} hidePhone={true}>
                            <div className='leftSideLogoCont'>
                                <Grid>
                                    <Link className='disabled-link' to={userInfo ? '/learn/dashboard' : '/'}>
                                        <Cell col={2}>
                                            <i className="bookIcon fab fa-leanpub mdl-layout--large-screen-only"/>
                                        </Cell>
                                    </Link>
                                    <Cell className='learnText' col={6}>
                                        <div className='learnCont'>
                                            <Link to={userInfo ? '/learn/dashboard' : '/'}
                                                  className="learnTextCont linkTo mdl-layout--large-screen-only disabled-link"
                                            >
                                                Learn
                                            </Link>
                                        </div>
                                    </Cell>
                                </Grid>
                            </div>
                        </Cell>
                        <Cell className='centerCol' col={4} tablet={12}>
                          <span>
                            <Link to='/splash'
                                  className="mdl-layout-spacer centerLogoCont">
                                <img className='centerLogo' src='https://i.imgur.com/qYqmu8v.png' alt="blah"/>
                            </Link>
                          </span>
                            <span>
                            {/*<Link to='/payment'*/}
                                {/*className="mdl-layout-spacer centerLogoCont">*/}
                                {/*<img className='centerLogo' src='https://www.mochasoft.dk/images/buynow.jpg' alt="blah"/>*/}
                                {/*</Link>*/}
                          </span>

                        </Cell>
                        <Cell className='rightCol' col={4} hideTablet={true} hidePhone={true}>
                            <Grid>
                                <Cell col={10}>
                                    <div className='rightSideLogoCont'>
                                <span
                                    className='phxConsciousText phxConsciousTextCont'>{userInfo ? userInfo.user_email : ""}</span>
                                    </div>
                                </Cell>
                                <Cell col={2}>
                                    <button id="demo-menu-lower-right"
                                            className="mdl-button  mdl-button--icon">
                                        <i className="profileIcon fas fa-user-circle"/>
                                    </button>
                                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                                        htmlFor="demo-menu-lower-right">
                                        <Link className='linkTo mdl-menu__item' to='/profile'>
                                            <li className="">ACCOUNT</li>
                                        </Link>

                                        {this.isUserExpert()}
                                        {this.isUserAdmin()}

                                        <Link className='linkTo mdl-menu__item' to='/forum'>FORUM</Link>
                                        <Link className='linkTo mdl-menu__item' onClick={this.userSignOut} to='/'>
                                            SIGN OUT
                                        </Link>
                                    </ul>
                                </Cell>
                            </Grid>
                        </Cell>
                    </Grid>
                    <Gradient/>
                </div>
                <main className="mdl-layout__content">
                    {this.props.children}
                </main>
                <Gradient/>
            </div>
        );

    }
}

const mapStateToProps = state => ({
    userInfo: state.userProgress.currentUser
});

const mapDispatchToProps = dispatch => {
    return {
        userLogout: () => {
            dispatch(userLogout())
        }
    }
}


export default withCookies(connect(mapStateToProps, mapDispatchToProps)(AppNavbar));
