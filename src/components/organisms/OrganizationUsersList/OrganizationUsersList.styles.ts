import {
  rgba,
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';

const { colors } = commonTheme;

export const styles = {
  root: {},

  preloader: {
    width: 70,
    margin: 'auto',
  },

  filtersPane: {
    marginBottom: 16,
  },

  empty: {
    color: colors.GREY_ACTIVE,
    textAlign: 'center',
  },

  accordionContent: {
    width: '100%',
    padding: [24, 24, 36],
  },

  addToProjectButton: {
    display: 'flex',
    marginBottom: 20,
    marginLeft: 4,
  },

  projectPermission: {
    display: 'flex',
    backgroundColor: colors.CLASSIC_WHITE,
    borderRadius: 12,
    boxShadow: `0px 8px 32px -8px ${rgba(colors.FONT_MAIN, 0.13)}`,

    '&:not(:last-child)': {
      marginBottom: 16,
    },
  },

  projectName: {
    width: 264,
    padding: [20, 22],
    color: colors.FONT_MAIN,
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 0,
  },

  projectPermissionList: {
    overflow: 'auto',
    flexGrow: 1,
    borderRadius: 12,
  },
};

export const filtersPaneTweakStyles = {
  clear: {
    display: 'none',
  },
};

export const searchTweakStyles = {
  root: {
    width: 300,

    '& input': {
      minWidth: 220,
    },
  },

  selectWrapper: {
    display: 'none',
  },
};

export const accordionTweakStyles = {
  header: {
    padding: [16, 12],

    '$item:first-child &': {
      borderTop: 'none',
    },
  },
};

export type OrganizationUsersListStyles = ComponentStyles<typeof styles>;
