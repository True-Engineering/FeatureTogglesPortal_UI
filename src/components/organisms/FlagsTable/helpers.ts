import { uniqArray } from '../../../utils';
import { IFlag, ISortBy, ISortDirection } from '../../../types';
import { IMainFilter, ITagFilter, ITypeFilter } from './FlagsTable';

export const compareStrings = (
  a: string,
  b: string,
  direction: ISortDirection,
): number => {
  const aUp = a.toUpperCase();
  const bUp = b.toUpperCase();

  const k = aUp.localeCompare(bUp, undefined, {
    numeric: true,
    sensitivity: 'base',
  });

  return (direction === 'asc' ? 1 : -1) * k;
};

export const sortItems = ({
  items,
  sortBy,
  direction,
}: {
  items: IFlag[];
  sortBy: ISortBy;
  direction: ISortDirection;
}): IFlag[] =>
  items.sort((a, b) => {
    switch (sortBy) {
      case 'sprint':
        return compareStrings(a.sprint ?? '', b.sprint ?? '', direction);
      case 'task':
        return compareStrings(a.description, b.description, direction);
      case 'type':
        return compareStrings(a.type ?? '', b.type ?? '', direction);
      case 'tag':
        return compareStrings(a.tag ?? '', b.tag ?? '', direction);
      default:
        return 0;
    }
  });

export const filterItems = ({
  items,
  mainFilter,
  typeFilter,
  tagFilter,
}: {
  items: IFlag[];
  mainFilter: IMainFilter;
  typeFilter: ITypeFilter;
  tagFilter: ITagFilter;
}) =>
  items.filter(
    item =>
      findStringInFlag(item, mainFilter) &&
      (typeFilter === 'all' || typeFilter === item.type) &&
      (tagFilter === 'all' || tagFilter === item.tag),
  );

export const findStringInFlag = (flag: IFlag, str: string): boolean => {
  const mainFilterLow = str.toLowerCase();

  const { description, name, sprint, environments } = flag;

  const foundInCommon =
    description.toLowerCase().includes(mainFilterLow) ||
    name.toLowerCase().includes(mainFilterLow) ||
    sprint?.toLowerCase().includes(mainFilterLow);

  const foundInFlippingStrategy = environments.some(
    ({ flippingStrategy }) =>
      flippingStrategy !== undefined &&
      flippingStrategy.type === 'RequestContext' &&
      flippingStrategy.initParams !== undefined &&
      flippingStrategy.initParams.some(
        param =>
          param.name.toLowerCase().includes(mainFilterLow) ||
          param.values.some(p => p.toLowerCase().includes(mainFilterLow)),
      ),
  );

  return foundInCommon || foundInFlippingStrategy;
};

export const filterItemsForGroup = ({
  items,
  mainFilter,
}: {
  items: IFlag[];
  mainFilter: IMainFilter;
}): IFlag[] => {
  const mainFilterLow = mainFilter.toLowerCase();

  const groupsName: string[] = uniqArray(items.map(item => item.group ?? ''));

  const filteredGroups = groupsName.filter(group =>
    group?.toLowerCase().includes(mainFilterLow),
  );

  return items.filter(item => filteredGroups.includes(item.group ?? ''));
};

export const sortAndFilterItems = ({
  items,
  groupView,
  mainFilter,
  typeFilter,
  tagFilter,
  sortBy,
  direction,
}: {
  items: IFlag[];
  groupView: boolean;
  mainFilter: IMainFilter;
  typeFilter: ITypeFilter;
  tagFilter: ITagFilter;
  sortBy: ISortBy;
  direction: ISortDirection;
}): IFlag[] => {
  if (groupView) {
    return filterItemsForGroup({ items, mainFilter });
  }
  const filteredItems = filterItems({
    items,
    mainFilter,
    typeFilter,
    tagFilter,
  });

  return sortItems({ items: filteredItems, sortBy, direction });
};
