import React from "react";
import { BrowserRouter } from 'react-router-dom';
import Main from './Main'

export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
