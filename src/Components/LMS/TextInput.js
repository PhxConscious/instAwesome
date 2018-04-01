import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Textfield} from 'react-mdl';
import '../../Styles/FormsStyles.css';

class TextInput extends React.Component {

  render(){
    return (
      <div>
        <Textfield
          onChange={() => {}}
          label="Text lines..."
          rows={3}
          style={{width: '200px'}}
        />
      </div>
    )
  }
}

export default TextInput;
