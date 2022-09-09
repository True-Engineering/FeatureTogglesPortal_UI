import { createContext, useContext, useMemo } from 'react';
import { createUseStyles, Styles } from 'react-jss';
import { merge } from 'lodash';
import { ComponentStyles } from '@true-engineering/true-react-common-ui-kit';
import type {
  FeatureTogglesComponentName,
  FeatureTogglesUiTheme,
} from '../types';

export interface IFeatureTogglesThemeContext {
  theme?: FeatureTogglesUiTheme;
}

export const FeatureTogglesThemeContext = createContext<IFeatureTogglesThemeContext>(
  {},
);

export const useFeatureTogglesTheme = <StyleSheet extends Styles>(
  componentName: FeatureTogglesComponentName,
  styles: StyleSheet,
  tweakStyles?: ComponentStyles<StyleSheet>,
  options?: Record<string, unknown>,
): {
  classes: Record<keyof StyleSheet, string>;
  componentStyles: StyleSheet;
} => {
  const { theme } = useContext(FeatureTogglesThemeContext);
  if (theme === undefined) {
    throw new Error('no feature toggles context');
  }

  const { components } = theme;

  const newStyles = useMemo(
    () =>
      merge(
        {},
        styles,
        components?.[componentName] ?? {},
        tweakStyles,
      ) as StyleSheet,
    [styles, components?.[componentName], tweakStyles],
  );

  return {
    classes: createUseStyles(newStyles)(options) as Record<
      keyof StyleSheet,
      string
    >,
    componentStyles: newStyles,
  };
};
