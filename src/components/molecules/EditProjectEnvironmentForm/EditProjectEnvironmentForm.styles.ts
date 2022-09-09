import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },

  input: {
    width: 324,
  },

  control: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
  },

  trashIcon: {
    width: 19,
    height: 19,
  },
};

export const buttonTweakStyles = {
  s: {
    height: 40,
  },
};

export const deleteConfirmTweakStyles = {
  popup: { width: 300 },
};

export type EditProjectEnvironmentFormStyles = ComponentStyles<typeof styles>;
