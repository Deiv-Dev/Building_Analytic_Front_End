import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import { PersistGate } from 'redux-persist/integration/react';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>

  </Provider>,
  document.getElementById('root')

);

