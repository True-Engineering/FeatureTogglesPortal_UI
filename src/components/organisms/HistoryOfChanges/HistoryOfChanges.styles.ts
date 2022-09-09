import {
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';
import { Z_INDEX } from '../../../constants';

const { colors } = commonTheme;

export const styles = {
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: colors.CLASSIC_WHITE,
    zIndex: Z_INDEX.sticky,
    padding: [32, 24, 24, 40],
    borderBottom: [1, 'solid', '#E1E4E8'],
  },

  title: {
    fontWeight: 800,
    fontSize: 28,
    lineHeight: '36px',
    marginBottom: 12,
  },

  listContainer: {
    padding: [24, 24, 0, 40],
  },
};

export const emptyMessageEmojiTweakStyles = {
  empty: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const themedPreloaderTweakStyles = {
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 72,
  },
};

export const dotsPreloaderTweakStyles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export const listForInfiniteScrollTweakStyles = {
  listItem: {
    paddingBottom: 40,
    fontSize: 14,
    letterSpacing: 0.15,
    lineHeight: '20px',
    position: 'relative',

    '&::after': {
      content: '""',
      background: colors.BORDER_LIGHT,
      width: 1,
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 4,
    },

    '&:last-child::after': {
      display: 'none',
    },

    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      zIndex: 2,
      width: 9,
      height: 9,
      background: colors.CLASSIC_WHITE,
      border: [1, 'solid', colors.FONT_MEDIUM],
      borderRadius: 10,
    },

    '&:last-child': {
      marginBottom: 0,
    },
  },
};

export type HistoryOfChangesStyles = ComponentStyles<typeof styles>;
