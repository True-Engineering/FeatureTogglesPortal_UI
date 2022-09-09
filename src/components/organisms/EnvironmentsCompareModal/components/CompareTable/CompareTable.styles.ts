import {
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';
import { MODAL_HORIZONTAL_PADDING } from '../../EnvironmentsCompareModal.styles';

const { colors } = commonTheme;

const LEFT_CONTENT_PADDING = 24;
const RIGHT_CONTENT_PADDING = MODAL_HORIZONTAL_PADDING;

export const styles = {
  root: {
    display: 'flex',
    margin: [0, -MODAL_HORIZONTAL_PADDING],
    border: [1, 'solid', colors.BORDER_LIGHT],
    borderLeft: 'none',
    borderRight: 'none',
  },

  aside: {
    width: 240,
    backgroundColor: colors.GREY_BACKGROUND,
    flexShrink: 0,
    padding: [32, MODAL_HORIZONTAL_PADDING],
  },

  content: {
    flexGrow: 1,
    padding: [32, RIGHT_CONTENT_PADDING, 32, LEFT_CONTENT_PADDING],
    overflow: 'auto',
    maxHeight: 400,
  },

  flag: {
    width: 'fit-content',

    '&:not(:first-child)': {
      marginTop: 32,
    },
  },

  label: {
    lineHeight: 1.38,
    color: colors.FONT_MAIN,
    marginTop: -1,
  },

  menu: {
    listStyle: 'none',
    padding: 0,
    margin: [-8, -16, 0],
  },

  menuItemWrapper: {
    '&:not(:first-child)': {
      marginTop: 8,
    },
  },

  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 8,
    padding: [8, 16],
    transition: 'background-color 0.25s ease-out',
    borderRadius: 4,
    cursor: 'pointer',
    color: colors.FONT_MAIN,

    '&:not($menuItemActive)': {
      '&:hover, &:focus': {
        backgroundColor: colors.GREY_FOCUS,
      },
    },
  },

  menuItemActive: {
    backgroundColor: colors.GREY_HOVER,
  },

  emptyMessage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: [60, 0],
  },

  header: {
    margin: [0, -RIGHT_CONTENT_PADDING, 0, -LEFT_CONTENT_PADDING],
    borderBottom: [1, 'solid', colors.BORDER_LIGHT],
  },

  headerInner: {
    padding: [0, RIGHT_CONTENT_PADDING, 24, LEFT_CONTENT_PADDING],
  },

  headerLabelWrapper: {
    marginTop: -1,
  },

  headerLabel: {
    lineHeight: 1.38,
    color: colors.FONT_MAIN,
    fontWeight: 'bold',
  },

  headerLabelInfo: {
    marginTop: 4,
    padding: [4, 16],
    fontSize: 14,
    lineHeight: 1.42,
    letterSpacing: 0.15,
    color: colors.FONT_LABEL,
    background: colors.BLUE_BACKGROUND,
    borderRadius: [0, 8, 8, 8],
  },

  flags: {
    marginTop: 24,
  },
};

export type EnvironmentsCompareModalCompareTableStyles = ComponentStyles<
  typeof styles
>;
