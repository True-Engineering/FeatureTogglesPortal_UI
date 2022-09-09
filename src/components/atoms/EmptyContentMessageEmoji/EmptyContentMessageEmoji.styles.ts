import {
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';

const { colors } = commonTheme;

export const styles = {
  empty: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 12,
    color: colors.BORDER_MAIN,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: '22px',
  },

  eyes: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    fontSize: 32,
    backgroundColor: colors.GREY_BACKGROUND,
    borderRadius: '50%',
    margin: [12, 0],
  },
};

export type EmptyContentMessageEmojiStyles = ComponentStyles<typeof styles>;
