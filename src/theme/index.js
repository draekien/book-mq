import { colors } from './colors';
import { fonts, fontSizes, fontWeights } from './typography';
import { breakpoints, radii, spacing } from './layouts';
import { shadows } from './effects';

export const theme = {
  colors: colors,
  fonts: fonts,
  fontWeights: fontWeights,
  fontSizes: fontSizes,
  radii: radii,
  space: spacing,
  breakpoints: breakpoints,
  shadows: shadows,
  text: {
    default: {
      fontSize: 'body',
      fontFamily: 'body',
    },
    hero: {
      fontFamily: 'body',
      fontSize: 'hero',
    },
    heading: {
      fontFamily: 'body',
      fontSize: 'heading',
    },
    subtitle: {
      fontFamily: 'body',
      fontSize: 'subtitle',
    },
  },
  forms: {
    label: {
      fontFamily: 'body',
      fontSize: '1rem',
      color: 'text-dark',
      pt: 'sm',
      pb: 'xs',
    },
    input: {
      fontFamily: 'body',
      fontSize: '1rem',
      color: 'text-dark',
      background: '#F7F7FD',
      p: 'xs',
      outline: 'none',
      border: '2px solid #C4C4C4',
      transition: 'border 0.25s ease',
      '&:focus': {
        border: '2px solid #474463',
      },
    },
    textarea: {
      fontFamily: 'body',
      fontSize: '1rem',
      color: 'text-dark',
      background: '#F7F7FD',
      p: 'xs',
      outline: 'none',
      border: '2px solid #C4C4C4',
      transition: 'border 0.25s ease',
      '&:focus': {
        border: '2px solid #474463',
      },
    },
  },
};

export default theme;
