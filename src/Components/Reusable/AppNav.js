import React, {Component} from "react";
import firebase from 'firebase';
import {Link, Redirect} from 'react-router-dom';
import {Grid, Cell} from 'react-mdl'
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';
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
        const {cookies} = this.props;
        if (firebase.auth().currentUser) {
            firebase.auth().signOut()
            console.log(`user: ${firebase.auth().currentUser.email} signed out, cookie: ${cookies.get('hash')} was removed`);
            cookies.remove('hash')
        } else {
            alert('no user signed in')
        }
    };

    render() {

        let {userInfo} = this.props;

        const {redirect} = this.state;

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
                    <div className="mdl-layout-spacer centerLogoCont">
                        <img className='centerLogo' src='https://i.imgur.com/qYqmu8v.png' alt="blah"/>
                    </div>
                </Cell>
                <Cell className='rightCol' col={4} hideTablet={true} hidePhone={true}>
                    <Grid>
                        <Cell col={10}>
                            <div className='rightSideLogoCont'>
                                <span
                                    className='phxConsciousText phxConsciousTextCont'>{userInfo ? userInfo.user_email : "" }</span>
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
                                <Link className='linkTo' to='/expertdashboard'>
                                    <li className="mdl-menu__item">EXPERT ONLY</li>
                                </Link>
                                <li onClick={this.userSignOut} className="mdl-menu__item">SIGN OUT</li>
                            </ul>
                        </Cell>
                    </Grid>
                </Cell>
            </Grid>
        );


    }
}

const mapStateToProps = state => ({
    currentValues: state.currentValues,
    userInfo: state.userProgress.currentUser
});


export default withCookies(connect(mapStateToProps, null)(AppNavbar));
