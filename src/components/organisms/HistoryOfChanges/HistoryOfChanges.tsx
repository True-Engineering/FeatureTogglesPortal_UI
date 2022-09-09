import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useIsMounted,
  FiltersPane,
  ThemedPreloader,
} from '@true-engineering/true-react-common-ui-kit';
import { EmptyContentMessageEmoji } from '../../atoms';
import {
  HistoryOfChangesListItemContent,
  ListForInfiniteScroll,
  ListForInfiniteScrollItem,
} from '../../molecules';
import { useApi, useFeatureTogglesTheme } from '../../../hooks';
import {
  IFetchGetFeatureFlagsForFilterResponse,
  IFetchGetTagsForFilterResponse,
  IFetchGetUsersForFilterResponse,
} from '../../../transport';
import {
  FILTERS_PANE_PAGE_SIZE,
  HISTORY_OF_CHANGES_PAGE_SIZE,
} from '../../../constants';
import { IHistoryOfChanges, IHistoryOfChangesListItem } from '../../../types';
import { IFilterValues } from './types';
import {
  styles,
  emptyMessageEmojiTweakStyles,
  dotsPreloaderTweakStyles,
  themedPreloaderTweakStyles,
  listForInfiniteScrollTweakStyles,
} from './HistoryOfChanges.styles';

export interface IHistoryOfChangesProps {
  projectId?: number;
  organizationId?: number;
}

export const HistoryOfChanges: FC<IHistoryOfChangesProps> = ({
  organizationId,
  projectId,
}) => {
  const [fetchParams, setFetchParams] = useState({
    page: 0,
    pageSize: HISTORY_OF_CHANGES_PAGE_SIZE,
  });
  const [filters, setFilters] = useState<IFilterValues>();
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [data, setData] = useState<IHistoryOfChangesListItem[]>([]);

  const { classes } = useFeatureTogglesTheme('HistoryOfChanges', styles, {});

  const observerRef = useRef<IntersectionObserver>();

  const { t, i18n } = useTranslation();
  const api = useApi();
  const isMounted = useIsMounted();

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isLastPage) {
      setFetchParams(prev => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  const lastItemRef = (node: HTMLLIElement) => {
    if (isLoading || isLastPage) {
      return;
    }
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };
    observerRef.current = new IntersectionObserver(handleObserver, option);
    if (node) {
      observerRef.current.observe(node);
    }
  };

  const loadFeatureFlagsForFilters = useCallback(
    (
      template: string | undefined,
      page = 0,
    ): Promise<IFetchGetFeatureFlagsForFilterResponse> =>
      api.getFeatureFlagsForFilters({
        organizationId,
        projectId,
        template,
        page,
        pageSize: FILTERS_PANE_PAGE_SIZE,
      }),
    [],
  );

  const loadUsersForFilters = useCallback(
    (
      template: string | undefined,
      page = 0,
    ): Promise<IFetchGetUsersForFilterResponse> =>
      api.getUsersForFilters({
        organizationId,
        projectId,
        template,
        page,
        pageSize: FILTERS_PANE_PAGE_SIZE,
      }),
    [],
  );

  const loadTagsForFilters = useCallback(
    (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      template: string | undefined,
      page = 0,
    ): Promise<IFetchGetTagsForFilterResponse> =>
      api.getTagsForFilters({
        organizationId,
        projectId,
        page,
        pageSize: FILTERS_PANE_PAGE_SIZE,
      }),
    [],
  );

  const loadHistory = async () => {
    if (isLoading) {
      return;
    }

    if (organizationId === undefined || projectId === undefined) {
      console.error('History cant be loaded because of invalid request params');
      return;
    }

    setIsLoading(true);

    try {
      const loadedHistory: IHistoryOfChanges = await api.getHistoryOfChanges({
        organizationId,
        projectId,
        ...fetchParams,
        ...filters,
      });

      if (isMounted()) {
        setData(prev => [...prev, ...loadedHistory.changesHistory]);

        if (loadedHistory.totalPages - 1 === loadedHistory.page) {
          setIsLastPage(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Когда применяются фильтры сбрасываем загруженные данные
  useEffect(() => {
    setData([]);
    setFetchParams(prev => ({
      ...prev,
      page: 0,
    }));
    setIsLastPage(false);
  }, [filters]);

  useEffect(() => {
    loadHistory();
  }, [fetchParams]);

  return (
    <>
      <div className={classes.header}>
        <h3 className={classes.title}>{t('historyOfChanges')}</h3>
        <FiltersPane
          localeKey={i18n.language.startsWith('ru') ? 'ru' : 'en'}
          filtersConfig={{
            feature: {
              name: t('featureFlag'),
              type: 'select',
              fetchOptions: loadFeatureFlagsForFilters,
              getValueView: value => value.label,
              getValueId: value => value.id,
              isSearchEnabled: true,
              hasClearButton: filters?.feature !== undefined,
              // TODO пофиксить в либе стили для случая Ничего не найдено(Когда скрывается кнопка Очистить, бросается в глаза что это сообщение не по центру)
            },
            user: {
              name: t('user'),
              type: 'select',
              fetchOptions: loadUsersForFilters,
              getValueView: value => value.label,
              getValueId: value => String(value.id),
              isSearchEnabled: true,
              hasClearButton: filters?.user !== undefined,
            },
            period: {
              name: t('period'),
              type: 'dateRange',
              // TODO добавить hasClearButton в либе кита для этого компонента и скрывать кнопку если фильтр пустой
            },
            tag: {
              name: t('tag'),
              type: 'select',
              fetchOptions: loadTagsForFilters,
              hasClearButton: filters?.tag !== undefined,
            },
          }}
          values={filters}
          onChangeFilters={setFilters}
          isDisabled={isLoading}
          hasClearButton={
            filters !== undefined &&
            Object.values(filters).some(val => val !== undefined)
          }
        />
      </div>
      {data.length !== 0 ? (
        <div className={classes.listContainer}>
          <ListForInfiniteScroll tweakStyles={listForInfiniteScrollTweakStyles}>
            {data.map((listItem, i) => (
              <ListForInfiniteScrollItem
                key={listItem.id}
                tweakStyles={listForInfiniteScrollTweakStyles}
                ref={i === data.length - 1 ? lastItemRef : undefined}
              >
                <HistoryOfChangesListItemContent listItem={listItem} />
              </ListForInfiniteScrollItem>
            ))}
          </ListForInfiniteScroll>
        </div>
      ) : (
        !isLoading && (
          <EmptyContentMessageEmoji
            text={t('notFound')}
            tweakStyles={emptyMessageEmojiTweakStyles}
          />
        )
      )}
      {isLoading && (
        <ThemedPreloader
          type={fetchParams.page === 0 ? 'logo' : 'dots'}
          tweakStyles={
            fetchParams.page === 0
              ? themedPreloaderTweakStyles
              : dotsPreloaderTweakStyles
          }
        />
      )}
    </>
  );
};

export default HistoryOfChanges;
