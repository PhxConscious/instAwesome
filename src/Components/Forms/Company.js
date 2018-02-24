import React, {Component} from "react";
import '../../Styles/FormsStyles.css';

class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            styleGuide: '',
            primaryGoal: '',
            error: '',
            loading: false
        };
    }

    onButtonPress() {
        this.setState({error: '', loading: true});
        console.log('button works and displays loading...')
    }

    renderButton() {
        if (this.state.loading) {
            return <p id='prog1' className="mdl-spinner mdl-js-spinner mdl-spinner--single-color is-active"></p>
        }
        return (
            <button
                id='formButton'
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                onClick={() => this.onButtonPress()}>
                <div>UPDATE</div>
            </button>
        );
    }

    handleNameTextChange = (event) => {
        this.setState({name: event.target.value});
        console.log(this.state.name)
    };

    handleStyleGuideTextChange = (event) => {
        this.setState({styleGuide: event.target.value});
        console.log(this.state.styleGuide)
    };

    handlePrimaryGoalTextChange = (event) => {
        this.setState({primaryGoal: event.target.value});
        console.log(this.state.primaryGoal)
    };

    render() {
        return (
            <div>
                <form className="formCont" action="#">
                    <div className='inputCont'>
                        <div className='formTitleCont'>
                            <p className="formTitle">COMPANY</p>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>NAME</p>
                            </div>
                            <input
                                className="formInput"
                                type="text"
                                onChange={this.handleNameTextChange}
                                placeholder='Conscious Creative'
                                value={this.state.name}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>STYLE GUIDE</p>
                            </div>
                            <input
                                className="formInput"
                                type="text"
                                onChange={this.handleStyleGuideTextChange}
                                placeholder='https://phxconscious.com'
                                value={this.state.styleGuide}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>PRIMARY GOAL</p>
                            </div>
                            <input
                                className="formInput"
                                type="text"
                                onChange={this.handlePrimaryGoalTextChange}
                                placeholder='Brand awareness'
                                value={this.state.primaryGoal}>
                            </input>
                        </div>
                    </div>
                    <br/>
                    {this.renderButton()}
                </form>
            </div>
        );
    }
}

export default Company;
