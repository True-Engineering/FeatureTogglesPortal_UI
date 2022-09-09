import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { format } from 'date-fns';
import { Button } from '@true-engineering/true-react-common-ui-kit';
import { useFeatureTogglesTheme } from '../../../hooks';
import { getDateFnsLocale } from '../../../utils';
import { LONG_DATE_FORMAT, TIME_FORMAT } from '../../../constants';
import { ILocale, IProjectEnvironment } from '../../../types';
import { formStyles } from '../../commonStyles';
import { styles } from './DisableFreezeFeatureFlagsModalContent.styles';

export interface IDisableFreezeFeatureFlagsModalContentProps {
  data: IProjectEnvironment;
  onUnfreeze: (environment: IProjectEnvironment) => void;
  onClose: () => void;
}

const DisableFreezeFeatureFlagsModalContent: FC<IDisableFreezeFeatureFlagsModalContentProps> = ({
  data: { name, freezingEndTime, freezingUser },
  data,
  onUnfreeze,
  onClose,
}) => {
  const [isLoading, setLoading] = useState(false);

  const { t, i18n } = useTranslation();
  const dateFnsLocale = getDateFnsLocale(i18n.language as ILocale);

  const { classes } = useFeatureTogglesTheme(
    'DisableFreezeFeatureFlagsModalContent',
    styles,
    {},
  );

  const { classes: formClasses } = useFeatureTogglesTheme(
    'formStyles',
    formStyles,
    {},
  );

  const handleFetchUnfreeze = async () => {
    setLoading(true);

    try {
      await onUnfreeze(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className={formClasses.root}>
      <div className={formClasses.title}>
        {t('freezeFeatureFlags.unfreezeTitle', { name })}
      </div>
      <div className={classes.container}>
        <div className={classes.column}>
          <p className={classes.infoGroupTitle}>
            {t('freezeFeatureFlags.unfreezeDate')}
          </p>
          {freezingEndTime !== undefined &&
            format(freezingEndTime, LONG_DATE_FORMAT, {
              locale: dateFnsLocale,
            })}
        </div>
        <div className={classes.column}>
          <p className={classes.infoGroupTitle}>
            {t('freezeFeatureFlags.unfreezeTime')}
          </p>
          {freezingEndTime !== undefined &&
            format(freezingEndTime, TIME_FORMAT, { locale: dateFnsLocale })}
        </div>
        <div className={clsx(classes.column, classes.wordBreak)}>
          <p className={classes.infoGroupTitle}>{t('user')}</p>
          {freezingUser}
        </div>
      </div>
      <div className={formClasses.buttonsContainer}>
        <Button
          view="secondary"
          type="button"
          size="xl"
          onClick={onClose}
          isDisabled={isLoading}
        >
          {t('cancel')}
        </Button>
        <Button size="xl" isLoading={isLoading} onClick={handleFetchUnfreeze}>
          {t('freezeFeatureFlags.unfreeze')}
        </Button>
      </div>
    </div>
  );
};

export default DisableFreezeFeatureFlagsModalContent;
