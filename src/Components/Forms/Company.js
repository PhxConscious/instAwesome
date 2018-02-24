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

    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value});
        // console.log(`this is the current state ${this.state}`)
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
                                name='name'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='Conscious Creative'
                                value={this.state.name}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>STYLE GUIDE</p>
                            </div>
                            <input
                                name='styleGuide'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
                                placeholder='https://phxconscious.com'
                                value={this.state.styleGuide}>
                            </input>
                        </div>
                        <div className="formInputCont">
                            <div>
                                <p className='inputLabel'>PRIMARY GOAL</p>
                            </div>
                            <input
                                name='primaryGoal'
                                className="formInput"
                                type="text"
                                onChange={this.handleInputTextChange}
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
