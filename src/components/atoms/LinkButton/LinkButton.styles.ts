import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    height: 24,
    padding: 0,
    background: 'transparent',
    border: 'none',
    borderRadius: 0,
    cursor: 'pointer',
    outline: 'none',
    transition: 'color 0.25s ease-in-out',

    '&[disabled]': {
      cursor: 'default',
      pointerEvents: 'none',
    },
  },

  normal: {
    fontSize: 16,

    '& $content': {
      gap: 14,
    },
  },

  small: {
    fontSize: 14,
    letterSpacing: '0.15px',

    '& $content': {
      gap: 10,
    },
  },

  main: {},

  cancel: {},

  active: {},

  bold: {
    fontWeight: 'bold',
  },

  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  circle: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    transition: '0.25s ease-in-out',
    transitionProperty: ['background', 'color'],
  },

  icon: {
    width: 20,
    height: 20,
  },

  text: {},

  content: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },

  reverseContent: {
    flexDirection: 'row-reverse',
  },

  loader: {
    display: 'none',
    height: 8,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },

  loading: {
    '& $content': {
      visibility: 'hidden',
    },

    '& $loader': {
      display: 'block',
    },
  },
};

export const smallPreloaderStyles = {
  fadedDot: {
    width: 6,
    height: 6,
  },
};

export type LinkButtonStyles = ComponentStyles<typeof styles>;
