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
    paddingTop: 48,
    paddingBottom: 36,
    flexGrow: 1,
  },

  preloader: {
    width: 70,
  },

  title: {
    marginBottom: 32,
  },

  linkButton: {
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
  },
};

export type OrganizationUsersPageStyles = ComponentStyles<typeof styles>;
