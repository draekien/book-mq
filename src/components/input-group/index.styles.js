export const inputGroupContainerCss = {
  flexDirection: 'column',
  width: '100%',
};

export const inputContainerCss = {
  position: 'relative',
};

export const inputCss = ({ variant, iconVariant }) => {
  let css = {
    height: variant === 'single-line' && 53,
    width: '100%',
  };

  if (iconVariant) {
    css.pl = '2.75rem';
  }

  return css;
};

export const inputIconCss = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  my: 'auto',
  left: '0.75rem',
  fill: 'icon',
  height: 24,
  width: 24,
};
