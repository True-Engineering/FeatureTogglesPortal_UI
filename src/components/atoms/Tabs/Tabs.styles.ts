import type { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';

const TAB_HEIGHT = 32;
const COUNT_HEIGHT = 24;

export const styles = {
  root: {
    width: '100%',
  },

  vertical: {
    '& $segments': {
      marginBottom: 12,
    },
  },

  horizontal: {
    display: 'flex',
    flexDirection: 'row',

    overflow: 'auto',
    height: '100%',

    '& $segments': {
      width: 240,
      flexShrink: 0,
      flexDirection: 'column',
      padding: [24, 16],
      overflow: 'auto',
    },

    '& $content': {
      flexGrow: 1,
      overflow: 'auto',
    },
  },

  segments: {
    display: 'flex',
    gap: 8,
  },

  defaultTab: {
    display: 'flex',
    alignItems: 'center',
    height: TAB_HEIGHT,
    padding: [0, TAB_HEIGHT / 2],
    borderRadius: TAB_HEIGHT / 2,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: '0.15px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    transition: '0.25s ease-in-out',
    transitionProperty: 'background-color, color, border-color',

    '& $count': {
      display: 'flex',
      alignItems: 'center',
      height: COUNT_HEIGHT,
      borderRadius: COUNT_HEIGHT / 2,
      padding: [0, 7],
      marginLeft: 6,
      marginRight: -10,
      transition: '0.25s ease-in-out',
      transitionProperty: 'background-color, border-color',
      border: ['solid', 1],
    },
  },

  tab: {
    extend: 'defaultTab',
  },

  activeTab: {
    extend: 'defaultTab',
  },

  defaultSecondTab: {
    display: 'flex',
    alignItems: 'center',
    padding: [8, 16],
    fontSize: 16,
    lineHeight: '22px',
    borderRadius: 4,
    border: 'none',
    background: 'none',
    flexWrap: 'wrap',

    '& $count': {
      marginLeft: 'auto',
    },
  },

  secondTab: {
    extend: 'defaultSecondTab',
  },

  activeSecondTab: {
    extend: 'defaultSecondTab',
  },

  count: {},

  inactiveTab: {},

  content: {},
};

export type TabsStyles = ComponentStyles<typeof styles>;
