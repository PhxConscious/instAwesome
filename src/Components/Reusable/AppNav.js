import React, {Component} from "react";
import firebase from 'firebase';
import {Link, Redirect} from 'react-router-dom';

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

    componentDidMount() {
        this.props.fetchUserProgress(this.props.currentValues.currentFbId);
    }

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

    render() {

        let { userInfo } = this.props;

        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/'/>;
        }

        if(true){
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
                                  <li className="mdl-menu__item">FEEDBACK</li>
                                  <li onClick={this.userSignOut} className="mdl-menu__item">SIGN OUT</li>
                              </ul>
                      </nav>
                  </div>
              </header>
          );
        } else {
          return <div>...loading</div>
        }

    }
}

const mapStateToProps = state => ({
    currentValues: state.currentValues,
    userInfo: state.userProgress.currentUser
});

const mapDispatchToProps = dispatch => {
    return {
        fetchUserProgress : (firebaseId) => {
            dispatch(getUserProgress(firebaseId))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar)
