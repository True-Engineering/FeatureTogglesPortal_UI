import { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  sectionTitle: {
    display: 'inline-block',
    width: 180,
    flexShrink: 0,
  },

  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 16,
  },

  message: {
    marginTop: 26,
    textAlign: 'right',
  },

  time: {},
};

export type EnableFreezeFeatureFlagsFormStyles = ComponentStyles<typeof styles>;
