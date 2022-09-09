import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

export const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 30,
    width: 330,
  },
};

export type DeniedMessageStyles = ComponentStyles<typeof styles>;
