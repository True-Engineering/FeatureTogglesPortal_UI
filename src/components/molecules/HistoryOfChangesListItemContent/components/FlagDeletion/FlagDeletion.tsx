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

export interface IFlagDeletion {
  listItem: IHistoryOfChangesListItem;
}

const FlagDeletion: FC<IFlagDeletion> = ({
  listItem,
  listItem: { userName },
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
            color="red"
            text={t('historyOfChangesActions.deletion')}
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
      </div>
    </>
  );
};

export default FlagDeletion;
