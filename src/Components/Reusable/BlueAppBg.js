import React, {Component} from 'react';
import '../../Styles/BlueAppBgStyles.css';


class BlueAppBg extends Component {
    render() {
        return (
            <div className="blueAppBackground">
                {this.props.children}
            </div>
        )
    }
}

export default BlueAppBg