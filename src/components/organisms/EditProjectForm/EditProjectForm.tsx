import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
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
import { formStyles, iconButtonTweakStyles } from '../../commonStyles';
import { deleteConfirmTweakStyles } from './EditProjectForm.styles';

export interface IEditableProject {
  name: string;
}

export interface IEditProjectFormProps {
  initialValues?: IEditableProject;
  isNewProject?: boolean;
  onSubmit: (formValues: IEditableProject) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

export const editProjectValidationConfig: INestedValidationConfig<
  Partial<IEditableProject>
> = {
  name: { ...requiredValidator },
};

const EMPTY_TOUCHED: Record<keyof IEditableProject, boolean> = {
  name: false,
};

const EditProjectForm: FC<IEditProjectFormProps> = ({
  isNewProject = false,
  initialValues = {},
  onSubmit,
  onCancel,
  onDelete,
}) => {
  const { classes: formClasses } = useFeatureTogglesTheme(
    'formStyles',
    formStyles,
    {},
  );

  const { t } = useTranslation();
  const getErrorMessage = useMemo(() => getErrorMessageFunction(t), [t]);

  const [formValues, setFormValues] = useState<Partial<IEditableProject>>({
    ...initialValues,
  });
  const [touched, setTouched] = useState(EMPTY_TOUCHED);

  const [errors, setErrors] = useState<
    INestedErrorsResult<Partial<IEditableProject>>
  >(validateNestedForm(formValues, editProjectValidationConfig));

  useEffect(() => {
    const newErrors = validateNestedForm(
      formValues,
      editProjectValidationConfig,
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

    onSubmit(formValues as IEditableProject);
  };

  return (
    <form className={formClasses.root} onSubmit={handleSubmit}>
      <div className={formClasses.title}>
        {isNewProject ? t('newProject') : t('editing')}
      </div>

      <div className={clsx(formClasses.inputGroup, formClasses.input)}>
        <Input
          label={t('projectName')}
          value={formValues.name}
          onChange={handleChange('name')}
          isInvalid={hasError(errors.name) && touched.name}
          errorMessage={getErrorMessage(errors?.name)}
          onBlur={handleBlur('name')}
          isRequired
        />
      </div>
      <div className={formClasses.buttonsContainer}>
        {!isNewProject && onDelete !== undefined && (
          <div
            className={clsx(formClasses.button, formClasses.buttonFloatLeft)}
          >
            <ContextPopup
              tweakStyles={deleteConfirmTweakStyles}
              popup={({ onClose }) => (
                <Confirmation
                  onConfirm={() => {
                    onClose();
                    onDelete();
                  }}
                  onCancel={() => onClose()}
                  message={t('confirmToDeleteProject')}
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
                  size="xl"
                  tweakStyles={iconButtonTweakStyles}
                >
                  <div className={formClasses.trashIcon}>
                    <Icon type="trash-can" />
                  </div>
                </Button>
              )}
            </ContextPopup>
          </div>
        )}
        <div className={formClasses.button}>
          <Button
            onClick={() => onCancel()}
            view="secondary"
            type="button"
            size="xl"
          >
            {t('cancel')}
          </Button>
        </div>

        <div className={formClasses.button}>
          <Button
            type="submit"
            isDisabled={hasAnyErrorsInside(errors)}
            size="xl"
          >
            {isNewProject ? t('add') : t('save')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditProjectForm;
