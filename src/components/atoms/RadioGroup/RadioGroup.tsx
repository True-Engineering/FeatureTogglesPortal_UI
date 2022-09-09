import React from 'react';
import {
  RadioButton,
  IRadioButtonProps,
} from '@true-engineering/true-react-common-ui-kit';
import { useFeatureTogglesTheme } from '../../../hooks';
import { styles } from './RadioGroup.styles';

export interface IRadioGroupProps<Value extends string> {
  options: Array<IRadioButtonProps<Value> & { key: string }>;
}

export function RadioGroup<Value extends string>({
  options,
}: IRadioGroupProps<Value>): JSX.Element {
  const { classes } = useFeatureTogglesTheme('RadioGroup', styles, {});

  return (
    <ul className={classes.root}>
      {options.map(({ key, ...props }) => (
        <li key={key}>
          <RadioButton {...props} />
        </li>
      ))}
    </ul>
  );
}

export default RadioGroup;
