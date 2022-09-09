import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { TableItem, ITableItemProps, GroupRow } from '../../../../molecules';
import { useFeatureTogglesTheme } from '../../../../../hooks';
import { uniqArray } from '../../../../../utils';
import { IFlag } from '../../../../../types';
import { styles } from '../../FlagsTable.styles';

export interface IGroupTableProps {
  items: IFlag[];
  tableItemProps: Omit<ITableItemProps, 'item'>;
}

const GroupTableContent: FC<IGroupTableProps> = ({ items, tableItemProps }) => {
  const { classes } = useFeatureTogglesTheme('FlagsTable', styles, {});
  const { t } = useTranslation();

  const groupsName: string[] = uniqArray(items.map(item => item.group ?? ''));

  return (
    <table className={classes.table}>
      <thead>
        <tr className={classes.headRow}>
          <th className={clsx(classes.sprintHeader, classes.groupSort)}>
            <div>{t('sprint')}</div>
          </th>
          <th className={clsx(classes.taskHeader, classes.groupSort)}>
            <div>{t('task')}</div>
          </th>
          <th className={clsx(classes.typeHeader, classes.groupSort)}>
            <div>{t('type')}</div>
          </th>
          <th className={clsx(classes.tagHeader, classes.groupSort)}>
            <div>{t('tag')}</div>
          </th>
          <th className={classes.flagStateHeader} />
          <th className={classes.actionHeader} />
        </tr>
      </thead>
      <tbody>
        {groupsName
          .sort((a, b): number => b.length - a.length)
          .map(group => (
            <GroupRow group={group === '' ? t('noGroup') : group} key={group}>
              {items
                .filter(item => group === (item.group ?? ''))
                .map(item => (
                  <TableItem key={item.name} item={item} {...tableItemProps} />
                ))}
            </GroupRow>
          ))}
      </tbody>
    </table>
  );
};

export default GroupTableContent;
