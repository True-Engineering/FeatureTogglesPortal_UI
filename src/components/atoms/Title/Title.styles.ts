import {
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';

const { colors } = commonTheme;

export const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  title: {
    display: 'flex',
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 20,
  },

  titleRight: {
    display: 'flex',
    alignItems: 'center',
  },

  subTitle: {
    color: colors.GREY_ACTIVE,
    letterSpacing: '-0.15px',
    marginLeft: 12,
  },
};

export type TitleStyles = ComponentStyles<typeof styles>;
