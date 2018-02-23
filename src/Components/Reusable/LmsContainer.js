import React, {Component} from 'react'

class LmsContainer extends Component {
    render() {
        return(
            <div >
                <div className="mdl-grid lmsOuterContainer">
                    <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet lmsLeftSection">
                        <h1>Left</h1>
                    </div>
                    <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet lmsRightSection">
                        <h1>Right</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default LmsContainer