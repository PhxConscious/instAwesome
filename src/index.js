import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import config from './config';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

firebase.initializeApp(config.firebase);

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
