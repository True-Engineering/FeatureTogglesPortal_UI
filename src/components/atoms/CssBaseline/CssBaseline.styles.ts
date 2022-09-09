import { Styles } from 'react-jss';
import normalize from 'normalize-jss';

export const styles = {
  ...normalize,

  '@global html, body': {
    fontFamily: 'Arial, sans-serif',
  },

  root: {},

  '@global *, ::after, ::before': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
};

export type CssBaselineStyles = Styles<string>;
