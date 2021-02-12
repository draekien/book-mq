export const gradientTextCss = ({ text }) => {
  let css = {
    background: 'linear-gradient(90deg, #EF802F, #DB5192)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
    position: 'relative',
    '::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: 2,
      width: 0,
      background: 'transparent',
      transition: 'width 0.5s ease',
    },
    '&:hover::after': {
      width: '100%',
      background: 'linear-gradient(90deg, #EF802F, #DB5192)',
    },
    '&:focus::after': {
      width: '100%',
      background: 'linear-gradient(90deg, #EF802F, #DB5192)',
    },
    '&.active::after': {
      width: '100%',
      background: 'linear-gradient(90deg, #EF802F, #DB5192)',
    },
  };
  return css;
};
