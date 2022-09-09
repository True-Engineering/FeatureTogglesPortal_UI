import {
  ComponentStyles,
  commonTheme,
} from '@true-engineering/true-react-common-ui-kit';

const { dimensions } = commonTheme;

export const styles = {
  root: {
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
  },

  inputWrapper: {
    display: 'flex',
    width: '100%',
    minHeight: dimensions.CONTROL_HEIGHT,
    boxSizing: 'border-box',
    transition: '0.25s ease-in-out',
    transitionProperty: 'border-color',
    backgroundColor: 'white',
    position: 'relative',
  },

  input: {
    border: 0,
    boxShadow: 'none',
    outline: 'none',
    padding: 0,
    background: 'none',
    flexGrow: 1,
    minHeight: 20,
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 'calc(100% - 6px)',
    marginLeft: 12,
    cursor: 'text',
    paddingBottom: 6,
  },

  tag: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 20,
    paddingRight: 4,
    paddingLeft: 6,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
    maxWidth: 400,
    overflowWrap: 'break-word',
  },

  removeTag: {
    display: 'inline-block',
    width: 20,
    height: 20,
    verticalAlign: 'middle',
  },

  focused: {
    position: 'relative',
    zIndex: 1,
  },

  withFloatingLabel: {
    paddingTop: 20,
  },

  floatingLabelWithoutPadding: {
    paddingTop: 18,
    paddingLeft: 0,
  },

  floating: {},

  activeLabel: {
    display: 'none',

    '&$floating': {
      display: 'block',
      transform: 'scale(0.75) translateY(-120%)',
    },
  },

  withIcon: {
    paddingRight: 34,
  },

  required: {
    '&:before': {
      content: '""',
      position: 'absolute',
      left: -12,
      top: '50%',
      transform: 'translate(0, -50%)',
      width: 6,
      height: 6,
      borderRadius: '50%',
    },
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    left: 12,
    top: 22,
    transformOrigin: 'top left',
    transform: 'translateY(-50%)',
    transition: '0.25s ease-in-out',
    transitionProperty: 'transform, color',
    fontSize: 16,
  },

  floatingWithoutPadding: {
    left: 0,
  },

  requiredLabel: {
    '&:after': {
      content: '""',
      position: 'absolute',
      right: -8,
      top: 4,
      transform: 'translate(0, -50%)',
      width: 6,
      height: 6,
      borderRadius: '50%',
    },
  },

  left: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  right: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  middle: {
    borderRadius: 0,
  },

  invalid: {},

  disabled: {},

  invalidLabel: {},

  error: {
    fontSize: 12,
  },

  'error-top': {
    position: 'absolute',
    top: -18,
    left: -1,
    padding: [4, 8],
    zIndex: 1,
  },

  'error-bottom': {
    paddingTop: 4,
    paddingLeft: 13,
  },

  tooltip: {
    position: 'absolute',
    top: 'calc(100% + 10px)',
    width: 'max-content',
    zIndex: 99999,
  },
};

export type MultipleInputStyles = ComponentStyles<typeof styles>;
