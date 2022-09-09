import React from 'react';
import { Styles } from 'react-jss';
import clsx from 'clsx';
import { Icon, List } from '@true-engineering/true-react-common-ui-kit';
import { useFeatureTogglesTheme } from '../../../hooks';
import { styles } from './Dropdown.styles';
import { ContextPopup } from '../ContextPopup';

export interface IDropdownProps<Value> {
  value: Value;
  options: Value[];
  testId?: string;
  isDisabled?: boolean;
  tweakStyles?: Styles;
  onChange: (value?: Value) => void;
  convertValueToString?: (value?: Value) => string | undefined;
}

const defaultConvertFunction = (v: unknown) =>
  v === undefined ? undefined : String(v);

function Dropdown<Value>({
  value,
  options,
  testId,
  isDisabled = false,
  tweakStyles,
  onChange,
  convertValueToString = defaultConvertFunction,
}: IDropdownProps<Value>) {
  const { classes } = useFeatureTogglesTheme('Dropdown', styles, tweakStyles);

  return (
    <ContextPopup
      popup={({ onClose }) => (
        <List
          items={options.map(opt => ({
            item: convertValueToString(opt),
            onClick: () => {
              onChange(opt);
              onClose();
            },
          }))}
        />
      )}
      placement="bottom-start"
      isDisabled={isDisabled}
      hasWrapperStyle={false}
    >
      {({ isOpen }) => (
        <div
          className={clsx(
            classes.trigger,
            isOpen && classes.activeTrigger,
            isDisabled && classes.disabled,
          )}
        >
          <div className={classes.value} data-testid={testId}>
            {convertValueToString(value)}
          </div>
          <div className={clsx(classes.arrow, isOpen && classes.activeArrow)}>
            <Icon type="chevron-down-small" />
          </div>
        </div>
      )}
    </ContextPopup>
  );
}

export default Dropdown;
