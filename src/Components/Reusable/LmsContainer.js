import React, {Component} from 'react'
import GreenFormContainerStyles from '../../Styles/GreenFormContainerStyles.css';
import CompanyInfo from '../Forms/CompanyInfo';
import ChangePassword from '../Forms/ChangePassword';
import ContactInfo from '../Forms/ContactInfo';

class LmsContainer extends Component {
    render() {
        return(
            <div >
                <div className="mdl-grid lmsOuterContainer">
                    <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet lmsLeftSection">

                    </div>
                    <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet lmsRightSection">

                    </div>
                </div>
            </div>
        )
    }
}

export default LmsContainer