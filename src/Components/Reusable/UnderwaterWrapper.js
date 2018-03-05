import React, {Component} from 'react';

import '../../Styles/UnderwaterWrapperStyles.css';

class UnderwaterWrapper extends Component {
    render() {
        return (
            <div className="underwaterBackground underWaterInnerCont content-grid mdl-grid">
                <div className=''>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default UnderwaterWrapper