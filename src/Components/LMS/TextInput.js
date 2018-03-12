import React from 'react';
import { Textfield } from 'react-mdl';


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
