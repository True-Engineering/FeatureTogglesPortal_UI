import {
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';

const { colors } = commonTheme;

export const styles = {
  header: {
    display: 'flex',
  },

  swap: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.FONT_MEDIUM,
    backgroundColor: colors.CLASSIC_WHITE,
    border: [1, 'solid', colors.BORDER_MAIN],
    borderLeft: 0,
    borderRight: 0,
    width: 48,
    height: 48,
    borderRadius: 0,
    cursor: 'pointer',
    transition: '0.25s ease-out',
    transitionProperty: 'color background-color',

    '&:hover': {
      color: colors.FONT_MAIN,
      backgroundColor: colors.GREY_FOCUS,
    },

    '&:active': {
      backgroundColor: colors.GREY_HOVER,
      color: colors.FONT_MAIN,
    },

    '&:focus': {
      color: colors.FONT_MAIN,
    },

    '&:disabled': {
      backgroundColor: colors.GREY_DISABLED,
      color: colors.FONT_DISABLED,
    },
  },

  swapIcon: {
    width: 20,
    height: 20,
  },
};

export type EnvironmentsCompareModalHeaderStyles = ComponentStyles<
  typeof styles
>;
