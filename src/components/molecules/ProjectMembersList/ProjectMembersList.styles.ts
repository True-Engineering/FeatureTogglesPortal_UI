import {
  rgba,
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';
import { Z_INDEX } from '../../../constants';

const { colors } = commonTheme;

export const styles = {
  root: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },

  ellipsis: {
    display: 'inline-block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },

  boldHeadCell: {
    extend: 'ellipsis',
    padding: [12, 24],
    color: colors.FONT_MAIN,
    fontWeight: 'bold',
    lineHeight: '16px',
    letterSpacing: '0.24px',
  },

  rowScroll: {
    position: 'relative',
    minWidth: 'max-content',
  },

  stickyHead: {
    position: 'sticky',
    zIndex: Z_INDEX.sticky,
    backgroundColor: colors.CLASSIC_WHITE,
    top: 0,
    left: 0,
  },

  rightShadow: {
    boxShadow: '4px 0 4px rgba(0, 0, 0, 0.05)',
  },

  bottomShadow: {
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.05)',
  },

  nameColumn: {
    width: 238,
    padding: [16, 12],

    position: 'sticky',
    left: 0,
    background: colors.CLASSIC_WHITE,
    zIndex: Z_INDEX.sticky - 1,
  },

  nameCell: {
    display: 'flex',
  },

  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    width: 'calc(100% - 32px)',
    marginLeft: 12,
  },

  userName: {
    extend: 'ellipsis',

    color: colors.FONT_MAIN,
    fontSize: 14,
    lineHeight: '18px',
    letterSpacing: '0.15px',
  },

  projectColumn: {
    width: 122,
    padding: [16, 0, 16, 16],
  },

  permissionColumn: {
    width: 104,
    padding: [16, 0, 16, 24],
  },

  actionsColumn: {
    width: 70,
    flexGrow: 1,
    justifyContent: 'flex-end',

    position: 'sticky',
    right: 0,
    zIndex: Z_INDEX.sticky - 1,
    paddingRight: 12,

    background: `linear-gradient(90deg, ${rgba(
      colors.CLASSIC_WHITE,
      0.0001,
    )} 0%, ${colors.CLASSIC_WHITE} 27.52%)`,
  },

  rightDivider: {
    position: 'relative',
    '&::after': {
      content: '""',
      width: 1,
      position: 'absolute',
      top: 12,
      right: 0,
      height: 'calc(100% - 24px)',
      backgroundColor: colors.BORDER_LIGHT,
    },
  },

  iconButton: {
    margin: [-5, 0],
  },

  empty: {
    color: colors.FONT_LABEL,
    textAlign: 'center',
  },

  permissionSelect: {
    width: '100%',
  },

  permissionText: {
    color: colors.FONT_MEDIUM,
    fontSize: 14,
    fontWeight: 'bold',
  },

  roleButton: {
    pointerEvents: 'none',
  },
};

export const boldDropdownTweakStyles = {
  value: {
    fontWeight: 'bold',
  },
};

export const deleteConfirmTweakStyles = {
  popup: { width: 332 },
};

export type ProjectMembersListStyles = ComponentStyles<typeof styles>;
