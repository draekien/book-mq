import React from 'react';

export const ToastContext = React.createContext({
  toasts: [],
  open: () => {},
  close: () => {},
  closeAll: () => {},
  success: () => {},
  error: () => {},
  alert: () => {},
});
