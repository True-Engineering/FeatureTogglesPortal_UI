import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Modal,
  useIsMounted,
} from '@true-engineering/true-react-common-ui-kit';
import { MultipleInput, PermissionController } from '../../../../atoms';
import {
  useApi,
  useStore,
  useFeatureTogglesTheme,
  useValidation,
} from '../../../../../hooks';
import {
  hasError,
  getErrorMessageFunction,
  hasPermissions,
  getChangeFormHandler,
} from '../../../../../utils';
import { IEnvironmentPermission } from '../../../../../types';
import { INotificationSettingsFields } from './types';
import { modalTweakStyles, formStyles } from '../../../../commonStyles';
import { styles } from './NotificationSettingsModal.styles';
import { validationConfig } from './validationConfig';

export interface INotificationSettingsModalProps {
  emails: Array<{ email: string }>;
  name?: string;
  isOpen: boolean;
  projectId: number;
  environmentId?: number;
  permissions: IEnvironmentPermission[];
  onClose: () => void;
  onSubmit: () => void;
}

export const NotificationSettingsModal: FC<INotificationSettingsModalProps> = ({
  emails,
  name,
  isOpen,
  projectId,
  environmentId,
  permissions,
  onClose,
  onSubmit,
}) => {
  const { classes } = useFeatureTogglesTheme(
    'NotificationSettingsModal',
    styles,
  );
  const { classes: formClasses } = useFeatureTogglesTheme(
    'formStyles',
    formStyles,
  );
  const { t } = useTranslation();
  const getErrorMessage = useMemo(() => getErrorMessageFunction(t), [t]);

  const isMounted = useIsMounted();
  const api = useApi();
  const {
    techStore: { addToaster },
  } = useStore();

  const flatEmails = emails?.map(v => v.email);
  const [values, setValues] = useState<INotificationSettingsFields>({
    emails: flatEmails,
  });

  const [isLoading, setIsLoading] = useState(false);
  const canModalBeClosed = !isLoading;

  const {
    errors,
    forceValidationCheck,
    clearValidation,
    validateForm,
  } = useValidation({
    values,
    getConfig: () => validationConfig,
  });

  const handleChange = getChangeFormHandler(setValues);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    forceValidationCheck();
    if (!(await validateForm()) || environmentId === undefined) {
      return;
    }

    setIsLoading(true);
    try {
      await api.updateEnvironmentNotifications(
        {
          projectId,
          environmentId,
        },
        {
          emails: values.emails ?? [],
        },
      );
      addToaster({
        type: 'ok',
        title: t('successMessages.done'),
        text: t('successMessages.notificationSettingsChanged'),
      });
      onSubmit();
      onClose();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Ошибка при изменении настроек уведомлений', err);
    } finally {
      if (isMounted()) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    clearValidation();
    setValues(prev => ({
      ...prev,
      emails: flatEmails,
    }));
  }, [isOpen, emails]);

  const hasEditPermission = hasPermissions(permissions, ['EDIT']);
  return (
    <Modal
      isOpen={isOpen}
      size="m"
      onClose={onClose}
      shouldCloseOnEsc={canModalBeClosed}
      shouldCloseOnOverlayClick={canModalBeClosed}
      hasCloseButton={false}
      tweakStyles={modalTweakStyles}
    >
      <form className={formClasses.root} onSubmit={handleSubmit}>
        <div className={formClasses.title}>
          {t('notificationSettingsModal.title', { name })}
        </div>
        <div className={classes.container}>
          <p className={classes.name}>Email</p>
          <PermissionController permissions={permissions} allow={'EDIT'}>
            <p className={classes.message}>
              {t('notificationSettingsModal.emailMessage')}
            </p>
          </PermissionController>
          <MultipleInput
            label={t('email')}
            hasRequiredLabel
            onChange={handleChange('emails')}
            values={values.emails}
            isInvalid={hasError(errors.emails)}
            errorMessage={getErrorMessage(errors.emails)}
            isDisabled={!hasEditPermission}
          />
        </div>
        <PermissionController permissions={permissions} allow={'EDIT'}>
          <div className={formClasses.buttonsContainer}>
            <div className={formClasses.button}>
              <Button
                type="button"
                view="secondary"
                onClick={onClose}
                isDisabled={!canModalBeClosed}
                size="xl"
              >
                {t('cancel')}
              </Button>
            </div>
            <div className={formClasses.button}>
              <Button type="submit" size="xl" isLoading={isLoading}>
                {t('save')}
              </Button>
            </div>
          </div>
        </PermissionController>
      </form>
    </Modal>
  );
};
