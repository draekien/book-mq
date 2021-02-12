import { keyframes } from '@emotion/core';

const animationSlideLeft = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0)
  }
`;

export const ToastContainerCss = {
  position: 'fixed',
  top: 90,
  right: 0,
  bottom: 0,
  zIndex: 99,
  pointerEvents: 'none',
};

export const ToastWrapperCss = {
  borderRadius: 'sm',
  boxShadow: 'basic',
  mt: 'lg',
  mb: 0,
  mr: 'lg',
  ml: 'lg',
  opacity: 0,
  pointerEvents: 'all',
  position: 'relative',
  transition: 'all 300ms',
  width: '18rem',
  zIndex: 99,
  right: 0,
  animation: `${animationSlideLeft} 500ms`,
};

export const ToastMessageCss = {
  lineHeight: '1rem',
  minHeight: '1rem',
  pr: '2.25rem',
  pl: '3.75rem',
  pb: 'sm',
};

export const ToastTitleCss = {
  lineHeight: '1rem',
  minHeight: '2rem',
  pr: '2.25rem',
  pl: '3.75rem',
  pt: '1rem',
  fontWeight: 'bold',
};

export const ToastIconCss = {
  '& > *': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'text',
    height: '2rem',
    width: '2rem',
    position: 'absolute',
    m: 'sm',
  },
};
