import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Icon } from '@true-engineering/true-react-common-ui-kit';
import { TextWithStatus } from '../../../../atoms';
import { useFeatureTogglesTheme } from '../../../../../hooks';
import { IHistoryOfChangesListItem } from '../../../../../types';
import {
  styles,
  textWithStatusTweakStyles,
} from '../../HistoryOfChangesListItemContent.styles';
import { FlagHeader } from '../FlagHeader';

export interface IFlagEdition {
  listItem: IHistoryOfChangesListItem;
}

const FlagEdition: FC<IFlagEdition> = ({
  listItem,
  listItem: { changes, userName },
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
        {([
          'name',
          'description',
          'sprint',
          'type',
          'tag',
          'group',
        ] as const).map(
          key =>
            changes[key] !== undefined && (
              <div key={key} className={classes.row}>
                <span className={clsx(classes.lightGreyText, classes.name)}>
                  {key === 'description' ? t('task') : t(key)}
                </span>
                <div className={clsx(classes.changes)}>
                  <span className={clsx(classes.lightGreyText, classes.old)}>
                    {changes[key]?.old !== undefined && changes[key]?.old !== ''
                      ? changes[key]?.old
                      : '???'}
                  </span>
                  <div className={clsx(classes.icon, classes.arrowIcon)}>
                    <Icon type="arrow-right" />
                  </div>
                  {changes[key]?.new !== undefined && changes[key]?.new !== ''
                    ? changes[key]?.new
                    : '???'}
                </div>
              </div>
            ),
        )}
      </div>
    </>
  );
};

export default FlagEdition;
