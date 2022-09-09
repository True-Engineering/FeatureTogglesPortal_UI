import React, { ReactNode, useMemo } from 'react';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import clsx from 'clsx';
import { useFeatureTogglesTheme } from '../../../../hooks';
import { styles } from './List.styles';

export interface ISelectListProps<Value> {
  // Не гарантируется нормальная работа при не уникальных значениях
  options: Value[];
  convertValueToString: (value?: Value) => string | undefined;
  convertValueToReactNode?: (value?: Value) => ReactNode | undefined;
  focusedIndex?: number;
  activeOption?: Value;
  isLoading?: boolean;
  loadingLabel?: string;
  defaultOptionLabel?: string;
  onOptionClick: (index: number) => void;
  testId?: string;
  shouldScrollToList?: boolean;
}

function List<Value>({
  options,
  onOptionClick,
  focusedIndex,
  activeOption,
  isLoading,
  loadingLabel,
  convertValueToString,
  convertValueToReactNode,
  testId,
  shouldScrollToList = true,
}: ISelectListProps<Value>): JSX.Element {
  const { classes } = useFeatureTogglesTheme('List', styles, {});

  const convertedToStringOptions = useMemo(
    () => options.map(o => convertValueToString(o)),
    [options, convertValueToString],
  );

  const convertedToReactNodesOptions = useMemo(
    () =>
      convertValueToReactNode !== undefined
        ? options.map(o => convertValueToReactNode(o))
        : [],
    [options, convertValueToReactNode],
  );

  const listOptions =
    convertValueToReactNode !== undefined
      ? convertedToReactNodesOptions
      : convertedToStringOptions;

  return (
    <div className={clsx(classes.root, classes.list)} data-testid={testId}>
      {isLoading ? (
        <div className={classes.loading}>{loadingLabel ?? 'Загрузка...'}</div>
      ) : (
        <>
          {listOptions.map((opt: ReactNode, index: number) => {
            // Не гарантируется нормальная работа при не уникальных значениях
            const isActive =
              convertValueToString(options[index]) ===
              convertValueToString(activeOption);

            return (
              <ScrollIntoViewIfNeeded
                key={index}
                active={shouldScrollToList && isActive}
                options={{ block: 'nearest' }}
              >
                <div
                  className={clsx(classes.cell, {
                    [classes.focused]: index === focusedIndex,
                    [classes.active]: isActive,
                  })}
                  onClick={() => onOptionClick(index)}
                >
                  {opt}
                </div>
              </ScrollIntoViewIfNeeded>
            );
          })}
        </>
      )}
    </div>
  );
}

export default List;
