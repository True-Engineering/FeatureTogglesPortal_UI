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
    padding: [36, 0],
    flexGrow: 1,
  },

  title: {
    marginBottom: 26,
  },

  preloader: {
    width: 70,
  },

  accordionContent: {
    width: '100%',
    padding: [24, 92],
  },

  linkButton: {
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
  },
};

export const membersButtonTweakStyles = {
  circle: {
    width: 32,
    height: 32,
  },

  small: {
    '& $content': {
      gap: 12,
    },
  },
};

export type ProjectsPageStyles = ComponentStyles<typeof styles>;
