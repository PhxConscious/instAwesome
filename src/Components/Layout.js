import React from "react";
import { BrowserRouter } from 'react-router-dom';
import Main from './Main'
import AppNav from './Reusable/AppNav';

export default class Layout extends React.Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <AppNav />
            <Main />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
