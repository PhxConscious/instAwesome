import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Textfield} from 'react-mdl';
import '../../Styles/FormsStyles.css';

class CopyTextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            copied: false
        }
    }


    handleInputTextChange = e => {
        this.setState({[e.target.name]: e.target.value, copied: false});
        // console.log(`this is the current state ${this.state}`)
    };

    onCopy = () => {
        this.setState({copied: true});
    };


    render() {
        return (
            <div className='textFieldCont'>
                <input className='textField' value={this.state.value}
                       onChange={({target: {value}}) => this.setState({value, copied: false})} /><br/>
                <CopyToClipboard text={this.state.value}
                                 onCopy={() => this.setState({copied: true})}>
                    <button className='textFieldButton'>COPY TO CLIPBOARD</button>
                </CopyToClipboard>
                <br/>

                {this.state.copied ? <span className='copiedText'>Copied.</span> : null}
            </div>
        );
    };
}

export default CopyTextField


// class TextInput extends React.Component {
//
//   render(){
//     return (
//       <div>
//         <Textfield
//           onChange={() => {}}
//           label="Text lines..."
//           rows={3}
//           style={{width: '200px'}}
//         />
//       </div>
//     )
//   }
// }
//
// export default TextInput;
