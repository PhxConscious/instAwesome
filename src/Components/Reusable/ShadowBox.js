import React, {Component} from 'react';

import '../../Styles/ShadowBoxStyles.css';

class ShadowBox extends Component {
    render() {
        return (
            <div className="shadowBoxCont">
                <div className='shadowBoxInnerCont'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default ShadowBox