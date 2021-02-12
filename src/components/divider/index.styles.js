export const dividerCss = ({ variant }) => {
  let css = {
    border: '1px solid #C4C4C4',
    mx: 'xl',
  };

  if (variant === 'gradient') {
    css.border = 'none';
    css.backgroundImage = 'linear-gradient(90deg, #EF802F, #DB5192)';
  }

  return css;
};
