import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  row: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    marginBottom: 26,
  },

  from: {
    display: 'flex',
    width: 188,
    marginRight: 10,
  },

  to: {
    display: 'flex',
    flex: 1,
  },

  warningText: {
    cursor: 'pointer',
  },
};

export type SyncEnvironmentsFormStyles = ComponentStyles<typeof styles>;
