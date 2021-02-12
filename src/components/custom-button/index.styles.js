export const customButtonCss = ({ variant, disabled }) => {
  let css = {
    cursor: 'pointer',
    outline: 'none',
    boxShadow: 'subtle',
  };

  if (variant === 'outline') {
    css.letterSpacing = '0.3rem';
    css.background = 'transparent';
    css.border = '2px solid white';
    css.p = 'xs';
  } else if (variant === 'solid') {
    css.backgroundColor = 'primary';
    css.transition = 'background-color 0.25s ease-in-out';
    if (!disabled) {
      css['&:hover'] = {
        backgroundColor: 'accent',
      };
    }
  } else if (variant === 'gradient') {
    css.letterSpacing = '0.3rem';
    css.backgroundImage = 'linear-gradient(90deg, #EF802F, #DB5192)';
    css.position = 'relative';
    css.zIndex = 1;
    css['&::before'] = {
      position: 'absolute',
      content: '""',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundImage: 'linear-gradient(-90deg, #EF802F, #DB5192)',
      transition: 'opacity 0.25s ease-in-out',
      opacity: 0,
      zIndex: -1,
    };
    if (!disabled) {
      css['&:hover::before'] = {
        opacity: 1,
      };
    }
  } else if (variant === 'text') {
    css.background = 'transparent';
    css.boxShadow = 'none';
  } else if (variant === 'icon') {
    css.borderRadius = 'max';
    css.backgroundColor = 'primary';
    css.transition = 'background-color 0.25s ease-in-out';
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
