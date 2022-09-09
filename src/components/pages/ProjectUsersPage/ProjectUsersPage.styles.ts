import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';
import { APP_WIDTH } from '../../../constants';

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    width: APP_WIDTH,
    height: '100%',
    paddingTop: 50,
    paddingBottom: 36,
    flexGrow: 1,
  },

  preloader: {
    width: 70,
  },

  linkButton: {
    display: 'flex',
    textDecoration: 'none',
    marginBottom: 8,
  },
};

export type ProjectUsersPageStyles = ComponentStyles<typeof styles>;
