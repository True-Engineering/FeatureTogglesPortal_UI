import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Modal,
  ThemedPreloader,
} from '@true-engineering/true-react-common-ui-kit';
import { CompareTable, Header } from './components';
import { EmptyContentMessage } from '../../atoms';
import { useApi, useFeatureTogglesTheme, useStore } from '../../../hooks';
import {
  getChangeFormHandler,
  isNotEmpty,
  hasPermissions,
} from '../../../utils';
import { combineResult, mapFlag } from './helpers';
import { Z_INDEX } from '../../../constants';
import { IProjectEnvironment, IProjectId } from '../../../types';
import {
  ICompareState,
  IEnvironmentsCompareFields,
  IFlagsChangeHandler,
  IMenuItemId,
} from './types';
import { modalStyles, styles } from './EnvironmentsCompareModal.styles';

export interface IEnvironmentsCompareModalProps {
  isOpen: boolean;
  projectId?: IProjectId;
  onClose: () => void;
  onSubmit: () => void;
}

export const EnvironmentsCompareModal: FC<IEnvironmentsCompareModalProps> = ({
  isOpen,
  projectId,
  onClose,
  onSubmit,
}) => {
  const api = useApi();
  const { t } = useTranslation();
  const {
    techStore: { addToaster },
  } = useStore();
  const { classes } = useFeatureTogglesTheme(
    'EnvironmentsCompareModal',
    styles,
    {},
  );
  const [areEnvironmentsLoading, setAreEnvironmentsLoading] = useState(false);
  const [environments, setEnvironments] = useState<IProjectEnvironment[]>([]);
  const [values, setValues] = useState<IEnvironmentsCompareFields>({});
  const [compareState, setCompareState] = useState<ICompareState>();
  const [isCompareStateLoading, setIsCompareStateLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const handleChange = getChangeFormHandler(setValues);

  const fetchEnvironments = async () => {
    if (projectId === undefined) {
      console.error("Can't fetch. ProjectId is undefined");
      return;
    }

    setAreEnvironmentsLoading(true);

    try {
      const result = await api.loadEnvironments({
        projectId,
      });
      setEnvironments(result);
    } catch (error) {
      console.error(error);
    } finally {
      setAreEnvironmentsLoading(false);
    }
  };

  const fetchCompareState = async () => {
    if (projectId === undefined) {
      console.error("Can't fetch. ProjectId is undefined");
      return;
    }

    const { from, to } = values;

    if (!isNotEmpty(from) || !isNotEmpty(to)) {
      setCompareState(undefined);
      return;
    }

    try {
      setIsCompareStateLoading(true);
      const result = await api.getCompareEnvironmentsState({
        projectId,
        from: from.id,
        to: to.id,
      });
      setCompareState({
        enable: result.enable.map(mapFlag),
        disable: result.disable.map(mapFlag),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsCompareStateLoading(false);
    }
  };

  const fetchUpdateFlagsState = async () => {
    if (projectId === undefined) {
      console.error("Can't fetch. ProjectId is undefined");
      return;
    }

    if (!isNotEmpty(compareState) || !isNotEmpty(values.to)) {
      return;
    }

    const combinedResult = combineResult(compareState);
    if (Object.keys(combinedResult).length === 0) {
      addToaster({
        type: 'error',
        title: t('errorMessages.fail'),
        text: t('errorMessages.pleaseSelectAtLeastOneFlag'),
      });
      return;
    }

    try {
      setIsSubmitLoading(true);
      await api.updateFlagsState(
        {
          projectId,
          environmentId: values.to.id,
        },
        {
          featureFlagsStates: combineResult(compareState),
        },
      );
      addToaster({
        type: 'ok',
        title: t('successMessages.done'),
        text: t('successMessages.flagsStateSynced'),
      });
      onSubmit();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleFlagsStateChange: IFlagsChangeHandler = ({
    section,
    isSelected,
    value,
  }) => {
    setCompareState(prevState => {
      if (prevState === undefined) {
        return undefined;
      }
      return {
        ...prevState,
        [section]: prevState[section].map(flag =>
          flag.name === value ? { ...flag, isEnabled: isSelected } : flag,
        ),
      };
    });
  };

  const handleSwap = () => {
    setValues(prevState => ({
      ...prevState,
      from: prevState.to,
      to:
        prevState.from?.permissions !== undefined &&
        hasPermissions(prevState.from?.permissions, 'EDIT')
          ? prevState.from
          : undefined,
    }));
  };

  const handleAllFlagsChange = (section: IMenuItemId, isSelected: boolean) => {
    setCompareState(prevState => {
      if (prevState === undefined) {
        return undefined;
      }
      return {
        ...prevState,
        [section]: prevState[section].map(flag => ({
          ...flag,
          isEnabled: isSelected,
        })),
      };
    });
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setValues({});
    setCompareState(undefined);
  }, [isOpen]);

  useEffect(() => {
    fetchCompareState();
  }, [values]);

  useEffect(() => {
    fetchEnvironments();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      tweakStyles={modalStyles}
      title={t('compareModal.title')}
      shouldCloseOnEsc={!isSubmitLoading}
      zIndex={Z_INDEX.modal}
      buttons={[
        <Button
          key="1"
          size="xl"
          view="secondary"
          onClick={onClose}
          isDisabled={isSubmitLoading}
        >
          {t('cancel')}
        </Button>,
        <Button
          key="2"
          size="xl"
          onClick={fetchUpdateFlagsState}
          isDisabled={compareState === undefined}
          isLoading={isSubmitLoading}
        >
          {t('sync')}
        </Button>,
      ]}
    >
      <div className={classes.root}>
        <Header
          values={values}
          isDisabled={isSubmitLoading}
          environments={environments}
          areEnvironmentsLoading={areEnvironmentsLoading}
          onChange={handleChange}
          onSwap={handleSwap}
        />
        <div className={classes.table}>
          {isCompareStateLoading ? (
            <div className={classes.emptyTable}>
              <div className={classes.loading}>
                <ThemedPreloader />
              </div>
            </div>
          ) : (
            <>
              {isNotEmpty(compareState) ? (
                <CompareTable
                  compareState={compareState}
                  values={values}
                  onFlagsChange={handleFlagsStateChange}
                  onAllFlagsChange={handleAllFlagsChange}
                />
              ) : (
                <div className={classes.emptyTable}>
                  <EmptyContentMessage
                    text={t('compareModal.selectEnvironments')}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
