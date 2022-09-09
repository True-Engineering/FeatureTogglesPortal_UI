import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Icon, Tooltip } from '@true-engineering/true-react-common-ui-kit';
import { useFeatureTogglesTheme } from '../../../hooks';
import { isStringNotEmpty } from '../../../utils';
import { styles } from './MultipleInput.styles';

export interface IMultipleInputProps {
  values?: string[];
  label?: string;
  name?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isActive?: boolean;
  isInvalid?: boolean;
  isReadonly?: boolean;
  hasFloatingLabel?: boolean;
  hasRequiredLabel?: boolean;
  shouldFocusOnMount?: boolean;
  maxLength?: number;
  tabIndex?: number;
  inlineStyle?: 'left' | 'right' | 'middle';
  errorMessage?: string;
  errorPosition?: 'top' | 'bottom';
  onChange: (values: string[]) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const MultipleInput: FC<IMultipleInputProps> = ({
  values = [],
  label,
  name,
  placeholder,
  maxLength,
  isDisabled = false,
  isRequired = false,
  isActive = false,
  isInvalid = false,
  isReadonly = false,
  hasFloatingLabel = true,
  hasRequiredLabel,
  shouldFocusOnMount,
  inlineStyle,
  tabIndex,
  errorMessage,
  errorPosition = 'bottom',
  onChange,
  onFocus,
  onBlur,
}) => {
  const { t } = useTranslation();
  const { classes } = useFeatureTogglesTheme('MultipleInput', styles, {});
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setFocused] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    if (isStringNotEmpty(inputValue)) {
      onChange([...values, inputValue]);
      setInputValue('');
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSave();
      return;
    }

    if (event.key === 'Backspace' && inputValue === '' && values.length > 0) {
      event.preventDefault();
      onChange(values.slice(0, -1));
      return;
    }
  };

  const handleRemoveTag = (index: number) => {
    const newValue = [...values.slice(0, index), ...values.slice(index + 1)];
    onChange(newValue);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    if (onFocus !== undefined) {
      onFocus(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    handleSave();
    setFocused(false);
    if (onBlur !== undefined) {
      onBlur(event);
    }
  };

  const triggerFocus = () => {
    inputRef.current?.focus();
  };

  const hasFocus = isFocused || isActive;
  const hasValue = values.length > 0 || inputValue !== '';

  const props = {
    value: inputValue,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleInputChange,
    onKeyDown: handleInputKeyDown,
    disabled: isDisabled,
    placeholder: hasFocus && !isReadonly ? placeholder : undefined,
    name,
    maxLength,
    readOnly: isReadonly,
    autoFocus: shouldFocusOnMount,
    tabIndex,
  };

  return (
    <div className={classes.root}>
      <div
        className={clsx(
          classes.inputWrapper,
          {
            [classes.required]: isRequired && !hasRequiredLabel,
            [classes.invalid]: isInvalid,
            [classes.focused]: hasFocus,
            [classes.disabled]: isDisabled,
          },
          inlineStyle !== undefined && classes[inlineStyle],
        )}
      >
        <div
          className={clsx(
            classes.container,
            hasFloatingLabel &&
              label !== undefined &&
              classes.withFloatingLabel,
          )}
          onClick={triggerFocus}
        >
          {values?.map((v, i) => (
            <div key={i} className={classes.tag}>
              {v}
              <span
                className={classes.removeTag}
                onClick={() => handleRemoveTag(i)}
              >
                <Icon type="close" />
              </span>
            </div>
          ))}
          <input ref={inputRef} className={classes.input} {...props} />
        </div>

        {label && (
          <span
            className={clsx(classes.label, {
              [classes.invalidLabel]: isInvalid,
              [classes.requiredLabel]: hasRequiredLabel && !isRequired,
              [classes.activeLabel]: (hasFocus && !isReadonly) || hasValue,
              [classes.floating]: hasFloatingLabel,
            })}
          >
            {label}
          </span>
        )}
      </div>

      {errorMessage && (
        <div
          className={clsx(
            classes.error,
            classes[`error-${errorPosition}` as keyof typeof classes],
          )}
        >
          {errorMessage}
        </div>
      )}

      {isFocused && (
        <div className={classes.tooltip}>
          <Tooltip text={t('pressEnterToSaveValue')} view="hint" />
        </div>
      )}
    </div>
  );
};

export default MultipleInput;
