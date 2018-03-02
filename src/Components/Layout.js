import React from "react";
import { BrowserRouter } from 'react-router-dom';
import Main from './Main'
import Header from './Header';

export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Main />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
