import React, { FC, useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { Select, Input } from '@true-engineering/true-react-common-ui-kit';
import { TableContent, GroupTableContent } from './components';
import { EmptyContentMessage } from '../../atoms';
import { ITableItemProps } from '../../molecules';
import { useFeatureTogglesTheme } from '../../../hooks';
import { uniqArray } from '../../../utils';
import { sortAndFilterItems } from './helpers';
import {
  IFlag,
  ISortBy,
  ISortDirection,
  IFlagTypeProp,
  FLAG_TYPES,
} from '../../../types';
import {
  styles,
  inputTweakStyles,
  selectTweakStyles,
} from './FlagsTable.styles';

export type IMainFilter = string;
export type ITypeFilter = IFlagTypeProp | 'all';
export type ITagFilter = string | 'all';

const flagTypesSelectOptions: ITypeFilter[] = ['all', ...FLAG_TYPES];

export interface IFlagsTableProps {
  items: IFlag[];
  isGroupView?: boolean;
  tableItemProps: Omit<ITableItemProps, 'item'>;
}

const FlagsTable: FC<IFlagsTableProps> = ({
  items,
  isGroupView: groupView = false,
  tableItemProps,
}) => {
  const { classes } = useFeatureTogglesTheme('FlagsTable', styles, {});
  const { t } = useTranslation();

  const [sortBy, setSortBy] = useState<ISortBy>('sprint');
  const [direction, setDirection] = useState<ISortDirection>('desc');

  const [mainFilter, setMainFilter] = useState<IMainFilter>('');
  const [typeFilter, setTypeFilter] = useState<ITypeFilter>('all');
  const [tagFilter, setTagFilter] = useState<ITagFilter>('all');

  const [sortedAndFilteredItems, setSortedAndFilteredItems] = useState(
    sortAndFilterItems({
      items,
      groupView,
      mainFilter,
      typeFilter,
      tagFilter,
      sortBy,
      direction,
    }),
  );

  const tagSelectOptions = useMemo(
    () => [
      'all',
      ...uniqArray(
        items
          .map(item => item.tag)
          .filter(tag => tag !== undefined) as string[],
      ),
    ],
    [items],
  );

  const debouncedSortAndFilterItems = useMemo(
    () => debounce(setSortedAndFilteredItems, 500),
    [],
  );

  useEffect(() => {
    debouncedSortAndFilterItems(
      sortAndFilterItems({
        items,
        groupView,
        mainFilter,
        typeFilter,
        tagFilter,
        sortBy,
        direction,
      }),
    );

    return debouncedSortAndFilterItems.cancel;
  }, [items, groupView, mainFilter, typeFilter, tagFilter, sortBy, direction]);

  function handleSort(value: ISortBy) {
    if (value === sortBy) {
      setDirection(direction === 'asc' ? 'desc' : 'asc');
    } else {
      setDirection('desc');
      setSortBy(value);
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.filterContainer}>
        <div className={classes.taskFilter}>
          <Input
            testId="input-search"
            type="text"
            label={groupView ? t('groupName') : t('mainFilterLabel')}
            placeholder={groupView ? t('groupName') : t('mainFilterLabel')}
            value={mainFilter}
            onChange={setMainFilter}
            tweakStyles={inputTweakStyles}
            hasFloatingLabel={false}
            isClearable
          />
        </div>
        <div className={classes.typeFilter}>
          <Select
            testId="select-type"
            label={t('type')}
            value={typeFilter}
            isDisabled={groupView}
            convertValueToString={t}
            onChange={value => {
              if (value !== undefined) {
                setTypeFilter(value);
              }
            }}
            tweakStyles={selectTweakStyles}
            options={flagTypesSelectOptions}
          />
        </div>
        <div className={classes.tagFilter}>
          <Select
            testId="select-tag"
            label={t('tag')}
            value={tagFilter}
            isDisabled={groupView}
            options={tagSelectOptions}
            onChange={value => {
              if (value !== undefined) {
                setTagFilter(value);
              }
            }}
            tweakStyles={selectTweakStyles}
            convertValueToString={t}
          />
        </div>
      </div>
      {sortedAndFilteredItems.length === 0 ? (
        <EmptyContentMessage text={t('featureFlagsSearchEmpty')} />
      ) : groupView ? (
        <GroupTableContent
          items={sortedAndFilteredItems}
          tableItemProps={tableItemProps}
        />
      ) : (
        <>
          <TableContent
            items={sortedAndFilteredItems}
            sortBy={sortBy}
            direction={direction}
            onSortChange={handleSort}
            tableItemProps={tableItemProps}
          />
        </>
      )}
    </div>
  );
};

export default FlagsTable;
