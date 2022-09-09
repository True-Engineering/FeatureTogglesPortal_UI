import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

const BUTTON_SIZE = 32;

export const styles = {
  root: {
    display: 'flex',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    outline: 'none',
    boxSizing: 'border-box',
    transition: '0.25s ease-in-out',
    transitionProperty: 'background-color, color, border-color',
    maxWidth: '100%',
    border: 'none',
    position: 'relative',
    boxShadow: 'none',
    borderRadius: '50%',
    background: 'none',

    '&:disabled': {
      extend: 'disabled',
    },

    '&:active': {
      extend: 'active',
    },
  },

  'cancel-light': {},

  cancel: {},

  main: {},

  active: {},

  disabled: {
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
};

export const copyOutlineIconTweakStyles = { root: { width: 16 } };

export const trashIconTweakStyles = { root: { width: 19 } };

export const defaultIconTweakStyles = { root: { width: 20 } };

export type IconButtonStyles = ComponentStyles<typeof styles>;
