import React, { FC } from 'react';
import {
  Flag,
  IFlagProps,
  List,
} from '@true-engineering/true-react-common-ui-kit';
import { useFeatureTogglesTheme } from '../../../hooks';
import { ILocale } from '../../../types';
import {
  styles,
  contextTweakStyles,
  listTweakStyles,
} from './LanguageDropdown.styles';
import { ContextPopup } from '../ContextPopup';

export interface ILanguageDropdownProps {
  value: ILocale;
  onChange: (lang: ILocale) => void;
}

interface ILanguageOption {
  value: ILocale;
  countryCode: IFlagProps['countryCode'];
  text: string;
}

const options: ILanguageOption[] = [
  { value: 'ru', countryCode: 'ru', text: 'Русский' },
  { value: 'en', countryCode: 'gb', text: 'English' },
];

const defaultOption = options[1];

const LanguageDropdown: FC<ILanguageDropdownProps> = ({ value, onChange }) => {
  const { classes } = useFeatureTogglesTheme('LanguageDropdown', styles, {});

  const currentOption =
    options.find(option => option.value === value) ?? defaultOption;

  return (
    <ContextPopup
      popup={({ onClose }) => (
        <List
          tweakStyles={listTweakStyles}
          items={options.map(option => ({
            item: (
              <div className={classes.option}>
                <div className={classes.flag}>
                  <Flag countryCode={option.countryCode} />
                </div>

                {option.text}
              </div>
            ),
            onClick: () => {
              onChange(option.value);
              onClose();
            },
          }))}
        />
      )}
      tweakStyles={contextTweakStyles}
      hasWrapperStyle={false}
      offset={[0, 8]}
    >
      {currentOption && (
        <div className={classes.flag}>
          <Flag countryCode={currentOption.countryCode} />
        </div>
      )}
    </ContextPopup>
  );
};

export default LanguageDropdown;
