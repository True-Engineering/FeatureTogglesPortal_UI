import React, {
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Styles } from 'react-jss';
import { Portal } from 'react-overlays';
import { Modifiers } from 'react-overlays/cjs/usePopper';
import usePopper from 'react-overlays/usePopper';
import { CSSTransition } from 'react-transition-group';
import { IInputProps, Input } from '@true-engineering/true-react-common-ui-kit';
import { useTooltipsContainer, useFeatureTogglesTheme } from '../../../hooks';
import { useSlideUpAnimationStyles } from '../../commonStyles';
import { styles } from './AutocompleteInput.styles';
import { List } from './List';

export interface IAutocompleteInputProps extends Omit<IInputProps, 'onChange'> {
  options?: string[];
  onChange: (value: string, event?: FormEvent<HTMLInputElement>) => void;
}

const defaultConvertFunction = (v: unknown) =>
  v === undefined ? undefined : String(v);

const START_INDEX = 0;

const popperModifiers: Modifiers = [
  {
    name: 'offset',
    options: {
      offset: [-1, 6],
    },
  },
  {
    name: 'sameWidth',
    enabled: true,
    fn: ({ state }) => {
      state.styles.popper.width = `${state.rects.reference.width}px`;
    },
    phase: 'beforeWrite',
    requires: ['computeStyles'],
  },
];

const AutocompleteInput: FC<IAutocompleteInputProps> = ({
  options = [],
  ...inputProps
}) => {
  const { classes } = useFeatureTogglesTheme('AutocompleteInput', styles, {});
  const slideUpAnimationClasses = useSlideUpAnimationStyles();

  const popupWrapperRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isListOpen, setIsListOpen] = useState(false);

  const sortedOptions = useMemo(
    () =>
      [...options].sort((a, b) =>
        a.localeCompare(b, undefined, {
          numeric: true,
          sensitivity: 'base',
        }),
      ),
    [options],
  );
  const filteredOptions = useMemo(
    () => filterOptions(sortedOptions, inputProps.value),
    [inputProps.value],
  );

  const [focusedListCellIndex, setFocusedListCellIndex] = useState(START_INDEX);

  const handleListOpen = useCallback(() => {
    setIsListOpen(true);
    setFocusedListCellIndex(START_INDEX);
  }, []);

  const handleListClose = useCallback(() => {
    setIsListOpen(false);
  }, []);

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      handleListOpen();
      if (inputProps.onFocus) {
        inputProps.onFocus(event);
      }
    },
    [inputProps.onFocus],
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      handleListClose();
      if (inputProps.onBlur) {
        inputProps.onBlur(event);
      }
    },
    [inputProps.onBlur, handleListClose],
  );

  const handleInputChange = useCallback(
    (value: string, e: FormEvent<HTMLInputElement>) => {
      setFocusedListCellIndex(START_INDEX);
      handleListOpen();

      inputProps.onChange(value, e);
    },
    [inputProps.onChange, handleListOpen],
  );

  const handleOptionClick = useCallback(
    (index: number) => {
      if (index !== -1) {
        inputProps.onChange(filteredOptions[index]);
      }
      handleListClose();
    },
    [inputProps.onChange, filteredOptions],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (filteredOptions.length === 0 || !isListOpen) {
        return;
      }

      switch (event.code) {
        case 'Enter':
        case 'NumpadEnter': {
          event.preventDefault();
          handleOptionClick(focusedListCellIndex);
          break;
        }

        case 'ArrowDown': {
          // чтобы убрать перемещение курсора в инпуте
          event.preventDefault();
          const index =
            focusedListCellIndex === filteredOptions.length - 1
              ? 0
              : focusedListCellIndex + 1;
          setFocusedListCellIndex(index);
          break;
        }

        case 'ArrowUp': {
          // чтобы убрать перемещение курсора в инпуте
          event.preventDefault();

          const index =
            focusedListCellIndex === 0
              ? filteredOptions.length - 1
              : focusedListCellIndex - 1;
          setFocusedListCellIndex(index);
          break;
        }
      }
    },
    [filteredOptions, focusedListCellIndex, handleOptionClick, isListOpen],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [handleKeyDown]);

  const container = useTooltipsContainer();

  const { styles: popperStyles, attributes } = usePopper(
    rootRef.current,
    popupWrapperRef.current,
    {
      placement: 'bottom-start',
      modifiers: popperModifiers,
    },
  );

  return (
    <div className={classes.root} ref={rootRef}>
      <Input
        ref={inputRef}
        {...inputProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInputChange}
      />
      <Portal container={container}>
        <div
          ref={popupWrapperRef}
          style={popperStyles.popper as Styles}
          className={classes.popupWrapper}
          {...attributes.popper}
        >
          <CSSTransition
            in={filteredOptions.length > 0 && isListOpen}
            timeout={150}
            classNames={slideUpAnimationClasses}
            unmountOnExit
          >
            <div
              className={classes.listWrapper}
              // чтобы предотвратить onBlur на инпуте
              onMouseDown={event => event.preventDefault()}
            >
              <List
                options={filteredOptions}
                convertValueToString={defaultConvertFunction}
                focusedIndex={focusedListCellIndex}
                onOptionClick={handleOptionClick}
                isLoading={inputProps.isLoading}
                testId={
                  inputProps.testId !== undefined
                    ? `${inputProps.testId}-list`
                    : undefined
                }
                activeOption={filteredOptions[focusedListCellIndex]}
              />
            </div>
          </CSSTransition>
        </div>
      </Portal>
    </div>
  );
};

const filterOptions = (items: string[], filterString?: string): string[] => {
  if (filterString === undefined || filterString === '') {
    return items;
  }

  const filterStringInUppercase = filterString.toUpperCase();
  const filtered = items.filter(item =>
    item.toUpperCase().includes(filterStringInUppercase),
  );

  const isFullyFiltered = filtered.length === 1 && filtered[0] === filterString;
  return isFullyFiltered ? [] : filtered;
};

export default AutocompleteInput;
