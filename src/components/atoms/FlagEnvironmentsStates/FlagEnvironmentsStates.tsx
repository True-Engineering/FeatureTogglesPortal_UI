import React, { FC } from 'react';
import clsx from 'clsx';
import { useFeatureTogglesTheme } from '../../../hooks';
import { IFlagEnvironment } from '../../../types';
import { styles } from './FlagEnvironmentsStates.styles';

export interface IFlagEnvironmentsStatesProps {
  environments: IFlagEnvironment[];
}

const FlagEnvironmentsStates: FC<IFlagEnvironmentsStatesProps> = ({
  environments,
}) => {
  const { classes } = useFeatureTogglesTheme(
    'FlagEnvironmentsStates',
    styles,
    {},
  );

  return (
    <div className={classes.root}>
      {environments.map(({ name, isEnabled }) => (
        <div key={name} className={classes.item}>
          <div className={clsx(classes.dot, isEnabled && classes.dotEnabled)} />
          <div className={clsx(classes.name, isEnabled && classes.nameEnabled)}>
            {name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlagEnvironmentsStates;
