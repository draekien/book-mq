export const navCss = {
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  height: 104,
  px: [0, 'xl'],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  zIndex: 20,
};

export const navLinkCss = {
  px: 'xs',
  mx: 'sm',
  color: 'text',
  textDecoration: 'none',
  fontSize: 'hero',
  fontFamily: 'heading',
  position: 'relative',
  outline: 'none',
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
  '&:hover': {
    '::after': {
      width: '100%',
      backgroundImage: 'linear-gradient(90deg, #EF802F, #DB5192)',
    },
  },
  '&:focus': {
    '::after': {
      width: '100%',
      backgroundImage: 'linear-gradient(90deg, #EF802F, #DB5192)',
    },
  },
  '&.active': {
    '::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: 2,
      width: '100%',
      backgroundImage: 'linear-gradient(90deg, #EF802F, #DB5192)',
    },
  },
};

export const mobileMenuCss = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '1rem',
    top: '36px',
    outline: 'none',
  },
  bmBurgerBars: {
    background: '#F7F7FD',
    borderRadius: 2,
  },
  bmBurgerBarsHover: {
    background: '#DB5192',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#F7F7FD',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
  },
  bmMenu: {
    background: '#2F2E41',
    padding: '2.5em 1.5em 0',
    fontSize: '1em',
    zIndex: 20,
  },
  bmMorphShape: {
    fill: '#2F2E41',
  },
  bmItemList: {
    color: '#F7F7FD',
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

export const mobileMenuContainerCss = {
  position: 'fixed',
  top: 0,
  width: '100vw',
  height: 104,
  display: 'flex',
  zIndex: 20,
};

export const mobileNavCss = {
  alignSelf: 'center',
  width: '100%',
  mx: 'sm',
  justifyContent: 'space-between',
};

export const mobileLogoCss = { flex: 1, ml: 'lg' };
