import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Icon,
  Input,
} from '@true-engineering/true-react-common-ui-kit';
import {
  INestedErrorsResult,
  INestedValidationConfig,
  validateNestedForm,
} from '@true-engineering/true-react-common-validator';
import { Confirmation, ContextPopup } from '../../atoms';
import { useFeatureTogglesTheme } from '../../../hooks';
import {
  getBlurFormHandler,
  getChangeFormHandler,
  getErrorMessageFunction,
  hasAnyErrorsInside,
  hasError,
  requiredValidator,
} from '../../../utils';
import { iconButtonTweakStyles } from '../../commonStyles';
import {
  styles,
  buttonTweakStyles,
  deleteConfirmTweakStyles,
} from './EditProjectEnvironmentForm.styles';

export interface IEditableProjectEnvironment {
  name: string;
}

export interface IEditProjectEnvironmentFormProps {
  initialValues?: IEditableProjectEnvironment;
  isNewFlag?: boolean;
  onSubmit: (formValues: IEditableProjectEnvironment) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

export const editProjectEnvironmentValidationConfig: INestedValidationConfig<
  Partial<IEditableProjectEnvironment>
> = {
  name: { ...requiredValidator },
};

const EMPTY_TOUCHED: Record<keyof IEditableProjectEnvironment, boolean> = {
  name: false,
};

const EditProjectEnvironmentForm: FC<IEditProjectEnvironmentFormProps> = ({
  isNewFlag = false,
  initialValues = {},
  onSubmit,
  onCancel,
  onDelete,
}) => {
  const { classes } = useFeatureTogglesTheme(
    'EditProjectEnvironmentForm',
    styles,
    {},
  );

  const { t } = useTranslation();
  const getErrorMessage = useMemo(() => getErrorMessageFunction(t), [t]);

  const [formValues, setFormValues] = useState<
    Partial<IEditableProjectEnvironment>
  >({
    ...initialValues,
  });
  const [touched, setTouched] = useState(EMPTY_TOUCHED);

  const [errors, setErrors] = useState<
    INestedErrorsResult<Partial<IEditableProjectEnvironment>>
  >(validateNestedForm(formValues, editProjectEnvironmentValidationConfig));

  useEffect(() => {
    const newErrors = validateNestedForm(
      formValues,
      editProjectEnvironmentValidationConfig,
    );
    setErrors(newErrors);
  }, [formValues]);

  const handleChange = getChangeFormHandler(setFormValues);

  const handleBlur = getBlurFormHandler(setTouched);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (hasAnyErrorsInside(errors)) {
      return;
    }

    onSubmit(formValues as IEditableProjectEnvironment);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <div className={classes.input}>
        <Input
          label={t('environmentName')}
          value={formValues.name}
          onChange={handleChange('name')}
          isInvalid={hasError(errors.name) && touched.name}
          errorMessage={getErrorMessage(errors?.name)}
          onBlur={handleBlur('name')}
        />
      </div>
      <div className={classes.control}>
        {!isNewFlag && onDelete !== undefined && (
          <ContextPopup
            tweakStyles={deleteConfirmTweakStyles}
            popup={({ onClose }) => (
              <Confirmation
                onConfirm={() => onDelete()}
                onCancel={() => onClose()}
                message={t('confirmToDeleteEnvironment')}
                buttonView="destructive"
                buttonText={t('delete')}
              />
            )}
          >
            {({ isOpen }) => (
              <Button
                isActive={isOpen}
                view="outline"
                type="button"
                size="s"
                tweakStyles={iconButtonTweakStyles}
              >
                <div className={classes.trashIcon}>
                  <Icon type="trash-can" />
                </div>
              </Button>
            )}
          </ContextPopup>
        )}
        <Button
          onClick={() => onCancel()}
          view="secondary"
          type="button"
          size="s"
          tweakStyles={buttonTweakStyles}
        >
          {t('cancel')}
        </Button>
        <Button
          type="submit"
          isDisabled={hasAnyErrorsInside(errors)}
          size="s"
          tweakStyles={buttonTweakStyles}
        >
          {isNewFlag ? t('add') : t('save')}
        </Button>
      </div>
    </form>
  );
};

export default EditProjectEnvironmentForm;
