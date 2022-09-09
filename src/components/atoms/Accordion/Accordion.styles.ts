import {
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';

const { colors } = commonTheme;

export const styles = {
  root: {
    width: '100%',
  },

  item: {},

  header: {
    display: 'flex',
    alignItems: 'center',
    padding: [20, 14],
    backgroundColor: colors.CLASSIC_WHITE,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: colors.GREY_BACKGROUND,
    },
  },

  arrow: {
    width: 20,
    height: 20,
    transition: 'transform .2s ease',
    flexShrink: 0,
  },

  openArrow: {
    transform: 'rotate(90deg)',
  },

  title: {
    display: 'flex',
    flexGrow: 1,
    padding: [0, 6],
  },

  content: {
    display: 'flex',
    width: '100%',
  },
};

export type AccordionStyles = ComponentStyles<typeof styles>;
