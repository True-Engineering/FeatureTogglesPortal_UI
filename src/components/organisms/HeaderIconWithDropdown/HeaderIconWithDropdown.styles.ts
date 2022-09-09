import {
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';

const { colors, dimensions } = commonTheme;

const LOGO_HEIGHT = 40;
const BURGER_SIZE = 32;
const BACK_ICON_SIZE = 32;

export const styles = {
  root: {
    position: 'relative',
    '& a': {
      textDecoration: 'none',
    },
  },

  container: {
    display: 'flex',
    height: LOGO_HEIGHT,
    alignItems: 'center',
    cursor: 'pointer',
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 20,
  },

  title: {},

  icon: {
    flexShrink: 0,
    transition: 'color 0.2s ease, opacity 0.5s ease',
    textDecoration: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      extend: 'activeIcon',
    },
  },

  activeIcon: {},

  backButton: {
    width: BACK_ICON_SIZE,
    height: BACK_ICON_SIZE,
    transform: 'rotate(180deg)',
    // чтобы не скакала верстка при переходе между страничками
    marginLeft: Math.abs(BURGER_SIZE - BACK_ICON_SIZE),
  },

  burger: {
    width: BURGER_SIZE,
    height: BURGER_SIZE,
  },

  linkButton: {
    padding: [11, 16, 5],
  },

  dropdown: {
    padding: 16,
    background: colors.CLASSIC_WHITE,
    fontSize: 16,

    '& a': {
      textDecoration: 'none',
    },
  },

  list: {
    display: 'grid',
    gridTemplateRows: 'repeat(6, auto)',
    gridAutoFlow: 'column',
  },

  item: {
    minWidth: 230,
    padding: [12, 16],
    cursor: 'pointer',
    borderRadius: dimensions.BORDER_RADIUS_SMALL,
  },

  emptyContentMessage: {
    width: 284,
  },
};

export const contextTweakStyles = {
  trigger: {
    display: 'flex',
  },
};

export const linkButtonTweakStyles = {
  icon: {
    padding: 2,
  },
};

export type HeaderIconWithDropdownStyles = ComponentStyles<typeof styles>;
