import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AccountContainer } from './common/containers/AccountContainer';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <AccountContainer.Provider>
      <App />
    </AccountContainer.Provider>
  </React.StrictMode>
);

reportWebVitals();
