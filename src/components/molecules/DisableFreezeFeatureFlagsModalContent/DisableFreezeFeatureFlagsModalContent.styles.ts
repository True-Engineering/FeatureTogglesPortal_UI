import { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 68,
  },

  column: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 124,
    gap: 10,
  },

  infoGroupTitle: {
    fontSize: 14,
  },

  wordBreak: {
    wordBreak: 'break-all',
  },
};

export type DisableFreezeFeatureFlagsModalContentStyles = ComponentStyles<
  typeof styles
>;
