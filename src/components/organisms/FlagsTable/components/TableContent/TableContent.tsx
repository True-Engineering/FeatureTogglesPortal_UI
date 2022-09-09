import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SortHead } from '../../../../atoms';
import { TableItem, ITableItemProps } from '../../../../molecules';
import { useFeatureTogglesTheme } from '../../../../../hooks';
import { IFlag, ISortBy, ISortDirection } from '../../../../../types';
import { styles } from '../../FlagsTable.styles';

export interface ITableProps {
  items: IFlag[];
  sortBy: ISortBy;
  direction: ISortDirection;
  tableItemProps: Omit<ITableItemProps, 'item'>;
  onSortChange: (value: ISortBy) => void;
}

const TableContent: FC<ITableProps> = ({
  items,
  tableItemProps,
  sortBy,
  direction,
  onSortChange,
}) => {
  const { classes } = useFeatureTogglesTheme('FlagsTable', styles, {});
  const { t } = useTranslation();

  return (
    <table className={classes.table}>
      <thead>
        <tr className={classes.headRow}>
          <th className={classes.sprintHeader}>
            <SortHead
              value="sprint"
              text={t('sprint')}
              direction={sortBy === 'sprint' ? direction : 'none'}
              isActive={sortBy === 'sprint'}
              onClick={onSortChange}
            />
          </th>
          <th className={classes.taskHeader}>
            <SortHead
              value="task"
              text={t('task')}
              direction={sortBy === 'task' ? direction : 'none'}
              isActive={sortBy === 'task'}
              onClick={onSortChange}
            />
          </th>
          <th className={classes.typeHeader}>
            <SortHead
              value="type"
              text={t('type')}
              direction={sortBy === 'type' ? direction : 'none'}
              isActive={sortBy === 'type'}
              onClick={onSortChange}
            />
          </th>
          <th className={classes.tagHeader}>
            <SortHead
              value="tag"
              text={t('tag')}
              direction={sortBy === 'tag' ? direction : 'none'}
              isActive={sortBy === 'tag'}
              onClick={onSortChange}
            />
          </th>
          <th className={classes.flagStateHeader} />
          <th className={classes.actionHeader} />
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <TableItem key={item.name} item={item} {...tableItemProps} />
        ))}
      </tbody>
    </table>
  );
};

export default TableContent;
