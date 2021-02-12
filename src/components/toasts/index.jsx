/** @jsx jsx */
import { jsx, Text } from 'theme-ui';
import * as React from 'react';
import { Transition } from 'react-transition-group';
import * as styles from './index.styles';
import SvgIcon from '../svg-icon';

export const iconMap = {
  success: 'check',
  error: 'info',
  alert: 'report-problem',
};

export const colorMap = {
  success: { backgroundColor: '#84E660' },
  error: { backgroundColor: '#FC6971' },
  alert: { backgroundColor: '#FFC86B' },
};

export const toastWrapperTransition = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: {
    opacity: 0,
    height: '0 !important',
    marginTop: 0,
    overflow: 'hidden',
  },
  exited: {
    opacity: 0,
    height: '0 !important',
    marginTop: 0,
    overflow: 'hidden',
  },
};

export const Toast = (props) => {
  const {
    isOpen = true,
    message,
    color = 'success',
    onClose,
    onClick,
    title,
    duration = 6.5,
    openFrom,
    ...rest
  } = props;
  const [openState, setOpenState] = React.useState(isOpen);
  const [openTime, setOpenTime] = React.useState(Date.now());

  let timer;
  let toastElement;

  React.useEffect(() => {
    if (toastElement) {
      toastElement.style.height = toastElement.scrollHeight + 'px';
    }
  }, []);

  React.useEffect(() => {
    setOpenState(isOpen);
  }, [isOpen]);

  const handleClose = (e) => {
    clearTimer();
    setOpenState(false);
    if (onClose) {
      onClose(e);
    }
  };

  const clearTimer = () => {
    clearTimeout(timer);
  };

  const setTimer = (isMouseLeave = false) => {
    // restart timer on mouse leave
    if (isMouseLeave) setOpenTime(Date.now());

    // don't restart timer on re-render
    if (duration) {
      const durationMs = duration * 1000;
      const elapsed = Date.now() - openTime;
      const timeout = durationMs - elapsed;
      timer = setTimeout(handleClose, timeout);
    }
  };

  setTimer();

  return (
    <Transition appear in={openState} timeout={300} unmmountOnExit>
      {(state) => (
        <div
          sx={styles.ToastWrapperCss}
          style={{
            ...toastWrapperTransition[state],
            ...colorMap[color],
          }}
          ref={(el) => (toastElement = el)}
          onClick={(e) => onClick && onClick(e)}
          onMouseEnter={clearTimer}
          onMouseLeave={() => setTimer(true)}
          {...rest}
        >
          <div sx={styles.ToastIconCss}>
            <SvgIcon variant={iconMap[color]} />
          </div>
          <Text variant="default" sx={styles.ToastTitleCss}>
            {title}
          </Text>
          <Text variant="subtitle" sx={styles.ToastMessageCss}>
            {message}
          </Text>
        </div>
      )}
    </Transition>
  );
};
