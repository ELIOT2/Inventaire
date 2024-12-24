import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { FileProvider } from './context/FileContext';

ReactDOM.render(
  <React.StrictMode>
    <FileProvider>
      <App />
    </FileProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
