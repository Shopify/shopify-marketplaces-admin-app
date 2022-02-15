import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from './foundation';

const rootEl = document.getElementById('root');
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl,
  );
};

render(Router);
if (module.hot) module.hot.accept();
