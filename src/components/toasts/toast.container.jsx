/**@jsx jsx */
import { jsx } from 'theme-ui';
import { ToastContext } from './toast.context';
import { Toast } from '.';
import * as styles from './index.styles';

export const ToastContainer = ({ ...props }) => {
  return (
    <ToastContext.Consumer>
      {(context) => (
        <div id="toast_container" sx={styles.ToastContainerCss} {...props}>
          {context.toasts.map((toast) => {
            return <Toast key={toast.key} {...toast} />;
          })}
        </div>
      )}
    </ToastContext.Consumer>
  );
};
