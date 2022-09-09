import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { useFeatureTogglesTheme } from '../../../hooks';
import { DATE_FORMAT } from '../../../constants';
import { IFlippingStrategy } from '../../../types';
import { styles } from './FlippingStrategyParamsList.styles';

export interface IFlippingStrategyParamsListProps {
  strategy?: IFlippingStrategy;
}

const EMPTY_TEXT = '−';

const FlippingStrategyParamsList: FC<IFlippingStrategyParamsListProps> = ({
  strategy,
}) => {
  const { t } = useTranslation();
  const { classes } = useFeatureTogglesTheme(
    'FlippingStrategyParamsList',
    styles,
    {},
  );

  const getTexts = useCallback((): string[][] | undefined => {
    if (strategy?.initParams === undefined) {
      return undefined;
    }

    if (strategy.type === 'AppVersion') {
      const { appVersion } = strategy.initParams;
      return [[t('appVersion'), appVersion]];
    }

    if (strategy.type === 'DarkLaunch') {
      const { weight } = strategy.initParams;
      return [[t('probability'), String(weight)]];
    }

    if (strategy.type === 'ReleaseDate') {
      const { releaseDate } = strategy.initParams;
      return [[t('releaseDate'), format(releaseDate, DATE_FORMAT)]];
    }

    if (strategy.type === 'RequestContext') {
      const { initParams } = strategy;
      return initParams.map(p => [p.name, p.values.join(', ')]);
    }

    return undefined;
  }, [strategy]);

  if (strategy === undefined) {
    return <div className={classes.lightText}>{EMPTY_TEXT}</div>;
  }

  const texts: string[][] | undefined = getTexts();
  return (
    <div className={classes.root}>
      <div className={classes.title}>{t(`strategy${strategy.type}`)}</div>
      <div className={classes.lightText}>
        {texts === undefined
          ? EMPTY_TEXT
          : texts.map(([paramName, paramValue], i) => (
              <div key={i}>
                {paramName}:{paramValue}
              </div>
            ))}
      </div>
    </div>
  );
};

export default FlippingStrategyParamsList;
