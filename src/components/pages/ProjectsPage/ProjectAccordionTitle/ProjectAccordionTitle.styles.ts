import {
  commonTheme,
  ComponentStyles,
} from '@true-engineering/true-react-common-ui-kit';

const { colors } = commonTheme;

export const styles = {
  root: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
  },

  star: {
    width: 26,
    height: 26,
    position: 'relative',
    marginRight: 14,
  },

  starDefault: {
    extend: 'star',
  },

  starNotDefault: {
    extend: 'star',
    color: colors.BORDER_MAIN,
    opacity: 0,
    transition: '0.25s ease-in-out',
    transitionProperty: 'opacity',

    'div[class^="header"]:hover &': {
      opacity: 1,
    },

    '&:hover > $tooltip': {
      display: 'block',
    },
  },

  tooltip: {
    display: 'none',
    position: 'absolute',
    top: 'calc(-100% - 10px)',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'max-content',
  },

  projectName: {
    width: 476,
    fontSize: 20,
    fontWeight: 'bold',
  },

  projectDefault: {
    paddingLeft: 16,
  },

  projectInfo: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',

    '&:last-child': {
      // отступ для случая, когда у нас нет actionButton в конце
      marginRight: 38,
    },
  },

  projectCounts: {
    display: 'flex',
    alignItems: 'center',
    width: '60%',
  },

  membersCount: {
    width: '60%',
  },

  featureFlagsCount: {
    width: '40%',
  },

  editButton: {
    margin: [-4, 0, -4, 8],

    opacity: 0,
    transition: '0.25s ease-in-out',
    transitionProperty: 'opacity',

    'div[class^="header"]:hover &': {
      opacity: 1,
    },
  },

  linkButton: {
    display: 'flex',
    textDecoration: 'none',
  },
};

export const linkButtonTweakStyles = {
  icon: {
    padding: 2,
  },
};

export type ProjectAccordionTitleStyles = ComponentStyles<typeof styles>;
