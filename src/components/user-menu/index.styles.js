export const userMenuContainerCss = {
  position: 'relative',
};

export const userButtonCss = (props) => {
  let css = {
    borderRadius: 'max',
    outline: 'none',
    backgroundImage: 'linear-gradient(180deg, #EF802F, #DB5192)',
    height: '3rem',
    width: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '2px transparent',
    boxShadow: 'subtle',
    transition: 'border 0.25s ease-in-out',
    '&:hover': {
      transition: 'box-shadow 0.25s ease-in-out',
      boxShadow: 'normal',
    },
  };

  if (props.open) {
    css.boxShadow = 'normal';
    css.border = '2px solid';
    css.borderColor = 'accent';
  }

  return css;
};

export const initialsCss = {
  fontFamily: 'heading',
  p: 0,
  m: 0,
  pointerEvents: 'none',
};

export const userMenuCss = (props) => {
  let css = {
    position: 'absolute',
    backgroundImage: 'linear-gradient(0deg, #EF802F, #DB5192)',
    borderRadius: 'md',
    top: '4rem',
    right: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 0,
    width: 0,
    overflow: 'hidden',
    transition: 'height 0.25s ease-in-out, width 0.25s ease-in-out',
    zIndex: 99,
  };

  if (props.open) {
    css.width = '12rem';
    css.height = '12rem';
    css.boxShadow = 'normal';
  }

  return css;
};

export const menuItemContainerCss = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  m: 'xs',
  p: 'xs',
  width: '90%',
};

export const menuItemCss = {
  fontSize: 'body',
  fontFamily: 'body',
  p: 0,
  m: 0,
};

export const signOutButtonCss = {
  letterSpacing: '0.3rem',
  background: 'transparent',
  border: '2px solid white',
  borderRadius: 'sm',
  color: 'text',
  boxShadow: 'subtle',
  width: '90%',
  m: 'xs',
  p: 'xs',
  cursor: 'pointer',
  outline: 'none',
};
