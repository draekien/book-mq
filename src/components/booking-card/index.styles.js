export const bookingCardContainerCss = (variant, index) => {
  let css = {
    flexDirection: 'column',
    gap: 'sm',
    p: 'md',
    borderRadius: 'lg',
    boxShadow: 'normal',
    cursor: 'pointer',
  };

  if (variant === 'featured') {
    css.backgroundImage =
      index % 2 === 1
        ? 'linear-gradient(0deg, #EF802F, #DB5192)'
        : 'linear-gradient(180deg, #EF802F, #DB5192)';
  } else {
    css.backgroundColor = 'navy';
  }

  return css;
};

export const bookingCardHeaderCss = {
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const bookingDetailsCss = {
  flexWrap: 'wrap',
  gap: 'xs',
};
