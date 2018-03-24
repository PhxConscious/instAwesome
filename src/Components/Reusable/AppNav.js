import React, {Component} from "react";
import firebase from 'firebase';
import {Link, Redirect} from 'react-router-dom';
import {Grid, Cell} from 'react-mdl'
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
import '../../Styles/AppNavStyles.css';
import {connect} from "react-redux";
import {getUserProgress} from "../../redux/actions/userProgress";
import {userLogout} from "../../redux/actions/currentValues";

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
        const {cookies} = this.props;
        if (firebase.auth().currentUser) {
            console.log(`user: ${firebase.auth().currentUser.email} signed out, cookie: ${cookies.get('hash')} was removed`);
            this.props.userLogout();
            cookies.remove('hash')
            firebase.auth().signOut()
            // @TODO clear out current and user values here
            // reset store
        } else {
            alert('no user signed in')
        }
    };

    render() {

        let {userInfo} = this.props;

        return (
            <Grid className="navContentCont">
                <Cell className='leftCol' col={4} hideTablet={true} hidePhone={true}>
                    <div className='leftSideLogoCont'>
                        <Grid>
                            <Cell col={2}>
                                <i className="bookIcon fab fa-leanpub"/>
                            </Cell>
                            <Cell className='learnText' col={6}>
                                <div className='learnCont'>
                                    <Link
                                        to={userInfo ? '/learn/dashboard' : '/'}
                                        className="learnTextCont linkTo">
                                        Learn
                                    </Link>
                                </div>
                            </Cell>
                        </Grid>
                    </div>
                </Cell>
                <Cell className='centerCol' col={4} tablet={12}>
                    <Link to='/splash'
                          className="mdl-layout-spacer centerLogoCont">
                        <img className='centerLogo' src='https://i.imgur.com/qYqmu8v.png' alt="blah"/>
                    </Link>
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
                                <Link className='linkTo' to='/profile'>
                                    <li className="mdl-menu__item">ACCOUNT</li>
                                </Link>
                                <Link className='linkTo' to='/feedback'>
                                    <li className="mdl-menu__item">FEEDBACK</li>
                                </Link>
                                <Link className='linkTo' to='/expert/dashboard'>
                                    <li className="mdl-menu__item">EXPERT ONLY</li>
                                </Link>
                                <Link className='linkTo' to='/admin/dashboard'>
                                    <li className="mdl-menu__item">ADMIN ONLY</li>
                                </Link>
                                <Link className='linkTo' to='/'>
                                    <li onClick={this.userSignOut} className="mdl-menu__item">SIGN OUT</li>
                                </Link>
                            </ul>
                        </Cell>
                    </Grid>
                </Cell>
                <div className="mdl-layout mdl-js-layout mdl-layout--small-screen-only">
                    <div className="mdl-layout__drawer">
                        {/*<span className="mdl-layout-title">Title</span>*/}
                        <nav className="mdl-navigation">
                            <Link to='/profile' className="mdl-navigation__link" href="">ACCOUNT</Link>
                            <Link to='/feedback' className="mdl-navigation__link" href="">FEEDBACK</Link>
                            <Link to='/expert/dashboard' className="mdl-navigation__link" href="">EXPERT ONLY</Link>
                            <Link to='/admin/dashboard' className="mdl-navigation__link" href="">ADMIN ONLY</Link>
                        </nav>
                    </div>
                    {/*<main className="mdl-layout__content">*/}
                        {/*<div className="page-content"></div>*/}
                    {/*</main>*/}
                </div>
            </Grid>
        );

    }
}

const mapStateToProps = state => ({
    currentValues: state.currentValues,
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
