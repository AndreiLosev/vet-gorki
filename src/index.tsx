import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ContexProvider} from './navigation'
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <ContexProvider child={<App />}/>,
  document.getElementById('root'),
);

serviceWorker.unregister();
