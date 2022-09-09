import {
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';

const { colors } = commonTheme;

export const styles = {
  portalsSynchronization: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    height: 'calc(100vh - 100px)',
  },

  header: {
    flexShrink: 0,
    padding: [36, 40, 22],
    position: 'relative',
  },

  closeButton: {
    position: 'absolute',
    top: 40,
    right: 56,
  },

  title: {
    fontWeight: 700,
    fontSize: 28,
    lineHeight: '36px',
    marginBottom: 4,
  },

  subtitle: {
    display: 'flex',
    fontSize: 18,
    lineHeight: '23px',
  },

  count: {
    paddingRight: 16,
  },

  content: {
    overflow: 'auto',
    flexGrow: 1,
  },

  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: [24, 16],
    flexShrink: 0,
  },

  footerButton: {
    '&:not(:last-child)': {
      paddingRight: 12,
    },
  },

  tabContent: {},

  tabTitle: {
    padding: [24, 24, 0],
    fontWeight: 700,
    fontSize: 20,
    lineHeight: '28px',

    '& + $deleteConfirm': {
      marginTop: 16,
    },

    '& + $flagsTable': {
      marginTop: 16,
    },

    '& + $noChanges': {
      marginTop: 8,
    },
  },

  noChanges: {
    padding: [0, 24],
    fontSize: 16,
    lineHeight: '22px',
  },

  flagsTable: {},

  deleteConfirm: {
    display: 'flex',
    gap: 32,
    padding: 16,
    margin: [8, 8, 16],
    borderRadius: 8,
  },

  deleteConfirmSmall: {
    display: 'flex',
    padding: [4, 8, 4, 12],
    borderRadius: [0, 6, 6, 6],
    marginTop: 4,
    fontSize: 12,
  },

  deleteConfirmWarning: {},

  deleteConfirmInfo: {},

  deleteConfirmWarningCircleIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
    marginTop: 4,
  },

  radioList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 24,
  },

  flagRow: {
    display: 'flex',
    padding: [16, 40, 16, 24],
    fontSize: 16,
    lineHeight: '22px',
  },

  emptyContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },

  emptyContentMessage: {
    width: 154,
  },
};

export const radioButtonTweakStyles = {
  label: {
    alignItems: 'center',
  },
  input: {
    backgroundColor: colors.CLASSIC_WHITE,
  },
};

export const closeButtonTweakStyles = {
  small: {
    '& $content': {
      gap: 4,
    },
  },
};

export type SyncPortalsFormStyles = ComponentStyles<typeof styles>;
