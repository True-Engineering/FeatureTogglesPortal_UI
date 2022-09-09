import {
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';

const { colors } = commonTheme;

export const styles = {
  root: {},

  nameColumn: {
    width: 256,
    flexShrink: 0,
    paddingLeft: 12,
  },

  emailColumn: {
    flexGrow: 1,
  },

  actionsColumn: {
    width: 256,
    flexShrink: 0,
    justifyContent: 'center',
  },

  nameCell: {
    display: 'flex',
    gap: 12,
    padding: [16, 12],
  },

  userName: {
    extend: 'ellipsis',

    color: colors.FONT_MAIN,
    fontSize: 14,
    lineHeight: '18px',
    letterSpacing: '0.15px',
  },

  email: {
    extend: 'ellipsis',
    color: colors.FONT_LABEL,
    fontSize: 14,
    lineHeight: '18px',
    letterSpacing: '0.15px',
  },

  actionsCell: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
  },

  ellipsis: {
    display: 'inline-block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },

  empty: {
    color: colors.FONT_LABEL,
    textAlign: 'center',
  },
};

export const selectTweakStyles = {
  input: {
    inputWrapper: {
      border: 'none',
      height: 32,
    },
  },

  arrow: {
    top: 4,
    right: 16,
  },
};

export type ProjectPendingMembersListStyles = ComponentStyles<typeof styles>;
