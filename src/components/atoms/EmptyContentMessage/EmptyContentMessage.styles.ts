import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    flexGrow: 1,
  },

  content: {
    display: 'flex',
    alignItems: 'center',
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 32,
  },
};

export type EmptyContentMessageStyles = ComponentStyles<typeof styles>;
