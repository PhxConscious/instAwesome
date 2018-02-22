import React, {Component} from 'react';

import '../../Styles/UnderwaterWrapperStyles.css';

class UnderwaterWrapper extends Component {
    render() {
        return (
            <div className="underwaterBackground">
                {this.props.children}
            </div>
        )
    }
}

export default UnderwaterWrapper