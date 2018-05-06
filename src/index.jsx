import './styles/main.sass';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import { render } from 'react-dom';

import App from './App';


const renderApp = () => {
  render(
    <App />,
    document.getElementById('root')
  );
};

renderApp();
