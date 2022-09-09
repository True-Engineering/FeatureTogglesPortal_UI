import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  Button,
  Icon,
  Input,
  Select,
  SmartInput,
} from '@true-engineering/true-react-common-ui-kit';
import {
  INestedErrorsResult,
  INestedValidationConfig,
  validateNestedForm,
} from '@true-engineering/true-react-common-validator';
import { AutocompleteInput, Confirmation, ContextPopup } from '../../atoms';
import { useFeatureTogglesTheme } from '../../../hooks';
import {
  getErrorMessageFunction,
  hasAnyErrorsInside,
  requiredValidator,
  hasError,
  getChangeFormHandler,
  getBlurFormHandler,
} from '../../../utils';
import { FLAG_TYPES, IFlag } from '../../../types';
import type { IEditableFlag, IFlagType } from './types';
import { formStyles, iconButtonTweakStyles } from '../../commonStyles';
import { deleteConfirmTweakStyles } from './EditFlagForm.styles';

const EMPTY_FLAG: IFlag = {
  name: '',
  description: '',
  sprint: undefined,
  group: '',
  tag: undefined,
  type: undefined,
  environments: [],
};

const EMPTY_TOUCHED: Record<keyof IFlag, boolean> = {
  name: false,
  description: false,
  sprint: false,
  group: false,
  tag: false,
  type: false,
  environments: false,
};

const flagTypes: IFlagType[] = ['noType', ...FLAG_TYPES];

interface IEditFlagFormProps {
  initialFlag?: IFlag;
  groupsList?: string[];
  tagsList?: string[];
  isNewFlag?: boolean;
  onSaveChanges: (editedFlag: IFlag) => void;
  onCancel: () => void;
  onDelete?: (editedFlag: IFlag) => void;
}

export const editFlagValidationConfig: INestedValidationConfig<IEditableFlag> = {
  name: { ...requiredValidator },
};

export const convertFlag = (flag: IEditableFlag): IFlag => ({
  ...flag,
  type: flag.type === 'noType' ? undefined : flag.type,
});

const EditFlagForm: FC<IEditFlagFormProps> = ({
  initialFlag,
  groupsList,
  tagsList,
  isNewFlag = false,
  onSaveChanges,
  onCancel,
  onDelete,
}) => {
  const { classes } = useFeatureTogglesTheme('formStyles', formStyles, {});
  const { t } = useTranslation();
  const getErrorMessage = useMemo(() => getErrorMessageFunction(t), [t]);

  const [editableFlag, setEditableFlag] = useState<IEditableFlag>(
    initialFlag ?? EMPTY_FLAG,
  );
  const [touched, setTouched] = useState(EMPTY_TOUCHED);

  const [errors, setErrors] = useState<INestedErrorsResult<IEditableFlag>>(
    validateNestedForm(editableFlag, editFlagValidationConfig),
  );

  useEffect(() => {
    const newErrors = validateNestedForm(
      editableFlag,
      editFlagValidationConfig,
    );
    setErrors(newErrors);
  }, [editableFlag]);

  const handleChange = getChangeFormHandler(setEditableFlag);

  const handleBlur = getBlurFormHandler(setTouched);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (hasAnyErrorsInside(errors)) {
      return;
    }

    onSaveChanges(convertFlag(editableFlag));
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <div className={classes.title}>{t('featureFlag')}</div>
      <div
        className={clsx(classes.input, classes.shortInput, classes.inputGroup)}
      >
        <Input
          label={t('sprint')}
          value={editableFlag.sprint}
          onChange={handleChange('sprint')}
          isInvalid={hasError(errors.sprint) && touched.sprint}
          errorMessage={getErrorMessage(errors?.sprint)}
          onBlur={handleBlur('sprint')}
        />
      </div>
      <div className={clsx(classes.inputGroup, classes.input)}>
        <AutocompleteInput
          label={t('group')}
          value={editableFlag.group}
          onChange={handleChange('group')}
          errorMessage={getErrorMessage(errors?.group)}
          isInvalid={hasError(errors.group) && touched.group}
          onBlur={handleBlur('group')}
          options={groupsList}
        />
      </div>
      <div className={clsx(classes.input, classes.inputGroup)}>
        <Input
          label={t('task')}
          value={editableFlag.description}
          onChange={handleChange('description')}
          errorMessage={getErrorMessage(errors?.description)}
          isInvalid={hasError(errors.description) && touched.description}
          onBlur={handleBlur('description')}
        />
      </div>
      <div className={clsx(classes.inputGroup, classes.input)}>
        <SmartInput
          label={t('featureFlag')}
          smartType="default"
          regExp={/^[a-zA-Z0-9._-]*$/i}
          value={editableFlag.name}
          onChange={isNewFlag ? handleChange('name') : () => undefined}
          isDisabled={!isNewFlag}
          isRequired
          errorMessage={getErrorMessage(errors?.name)}
          isInvalid={hasError(errors.name) && touched.name}
          onBlur={handleBlur('name')}
        />
      </div>
      <div className={classes.inputGroup}>
        <div className={clsx(classes.shortInput)}>
          <Select
            options={flagTypes}
            label={t('type')}
            value={editableFlag.type ?? 'noType'}
            onChange={handleChange('type')}
            errorMessage={getErrorMessage(errors?.type)}
            isInvalid={hasError(errors.type) && touched.type}
            onBlur={handleBlur('type')}
            noMatchesLabel={t('noType')}
            placeholder={t('type')}
            convertValueToString={t}
            hasFloatingLabel
          />
        </div>
        <div className={clsx(classes.shortInput, classes.input)}>
          <AutocompleteInput
            label={t('tag')}
            value={editableFlag.tag}
            onChange={handleChange('tag')}
            errorMessage={getErrorMessage(errors?.tag)}
            isInvalid={hasError(errors.tag) && touched.tag}
            onBlur={handleBlur('tag')}
            options={tagsList}
          />
        </div>
      </div>
      <div className={classes.buttonsContainer}>
        {!isNewFlag && onDelete !== undefined && (
          <div className={clsx(classes.button, classes.buttonFloatLeft)}>
            <ContextPopup
              tweakStyles={deleteConfirmTweakStyles}
              popup={({ onClose }) => (
                <Confirmation
                  onConfirm={() => {
                    onClose();
                    onDelete(convertFlag(editableFlag));
                  }}
                  onCancel={() => onClose()}
                  message={t('confirmToDeleteFlag')}
                  buttonView="destructive"
                  buttonText={t('delete')}
                />
              )}
            >
              {({ isOpen }) => (
                <Button
                  size="xl"
                  isActive={isOpen}
                  view="outline"
                  tweakStyles={iconButtonTweakStyles}
                >
                  <div className={classes.trashIcon}>
                    <Icon type="trash-can" />
                  </div>
                </Button>
              )}
            </ContextPopup>
          </div>
        )}
        <div className={classes.button}>
          <Button view="secondary" size="xl" onClick={onCancel}>
            {t('cancel')}
          </Button>
        </div>
        <div className={classes.button}>
          <Button
            view="primary"
            size="xl"
            isFullWidth
            type="submit"
            isDisabled={hasAnyErrorsInside(errors)}
          >
            {t('save')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditFlagForm;
