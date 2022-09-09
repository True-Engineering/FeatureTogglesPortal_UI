import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { TextWithStatus } from '../../../../atoms';
import { useFeatureTogglesTheme } from '../../../../../hooks';
import { IHistoryOfChangesListItem } from '../../../../../types';
import {
  styles,
  textWithStatusTweakStyles,
} from '../../HistoryOfChangesListItemContent.styles';
import { FlagHeader } from '../FlagHeader';

export interface IFlagCreation {
  listItem: IHistoryOfChangesListItem;
}

const FlagCreation: FC<IFlagCreation> = ({
  listItem,
  listItem: { creationInfo, userName },
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
            color="green"
            text={t('historyOfChangesActions.creation')}
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
        {creationInfo !== undefined &&
          ([
            { dataKey: 'name', label: t('featureFlag') },
            { dataKey: 'description', label: t('task') },
            { dataKey: 'sprint', label: t('sprint') },
            { dataKey: 'type', label: t('type') },
            { dataKey: 'tag', label: t('tag') },
            { dataKey: 'group', label: t('group') },
          ] as const).map(
            ({ dataKey, label }) =>
              creationInfo[dataKey] && (
                <div key={dataKey} className={classes.row}>
                  <span className={clsx(classes.lightGreyText, classes.name)}>
                    {label}
                  </span>
                  {creationInfo[dataKey]}
                </div>
              ),
          )}
      </div>
    </>
  );
};

export default FlagCreation;
