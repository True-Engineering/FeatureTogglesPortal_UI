import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Icon } from '@true-engineering/true-react-common-ui-kit';
import { TextWithStatus, ProjectUniqueIcon } from '../../../../atoms';
import { useFeatureTogglesTheme } from '../../../../../hooks';
import { IHistoryOfChangesListItem } from '../../../../../types';
import {
  styles,
  textWithStatusTweakStyles,
} from '../../HistoryOfChangesListItemContent.styles';
import { FlagHeader } from '../FlagHeader';

export interface IFlagEnvironmentStatusChangesProps {
  listItem: IHistoryOfChangesListItem;
}

const FlagEnvironmentStatusChanges: FC<IFlagEnvironmentStatusChangesProps> = ({
  listItem,
  listItem: { userName, environment, action },
}) => {
  const { classes } = useFeatureTogglesTheme(
    'HistoryOfChangesListItemContent',
    styles,
    {},
  );

  const { t } = useTranslation();

  return (
    <>
      <FlagHeader listItem={listItem} />
      <div className={classes.body}>
        <div className={classes.row}>
          <span className={clsx(classes.lightGreyText, classes.name)}>
            {t('action')}
          </span>
          <TextWithStatus
            color="blue"
            text={t('historyOfChangesActions.edition')}
            size="s"
            tweakStyles={textWithStatusTweakStyles}
          />
        </div>
        <div className={classes.row}>
          <span className={clsx(classes.lightGreyText, classes.name)}>
            {t('author')}
          </span>
          {userName}
        </div>
        <div className={clsx(classes.environmentChanges)}>
          <span className={clsx(classes.greyBoldText, classes.environmentName)}>
            {environment}
          </span>
          <div className={clsx(classes.changes)}>
            <div className={clsx(classes.value, classes.environmentOldValue)}>
              {action === 'ENABLE' && (
                <>
                  <div className={clsx(classes.icon, classes.circleIcon)}>
                    <ProjectUniqueIcon type="crossed-circle-check" />
                  </div>
                  {t('off')}
                </>
              )}
              {action === 'DISABLE' && (
                <>
                  <div className={clsx(classes.icon, classes.circleIcon)}>
                    <Icon type="circle-check" />
                  </div>
                  {t('on')}
                </>
              )}
            </div>
            <div className={clsx(classes.icon, classes.arrowIcon)}>
              <Icon type="arrow-right" />
            </div>
            <div className={clsx(classes.value)}>
              {action === 'ENABLE' && (
                <>
                  <div
                    className={clsx(
                      classes.icon,
                      classes.circleIcon,
                      classes.enableNewIcon,
                    )}
                  >
                    <Icon type="circle-check" />
                  </div>
                  {t('on')}
                </>
              )}
              {action === 'DISABLE' && (
                <>
                  <div
                    className={clsx(
                      classes.icon,
                      classes.circleIcon,
                      classes.disableNewIcon,
                    )}
                  >
                    <ProjectUniqueIcon type="crossed-circle-check" />
                  </div>
                  {t('off')}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlagEnvironmentStatusChanges;
