import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { useFeatureTogglesTheme } from '../../../../../hooks';
import { TIME_FORMAT, DATE_FORMAT } from '../../../../../constants';
import { IHistoryOfChangesListItem } from '../../../../../types';
import { styles } from '../../HistoryOfChangesListItemContent.styles';

export interface IFlagHeader {
  listItem: IHistoryOfChangesListItem;
}

const FlagHeader: FC<IFlagHeader> = ({
  listItem: {
    time,
    featureFlag: { description, name },
  },
}) => {
  const { classes } = useFeatureTogglesTheme(
    'HistoryOfChangesListItemContent',
    styles,
    {},
  );

  const { t } = useTranslation();

  const formattedTime = `${format(time, DATE_FORMAT)} ${t(
    'dateTimeFormatPreposition',
  )} ${format(time, TIME_FORMAT)}`;

  const title =
    description !== '' && description !== undefined
      ? description
      : `${t('featureFlag')}: ${name}`;

  return (
    <div className={classes.head}>
      <p className={classes.title}>{title}</p>
      <p className={classes.lightGreyText}>{formattedTime}</p>
    </div>
  );
};

export default FlagHeader;
