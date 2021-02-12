export const wholeContainerCss = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'auto',
  gap: 'md',
  my: 'xs',
  width: '100%',
};

export const topContainerCss = {
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  flexWrap: 'wrap',
  gap: 'md',
};

export const lhsCss = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const avatarContainerCss = {
  height: 150,
  width: 150,
  m: 'md',
};

export const avatarCss = {
  height: '100%',
  width: '100%',
};

export const editProfileBtnCss = (disabled) => {
  let css = {
    height: 34,
    width: 223,
    cursor: 'pointer',
    outline: 'none',
    boxShadow: 'subtle',
    backgroundColor: 'primary',
    transition: 'background-color 0.25s ease-in-out',
    border: 'none',
    borderRadius: 'sm',
  };

  if (!disabled) {
    css['&:hover'] = {
      backgroundColor: 'accent',
    };
  }

  if (disabled) {
    css.opacity = 0.75;
    css.cursor = 'default';
  }

  return css;
};

export const editBtnTextCss = {
  px: 'xs',
  color: 'text',
};

export const submitProfileBtnCss = {
  width: 180,
  height: 42,
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  alignSelf: 'flex-end',
  mt: 'md',
  ml: 'auto',
};

export const rhsCss = {
  flexDirection: 'column',
  flexGrow: [1, 0],
  mx: ['sm', 0],
};

export const usernameCss = {
  mb: 'md',
};

export const counterCss = {
  marginRight: 'xl',
  mb: 'xl',
};

export const bioCss = {
  my: 'sm',
};

export const editProfileModalCss = {
  position: 'fixed',
  top: [10, 40, '10%'],
  width: ['100%', '80%', '50%'],
  zIndex: 99,
  backgroundColor: 'hero',
  outline: 'none',
  ml: [0, '10%', '25%'],
  p: 'md',
  borderRadius: 'md',
  boxShadow: 'normal',
  color: 'text-dark',
};

export const dividerCss = {
  width: ['100%', '80%'],
};

export const tabHeadingCss = (isActive) => {
  let css = {
    background: 'none',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    color: 'text',
    px: 'xs',
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '-1.5rem',
      left: 0,
      right: 0,
      width: '100%',
      height: 3,
      backgroundColor: 'primary',
      opacity: isActive ? 1 : 0,
      transition: 'opacity 0.25s ease-in-out',
    },
  };

  return css;
};

export const spinnerCss = {
  mx: 'auto',
  my: 'auto',
  height: '4rem',
  width: '4rem',
  strokeWidth: 2,
};
