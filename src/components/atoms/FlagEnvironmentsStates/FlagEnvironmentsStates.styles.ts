import {
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';

const { colors } = commonTheme;

export const styles = {
  root: {
    display: 'flex',
    cursor: 'default',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },

  dot: {
    width: 6,
    height: 6,
    backgroundColor: colors.BORDER_MAIN,
    borderRadius: '50%',
  },

  dotEnabled: {},

  name: {
    color: colors.BORDER_MAIN,
    fontSize: 14,
  },

  nameEnabled: {},
};

export type FlagEnvironmentsStatesStyles = ComponentStyles<typeof styles>;
