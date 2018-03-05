import React, {Component} from 'react';

import '../../Styles/ShadowBoxStyles.css';

class ShadowBox extends Component {
    render() {
        return (
            <div className="shadowBoxCont content-column mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-cell--12-col-phone mdl-cell--top">
                <div className='shadowBoxInnerCont'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default ShadowBox