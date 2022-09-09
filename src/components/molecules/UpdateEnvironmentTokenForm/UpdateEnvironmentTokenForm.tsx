import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  Button,
  Input,
  Notification,
} from '@true-engineering/true-react-common-ui-kit';
import { CopyToClipboardButton } from '../../atoms';
import { useFeatureTogglesTheme } from '../../../hooks';
import { IEnvironmentToken } from '../../../types';
import { formStyles } from '../../commonStyles';
import { styles } from './UpdateEnvironmentTokenForm.styles';

export interface IEditableEnvironmentToken {
  token: IEnvironmentToken;
}

export interface IUpdateEnvironmentTokenFormProps {
  initialValues?: IEditableEnvironmentToken;
  onSubmit: (formValues: IEditableEnvironmentToken) => void;
}

const UpdateEnvironmentTokenForm: FC<IUpdateEnvironmentTokenFormProps> = ({
  initialValues: values,
  onSubmit,
}) => {
  const { classes: formClasses } = useFeatureTogglesTheme(
    'formStyles',
    formStyles,
    {},
  );
  const { classes } = useFeatureTogglesTheme(
    'UpdateEnvironmentTokenForm',
    styles,
    {},
  );
  const { t } = useTranslation();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(values as IEditableEnvironmentToken);
  };

  return (
    <form className={formClasses.root} onSubmit={handleSubmit}>
      <div className={formClasses.title}>{t('tokenCreated')}</div>
      <div className={formClasses.notification}>
        <Notification
          type="warning"
          title={t('attentionTokenIsNotStoredInTheSystem')}
          text={t('makeSureYouHaveCopiedItBeforeClosing')}
        />
      </div>
      <div className={clsx(formClasses.inputGroup, formClasses.input)}>
        <div className={classes.inputWrapperWithIcon}>
          <div className={classes.input}>
            <Input
              label={t('token')}
              value={values?.token}
              isDisabled
              onChange={() => null}
            />
          </div>
          <div className={classes.inputControls}>
            <div className={classes.copyButton}>
              <CopyToClipboardButton
                clipboardText={values?.token ?? ''}
                tooltipText={t('copyToken')}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={formClasses.buttonsContainer}>
        <div className={formClasses.button}>
          <Button type="submit" size="xl">
            {t('ready')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdateEnvironmentTokenForm;
