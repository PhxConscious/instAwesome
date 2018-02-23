import React, {Component} from 'react'
import GreenFormContainerStyles from '../../Styles/GreenFormContainerStyles.css';
import CompanyInfo from '../Forms/CompanyInfo';
import ChangePassword from '../Forms/ChangePassword';
import ContactInfo from '../Forms/ContactInfo';

class GreenFormContainer extends Component {
    render() {
        return(
            <div >
                <div className="mdl-grid greenFormOuterContainer">
                    <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet greenFormLeftCont">
                        <div className='greenFormLeftTop'>
                           <CompanyInfo/>
                        </div>
                        <div className='greenFormLeftBottom'>
                           <ChangePassword/>
                        </div>
                    </div>
                    <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet greenFormRightSection">
                        <ContactInfo/>
                    </div>
                </div>
            </div>
        )
    }
}

export default GreenFormContainer