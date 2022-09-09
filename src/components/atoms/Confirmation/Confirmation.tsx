import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  IButtonProps,
} from '@true-engineering/true-react-common-ui-kit';
import { useFeatureTogglesTheme } from '../../../hooks';
import { styles, buttonTweakStyles } from './Confirmation.styles';

export interface IConfirmationProps {
  message: string;
  buttonText?: string;
  buttonView?: IButtonProps['view'];
  onConfirm: () => void;
  onCancel: () => void;
}

const Confirmation = forwardRef<HTMLDivElement, IConfirmationProps>(
  (
    { message, onConfirm, onCancel, buttonText, buttonView = 'warning' },
    forwardedRef,
  ) => {
    const { t } = useTranslation();
    const { classes } = useFeatureTogglesTheme('Confirmation', styles, {});

    return (
      <div ref={forwardedRef} className={classes.root}>
        <div className={classes.message}>{message}</div>
        <div className={classes.buttons}>
          <Button
            onClick={event => {
              event.stopPropagation();
              onCancel();
            }}
            view="secondary"
            type="button"
            size="s"
            tweakStyles={buttonTweakStyles}
          >
            {t('cancel')}
          </Button>
          <Button
            type="button"
            size="s"
            view={buttonView}
            tweakStyles={buttonTweakStyles}
            onClick={event => {
              event.stopPropagation();
              onConfirm();
            }}
          >
            {buttonText ?? t('continue')}
          </Button>
        </div>
      </div>
    );
  },
);

export default Confirmation;
