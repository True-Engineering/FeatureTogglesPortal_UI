import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  root: {},

  flag: {
    display: 'flex',
    width: 20,
    cursor: 'pointer',
  },

  option: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
};

export const listTweakStyles = {
  root: {
    minWidth: 160,
  },
};

export const contextTweakStyles = {
  root: {
    display: 'flex',
    alignItems: 'center',
  },

  trigger: {
    display: 'flex',
  },
};

export type LanguageDropdownStyles = ComponentStyles<typeof styles>;
