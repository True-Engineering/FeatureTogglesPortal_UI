import {
  commonTheme,
  ComponentStyles,
  MoreMenuStyles,
} from '@true-engineering/true-react-common-ui-kit';
import { APP_WIDTH, Z_INDEX } from '../../../constants';

const { colors } = commonTheme;

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

  preloader: {
    width: 70,
  },

  titleControls: {
    display: 'flex',
    alignItems: 'center',
  },

  groupSwitch: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:last-child)': {
      marginRight: 40,
    },
  },

  addFlagButton: {
    '&:not(:last-child)': {
      marginRight: 12,
    },
  },

  plusIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },

  menuIcon: {
    width: 30,
    height: 30,
  },

  userIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },

  linkButton: {
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
  },

  blackText: {
    color: colors.FONT_MAIN,
  },

  hidden: {
    display: 'none',
  },

  history: {
    marginBottom: 24,
  },

  historyIcon: {
    width: 20,
    height: 20,
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

export const modalWithoutPaddingTweakStyles = {
  m: {
    '& $modal': {
      width: 960,
      padding: 0,
    },

    '& $withoutFooter': {
      paddingBottom: 0,
    },
  },
};

export const moreMenuTweakStyles: MoreMenuStyles = {
  button: {
    borderRadius: 14,
    color: colors.FONT_MAIN,
    border: [2, 'solid', colors.BORDER_MAIN],
    backgroundColor: colors.CLASSIC_WHITE,
    width: 48,
    height: 48,
  },
};

export const historyOfChangesModalTweakStyles = {
  root: {
    overscrollBehaviorY: 'contain',
  },

  l: {
    '& $modal': {
      padding: 0,
    },

    '& $withoutFooter': {
      paddingBottom: 40,
    },
  },

  close: {
    position: 'fixed',
    top: 24,
    right: 24,
    zIndex: Z_INDEX.modal,
  },
};

export const historyOfChangesButtonTweakStyles = {
  l: {
    height: 24,
    borderRadius: 6,
    padding: [0, 2, 0, 0],
    fontWeight: 700,
  },

  children: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
};

export type FlagsPageStyles = ComponentStyles<typeof styles>;
