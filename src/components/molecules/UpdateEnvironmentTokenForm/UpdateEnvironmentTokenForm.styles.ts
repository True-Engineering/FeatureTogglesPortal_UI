import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  inputWrapperWithIcon: {
    width: '100%',
    position: 'relative',
  },

  input: {
    pointerEvents: 'none',
  },

  inputControls: {
    position: 'absolute',
    // отступы из-за border
    top: 1,
    bottom: 1,
    right: 1,
    width: 88,

    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  copyButton: {
    paddingRight: 6,
  },
};

export type UpdateEnvironmentTokenFormStyles = ComponentStyles<typeof styles>;
