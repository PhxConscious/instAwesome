import React, {Component} from "react";

class LoginForm extends Component {
    render() {
        return (
            <form className="basicForm" action="#">
                <div className="mdl-textfield mdl-js-textfield">
                    <input className="mdl-textfield__input" type="text" id="sample1"></input>
                    <label className="mdl-textfield__label">Username</label>
                </div>
                <br/>
                <div className="mdl-textfield mdl-js-textfield">
                    <input className="mdl-textfield__input" type="text" id="sample1"></input>
                    <label className="mdl-textfield__label">Password</label>
                </div>
                <br/>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                    Submit
                </button>
            </form>
        );
    }
}

export default LoginForm;
