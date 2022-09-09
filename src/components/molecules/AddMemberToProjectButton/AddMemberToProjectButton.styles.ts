import {
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';

const { colors } = commonTheme;

export const styles = {
  root: {},

  icon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },

  buttonText: {},

  search: {
    padding: [6, 0],
  },

  popup: {
    display: 'flex',
    width: 280,
    height: 296,
    flexDirection: 'column',
    overflow: 'auto',
  },

  empty: {
    color: colors.GREY_ACTIVE,
    textAlign: 'center',
    fontSize: 14,
    paddingTop: 10,
  },
};

export const buttonTweakStyles = {
  s: {
    height: 40,
  },
};

export const searchTweakStyles = {
  input: {
    inputWrapper: {
      backgroundColor: 'transparent',
      border: 'none',
      height: 40,
    },
  },
};

export const listTweakStyles = {
  root: {
    overflow: 'auto',
    boxShadow: 'none',
  },

  item: {
    minHeight: 44,
  },

  icon: {
    width: 32,
    height: 32,
  },
};

export type AddMemberToProjectButtonStyles = ComponentStyles<typeof styles>;
