import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  FlagEnvironmentsListItem,
  IFlagEnvironmentsListItemProps,
} from './components';
import { useFeatureTogglesTheme } from '../../../hooks';
import { sortById } from '../../../utils';
import { IFlag, IProjectEnvironment } from '../../../types';
import { tableStyles } from '../../commonStyles';
import { styles } from './FlagEnvironmentsList.styles';

export interface IFlagEnvironmentsListProps {
  flag: IFlag;
  onFlagStateChange: IFlagEnvironmentsListItemProps['onSwitchChange'];
  onEditFlagStrategy: IFlagEnvironmentsListItemProps['onEdit'];
  frozenEnvironments?: IProjectEnvironment[];
}

const FlagEnvironmentsList: FC<IFlagEnvironmentsListProps> = ({
  flag,
  flag: { environments },
  onFlagStateChange,
  onEditFlagStrategy,
  frozenEnvironments,
}) => {
  const { t } = useTranslation();
  const { classes } = useFeatureTogglesTheme('FlagEnvironmentsList', styles);
  const { classes: tableClasses } = useFeatureTogglesTheme(
    'tableStyles',
    tableStyles,
    {},
  );

  const sortedEnvironments = useMemo(() => sortById(environments), [
    environments,
  ]);

  return sortedEnvironments.length === 0 ? (
    <div className={classes.empty}>{t('emptyProjectEnvironmentsList')}</div>
  ) : (
    <div
      className={clsx(tableClasses.table, tableClasses.shadow, classes.root)}
    >
      <div className={tableClasses.headRow}>
        <div className={clsx(tableClasses.headCell, classes.nameColumn)}>
          {t('environment')}
        </div>
        <div className={clsx(tableClasses.headCell, classes.strategyColumn)}>
          {t('flippingStrategySectionTitle')}
        </div>
        <div className={clsx(tableClasses.headCell, classes.flagStateColumn)} />
      </div>
      {sortedEnvironments.map(environment => {
        const { id } = environment;

        const environmentFreezingData = frozenEnvironments?.find(
          ({ id: frozenEnvironmentId }) => frozenEnvironmentId === id,
        );

        const freezingInfo = {
          freezingEnable: environmentFreezingData?.freezingEnable,
          freezingEndTime: environmentFreezingData?.freezingEndTime,
        };

        return (
          <FlagEnvironmentsListItem
            flag={flag}
            key={environment.id}
            environment={environment}
            onSwitchChange={onFlagStateChange}
            onEdit={onEditFlagStrategy}
            freezingInfo={freezingInfo}
          />
        );
      })}
    </div>
  );
};

export default FlagEnvironmentsList;
