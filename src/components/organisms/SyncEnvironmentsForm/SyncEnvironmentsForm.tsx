import React, { FC, useState, useEffect, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Button,
  Notification,
  Select,
} from '@true-engineering/true-react-common-ui-kit';
import {
  INestedErrorsResult,
  INestedValidationConfig,
  validateNestedForm,
} from '@true-engineering/true-react-common-validator';
import { MultipleInput } from '../../atoms';
import { useFeatureTogglesTheme } from '../../../hooks';
import {
  hasAnyErrorsInside,
  requiredValidator,
  convertEnvironmentToString,
  getErrorMessageFunction,
  hasError,
  getChangeFormHandler,
  getBlurFormHandler,
} from '../../../utils';
import type {
  IProjectEnvironment,
  ISyncEnvironmentsInfo,
} from '../../../types';
import { formStyles } from '../../commonStyles';
import { styles } from './SyncEnvironmentsForm.styles';

interface ISyncEnvironmentsFormProps {
  info: ISyncEnvironmentsInfo;
  onSync: (args: { fileKey: string; src: string; dest: string[] }) => void;
  onCancel: () => void;
  onOpenSyncPortal: () => void;
}

interface ISyncEnvironmentsFormValues {
  from?: IProjectEnvironment;
  to?: string[];
}

export const syncEnvironmentsFormValidationConfig: INestedValidationConfig<ISyncEnvironmentsFormValues> = {
  from: { ...requiredValidator },
  to: { ...requiredValidator },
};

const EMPTY_TOUCHED: Record<keyof ISyncEnvironmentsFormValues, boolean> = {
  from: false,
  to: false,
};

const SyncEnvironmentsForm: FC<ISyncEnvironmentsFormProps> = ({
  info,
  onSync,
  onCancel,
  onOpenSyncPortal,
}) => {
  const {
    srcEnvironments,
    envSynchronizedStatus: isSynchronizedPortals,
    key: fileKey,
  } = info;

  const { classes: formClasses } = useFeatureTogglesTheme(
    'formStyles',
    formStyles,
    {},
  );
  const { classes } = useFeatureTogglesTheme(
    'SyncEnvironmentsForm',
    styles,
    {},
  );

  const { t } = useTranslation();
  const getErrorMessage = useMemo(() => getErrorMessageFunction(t), [t]);

  const [formValues, setFormValues] = useState<ISyncEnvironmentsFormValues>({});
  const [touched, setTouched] = useState(EMPTY_TOUCHED);

  const [errors, setErrors] = useState<
    INestedErrorsResult<ISyncEnvironmentsFormValues>
  >(validateNestedForm(formValues, syncEnvironmentsFormValidationConfig));

  useEffect(() => {
    const newErrors = validateNestedForm(
      formValues,
      syncEnvironmentsFormValidationConfig,
    );
    setErrors(newErrors);
  }, [formValues]);

  const handleChange = getChangeFormHandler(setFormValues);

  const handleBlur = getBlurFormHandler(setTouched);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (hasAnyErrorsInside(errors) || !(formValues.from && formValues.to)) {
      return;
    }

    onSync({
      fileKey,
      src: formValues.from.name,
      dest: formValues.to,
    });
  };

  return (
    <form className={formClasses.root} onSubmit={handleSubmit}>
      <div className={formClasses.title}>{t('syncEnvironments')}</div>
      {!isSynchronizedPortals && (
        <div className={formClasses.notification}>
          <Notification type="warning">
            <Trans
              i18nKey="needSyncPortals"
              components={{
                a: (
                  <span
                    className={classes.warningText}
                    onClick={() => onOpenSyncPortal()}
                  />
                ),
              }}
            />
          </Notification>
        </div>
      )}

      <div className={classes.row}>
        <div className={classes.from}>
          <Select
            label={t('fromEnvironment')}
            placeholder={t('fromEnvironment')}
            options={srcEnvironments}
            value={formValues.from}
            errorMessage={getErrorMessage(errors?.from)}
            isInvalid={hasError(errors.from) && touched.from}
            onBlur={handleBlur('from')}
            onChange={handleChange('from')}
            convertValueToString={convertEnvironmentToString}
            hasFloatingLabel
          />
        </div>
        <div className={classes.to}>
          <MultipleInput
            label={t('toEnvironment')}
            values={formValues.to}
            errorMessage={getErrorMessage(errors?.to)}
            isInvalid={hasError(errors?.to) && touched.to}
            onBlur={handleBlur('to')}
            onChange={handleChange('to')}
            hasFloatingLabel
          />
        </div>
      </div>

      <div className={formClasses.buttonsContainer}>
        <div className={formClasses.button}>
          <Button view="secondary" size="xl" onClick={onCancel}>
            {t('cancel')}
          </Button>
        </div>
        <div className={formClasses.button}>
          <Button
            view="primary"
            size="xl"
            isFullWidth
            type="submit"
            isDisabled={hasAnyErrorsInside(errors)}
          >
            {t('sync')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SyncEnvironmentsForm;
