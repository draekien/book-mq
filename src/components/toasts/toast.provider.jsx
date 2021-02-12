import React from 'react';
import { ToastContext } from './toast.context';

export const ToastProvider = ({
  initialState = [],
  defaultProps = {},
  children,
}) => {
  const [state, setState] = React.useState(initialState);

  let count = 0;
  const getKey = () => {
    return `${Date.now()}_${count++}`;
  };

  const open = (props) => {
    const toasts = [...state];
    const newToast = Object.assign({}, defaultProps, props);

    if (newToast.key === undefined) newToast.key = getKey();
    toasts.push(newToast);

    setState(toasts);
  };

  const close = (key) => {
    const toasts = [...state];

    toasts.forEach((toast, index) => {
      if (toast.key === key) toasts[index].isOpen = false;
    });

    setState(toasts);
  };

  const closeAll = () => {
    const toasts = [...state];

    toasts.forEach((_toast, index) => {
      toasts[index].isOpen = false;
    });

    setState(toasts);
  };

  const success = (props) => {
    open(Object.assign({}, props, { color: 'success' }));
  };

  const error = (props) => {
    open(Object.assign({}, props, { color: 'error' }));
  };

  const alert = (props) => {
    open(Object.assign({}, props, { color: 'alert' }));
  };

  return (
    <ToastContext.Provider
      value={{
        toasts: state,
        open,
        close,
        closeAll,
        success,
        error,
        alert,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
