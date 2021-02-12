/**@jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import theme from './theme';
import AuthProvider from './security/auth.provider';
import { ToastProvider } from './components/toasts/toast.provider';
import { ToastContainer } from './components/toasts/toast.container';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <ToastContainer />
        <AuthProvider>
          <App />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
