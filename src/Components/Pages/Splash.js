import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import {withCookies} from 'react-cookie';
import {Grid, Cell, Snackbar} from 'react-mdl';
import '../../Styles/SplashPageStyles..css';

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goBackThruLogin: false,
            isSnackbarActive: false,
            snackbarText: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loginRefresh = this.loginRefresh.bind(this);
        this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
        this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    }


    handleSubmit() {
        this.setState({goBackThruLogin: true})
    }


    loginRefresh() {
        console.log("loginRefresh");
        const {cookies} = this.props;
        cookies.remove('hash');
        this.setState({snackbarText: "Sorry you're having technical difficulties! Please bear with us as continue improving as quickly as we can. Clicking this link will ensure your login info is reset - try logging in again."});
        this.handleShowSnackbar();
        setTimeout(() => {
            window.location.reload();
        }, 3000)
    }


    renderSnackbar = () => {
        return (
            <Snackbar className='snackbar' active={this.state.isSnackbarActive} timeout={2500}
                      onTimeout={this.handleTimeoutSnackbar}>{this.state.snackbarText}</Snackbar>
        )
    };


    handleShowSnackbar() {
        this.setState({isSnackbarActive: true});
    }


    handleTimeoutSnackbar() {
        this.setState({isSnackbarActive: false});
    }


    render() {
        let {userInfo, companyInfo} = this.props;
        let {goBackThruLogin} = this.state;

        if (goBackThruLogin) {
            return <Redirect to={'/'}/>
        }


        if (userInfo && !userInfo.user_email) {
            return (
                <div className='splashPageContent'>
                    <p className='splashText'>Thanks for coming to see us. Please log back in</p>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            this.handleSubmit()
                        }}>
                        <button className="splashButton" type="submit">
                            Login now
                        </button>
                    </form>
                    <button className="splashButton" onClick={this.loginRefresh}>
                        Trouble logging in?
                    </button>

                    {this.renderSnackbar()}
                </div>
            )
        } else {
            return (
                <div className='splashPageContent'>
                    {/*This is the spash page where users gain an idea of what they can do on the site.*/}
                    {/*We could also put up some kind of article feed - do we have content coming off of wordpress?*/}
                    <div>
                        {companyInfo.companyList && companyInfo.companyList.length === 0 ? <div>
                            <p className='addCompanyMainText'>We notice you haven't set up your company yet...</p>
                            <p className='addCompanyMainText'>
                                Please set up your company profile immediately so that we can
                                better help you.
                            </p>
                            <br/>
                            <Link className='addMyCompanyText' to='/profile'>
                                Add My Company
                            </Link>
                        </div> : <div>
                            <Grid>
                                <Cell col={2} hideTablet={true} hidePhone={true}>
                                    <div>
                                        <img className='arrowLeft' src='https://i.imgur.com/qOttilO.png'
                                             alt="blah"/>
                                    </div>
                                </Cell>
                                <Cell col={2} hideTablet={true} hidePhone={true} className='leftArrowText'>
                                    {/*Start your training*/}
                                    LMS Coming April 26th
                                </Cell>
                                <Cell col={4} tablet={12} phone={12}>
                                    <p className='splashText'>
                                        Welcome back to instAwesome. Ready to get started?
                                    </p>
                                </Cell>
                                <Cell col={2} hideTablet={true} hidePhone={true} className='rightArrowText'>
                                    Finish your profile
                                </Cell>
                                <Cell col={2} hideTablet={true} hidePhone={true}>
                                    <div>
                                        <img className='arrowRight' src='https://i.imgur.com/0ToSF6G.png'
                                             alt="blah"/>
                                    </div>
                                </Cell>
                                <Cell hideDesktop={true} hideTablet={false} hidePhone={false}>
                                    <Link className='startTrainingTextMobile disabled-link' to='/learn/dashboard'>
                                        {/*Start Your Training*/}
                                        LMS Coming April 26th
                                    </Link>
                                </Cell>
                                <Cell hideDesktop={true} hideTablet={false} hidePhone={false}>
                                    <Link className='finishProfileTextMobile' to='/profile'>
                                        Finish your profile
                                    </Link>
                                </Cell>
                            </Grid>
                        </div>}
                    </div>
                </div>
            )
        }
    }
}


const mapStateToProps = state => ({
    userInfo: state.userProgress.currentUser,
    companyInfo: state.companyInfo
});
export default withCookies(connect(mapStateToProps, null)(Splash));
