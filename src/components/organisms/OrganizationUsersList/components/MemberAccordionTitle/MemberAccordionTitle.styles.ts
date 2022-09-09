import {
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';

const { colors, dimensions } = commonTheme;

export const styles = {
  root: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
  },

  userInfo: {
    display: 'flex',
    width: 250,
    gap: 12,
    alignItems: 'center',
  },

  ellipsis: {
    display: 'inline-block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },

  userName: {
    extend: 'ellipsis',
    fontSize: 14,
    lineHeight: '18px',
    letterSpacing: '0.15px',
    color: colors.FONT_MAIN,
  },

  projects: {
    display: 'flex',
    gap: 4,
  },

  tag: {
    fontSize: 14,
    letterSpacing: '0.15px',
    padding: [2, 8],
    borderRadius: dimensions.BORDER_RADIUS_EXTRA_SMALL,
    color: colors.FONT_MAIN,
    backgroundColor: colors.BLUE_BACKGROUND,
  },

  deleteButton: {
    margin: [-4, 0, -4, 'auto'],
  },

  actionButton: {
    opacity: 0,
    transition: '0.25s ease-in-out',
    transitionProperty: 'opacity',

    'div[class^="header"]:hover &': {
      opacity: 1,
    },
  },
};

export const deleteConfirmTweakStyles = {
  popup: { width: 332 },
};

export type MemberAccordionTitleStyles = ComponentStyles<typeof styles>;
