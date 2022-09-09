import {
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';

const { colors, dimensions, helpers } = commonTheme;

export const ROW_HEIGHT = 40;
const CONTAINER_PADDING = 10;
const CELL_PADDING = [10, 20];

export const styles = {
  root: {
    borderRadius: dimensions.BORDER_RADIUS_SMALL,
    boxShadow: '0 13px 74px -27px rgba(0, 0, 0, 0.11)',
    boxSizing: 'border-box',
    padding: [CONTAINER_PADDING, 0],
    fontSize: 16,
  },

  list: {
    height: '100%',
    maxHeight: ROW_HEIGHT * 6,
    cursor: 'pointer',
    backgroundColor: colors.CLASSIC_WHITE,

    ...helpers?.withScrollBar,
  },

  cell: {
    display: 'flex',
    cursor: 'pointer',
    minHeight: ROW_HEIGHT,
    padding: CELL_PADDING,
    transition: '0.25s ease-in-out',
    transitionProperty: 'background-color, color',
    alignItems: 'center',
    boxSizing: 'border-box',
  },

  focused: {},

  active: {},

  loading: {
    color: colors.FONT_MAIN,
    padding: CELL_PADDING,
    cursor: 'default',
  },
};

export type ListStyles = ComponentStyles<typeof styles>;
