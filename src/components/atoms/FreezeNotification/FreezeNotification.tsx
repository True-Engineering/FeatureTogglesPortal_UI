import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { useFeatureTogglesTheme } from '../../../hooks';
import { getDateFnsLocale } from '../../../utils';
import { LONG_DATE_TIME_FORMAT } from '../../../constants';
import { ILocale, IProjectEnvironment } from '../../../types';
import { styles } from './FreezeNotification.styles';
import { ProjectUniqueIcon } from '..';

export interface FreezeNotificationProps {
  freezingEndTime: IProjectEnvironment['freezingEndTime'];
  freezingUser: IProjectEnvironment['freezingUser'];
  environmentName: IProjectEnvironment['name'];
}

const FreezeNotification: FC<FreezeNotificationProps> = ({
  freezingEndTime,
  freezingUser,
  environmentName,
}) => {
  const { classes } = useFeatureTogglesTheme('FreezeNotification', styles, {});

  const { t, i18n } = useTranslation();
  const dateFnsLocale = getDateFnsLocale(i18n.language as ILocale);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.circle}>
          <div className={classes.icon}>
            <ProjectUniqueIcon type="snowflake" />
          </div>
        </div>
        {t('freezeFeatureFlags.freezeNotification', {
          environmentName,
          userName: freezingUser,
          time:
            freezingEndTime !== undefined &&
            format(freezingEndTime, LONG_DATE_TIME_FORMAT, {
              locale: dateFnsLocale,
            }),
        })}
      </div>
    </div>
  );
};

export default FreezeNotification;
