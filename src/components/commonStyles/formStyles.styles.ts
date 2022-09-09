import {
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';

const { colors } = commonTheme;

export const styles = {
  root: {},

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 28,
  },

  buttonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 40,
    gap: 16,
  },

  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 24,
  },

  shortInput: {
    width: 224,
    marginRight: 14,
    '&:last-child': {
      marginRight: 0,
    },
  },

  button: {},

  input: {},

  buttonFloatLeft: {
    marginRight: 'auto',
  },

  notification: {
    marginBottom: 28,
  },

  trashIcon: {
    width: 19,
    height: 19,
  },

  section: {
    display: 'flex',
    gap: 24,
    // Сделала отступ на 2px меньше потому что иначе появляется прокрутка нежелательная на 13 дюймах
    padding: [26, 0],
    borderBottom: [1, 'solid', colors.BORDER_MAIN],

    '&:first-child': {
      borderTop: [1, 'solid', colors.BORDER_MAIN],
    },
  },
};

export type FormStyles = ComponentStyles<typeof styles>;
