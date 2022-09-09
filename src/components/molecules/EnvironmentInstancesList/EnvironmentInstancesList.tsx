import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { format } from 'date-fns';
import { ITextWithStatusProps, IconButton, TextWithStatus } from '../../atoms';
import { useFeatureTogglesTheme } from '../../../hooks';
import { sortById } from '../../../utils';
import { DATE_TIME_FORMAT } from '../../../constants';
import {
  IProjectEnvironmentInstance,
  IProjectEnvironmentInstanceStatus,
} from '../../../types';
import { tableStyles } from '../../commonStyles';
import { styles } from './EnvironmentInstancesList.styles';

export interface IEnvironmentInstancesListProps {
  instances: IProjectEnvironmentInstance[];
  onDeleteEnvironmentInstance?: (instance: IProjectEnvironmentInstance) => void;
}

const statusColors: Record<
  IProjectEnvironmentInstanceStatus,
  ITextWithStatusProps['color']
> = {
  ACTIVE: 'green',
  OUT_OF_SYNC: 'grey',
  UNAVAILABLE: 'red',
};

const EnvironmentInstancesList: FC<IEnvironmentInstancesListProps> = ({
  instances,
  onDeleteEnvironmentInstance,
}) => {
  const { t } = useTranslation();
  const { classes } = useFeatureTogglesTheme(
    'EnvironmentInstancesList',
    styles,
    {},
  );
  const { classes: tableClasses } = useFeatureTogglesTheme(
    'tableStyles',
    tableStyles,
    {},
  );

  const sortedInstances = useMemo(() => sortById(instances), [instances]);

  return (
    <div
      className={clsx(
        tableClasses.table,
        tableClasses.disabledBorders,
        tableClasses.compact,
        classes.root,
      )}
    >
      <div className={tableClasses.headRow}>
        <div className={clsx(tableClasses.headCell, classes.nameColumn)}>
          {t('name')}
        </div>
        <div className={clsx(tableClasses.headCell, classes.statusColumn)}>
          {t('status')}
        </div>
        <div className={clsx(tableClasses.headCell, classes.updatedColumn)}>
          {t('connectionToServer')}
        </div>
        <div className={clsx(tableClasses.headCell, classes.actionsColumn)} />
      </div>
      {sortedInstances.map(instance => {
        const {
          id: instanceId,
          name: instanceName,
          status,
          updated,
        } = instance;
        return (
          <div key={instanceId} className={tableClasses.row}>
            <div
              className={clsx(
                tableClasses.cell,
                classes.nameColumn,
                classes.nameCell,
              )}
            >
              {instanceName}
            </div>
            <div className={clsx(tableClasses.cell, classes.statusColumn)}>
              <TextWithStatus
                color={statusColors[status]}
                text={t(`environmentInstanceStatus.${status}`)}
              />
            </div>
            <div className={clsx(tableClasses.cell, classes.updatedColumn)}>
              {updated !== undefined && format(updated, DATE_TIME_FORMAT)}
            </div>
            <div className={clsx(tableClasses.cell, classes.actionsColumn)}>
              {onDeleteEnvironmentInstance !== undefined && (
                <div
                  className={clsx(
                    tableClasses.actionButton,
                    classes.iconButton,
                  )}
                >
                  <IconButton
                    icon="trash-can"
                    onClick={() => onDeleteEnvironmentInstance(instance)}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EnvironmentInstancesList;
